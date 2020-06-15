import { SharedTabsIncidente } from './../services/shared-tabs-travel.service';
import { AuthService } from './../services/auth.service';
import { IncidenteModel } from 'src/models/incidente-model';
import { IncidenteService } from './../services/incidente.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController } from '@ionic/angular';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-incidente',
  templateUrl: './incidente.page.html',
  styleUrls: ['./incidente.page.scss'],
})
export class IncidentePage implements OnInit {
  items: IncidenteModel[];

  constructor(
    public loadingCtrl: LoadingController,
    private incidenteService: IncidenteService,
    private router: Router,
    private route: ActivatedRoute,
    private menuCtrl: MenuController,
    private sharedTabsIncidente: SharedTabsIncidente,
    private authService: AuthService
  ) {
    const user = authService.getUser();
    if (!user) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit() {
    if (this.route && this.route.data) {
      this.getData();
      this.menuCtrl.enable(true);
    }
  }

  async getData() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    this.presentLoading(loading);

    this.incidenteService.getIncidentes().subscribe(
      (res: any) => {
        this.items = res;
        loading.dismiss();
        console.log(this.items);
      },
      (err) => {
        //this.errorMessage = err.message;
        loading.dismiss();
        console.log(err);
      }
    );
  }

  openIncidenteMaintain(id: number, incidente: IncidenteModel) {
    incidente.id = id;
    const navigation: NavigationExtras = {
      state: {
        incidente,
      },
    };
    this.router.navigate(['tabs/incidente-crud'], navigation);
  }

  goToNewIncidente() {
    this.sharedTabsIncidente.tabIncidente = undefined;
    this.router.navigate(['incidente-crud']);
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  // logout() {
  //   this.authService.doLogout().then(
  //     (res) => {
  //       this.router.navigate(['/login']);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
}
