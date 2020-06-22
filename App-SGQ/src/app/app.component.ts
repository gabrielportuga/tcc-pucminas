import { UserModel } from './../models/user-model';
import { Component, DoCheck, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreensizeService } from './services/screensize.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isDesktop: boolean;
  usuario: string;
  user: UserModel;
  public appPages: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    private screensizeService: ScreensizeService,
    private router: Router,
    private authService: AuthService
  ) {
    this.initializeApp();

    this.screensizeService.isDesktopView().subscribe((isDesktop) => {
      // if (this.isDesktop && !isDesktop) {
      //   // Reload because our routing is out of place
      //   window.location.reload();
      // }
      this.isDesktop = isDesktop;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      const user: UserModel = this.authService.getUser();
      if (user) {
        this.usuario = user.nome + ' - ' + user.perfil;
        this.user = user;

        if (this.user.perfil === 'Gestor Qualidade') {
          this.appPages = [
            {
              title: 'Incidente',
              url: '/incidente',
              icon: 'warning-outline',
            },
            {
              title: 'Não Conformidades',
              url: '/',
              icon: 'receipt-outline',
            },
          ];
        } else if (this.user.perfil === 'Operador') {
          this.appPages = [
            {
              title: 'Incidente',
              url: '/incidente',
              icon: 'warning-outline',
            },
          ];
        }

        this.router.navigate(['/incidente']);
      } else {
        this.router.navigate(['/login']);
      }
      this.splashScreen.hide();
      this.screensizeService.onResize(this.platform.width());
      // this.statusBar.styleDefault();
    });
  }

  logout() {
    this.authService.doLogout();
    this.router.navigate(['/login']);
  }
  // @HostListener('window:resize', ['$event'])
  // private onResize(event) {
  //   this.screensizeService.onResize(event.target.innerWidth);
  // }
}
