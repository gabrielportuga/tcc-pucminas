import { SharedTabsIncidente } from './../services/shared-tabs-travel.service';
import { InsumoModel } from '../../models/insumo-model';
import { AuthService } from '../services/auth.service';
import { IncidenteModel } from 'src/models/incidente-model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import {
  LoadingController,
  ToastController,
  AlertController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { isUndefined } from 'util';
import { Subscription } from 'rxjs';
import { IncidenteService } from '../services/incidente.service';

import { InsumoService } from '../services/insumo.service';

@Component({
  selector: 'app-incidente-crud',
  templateUrl: './incidente-crud.page.html',
  styleUrls: ['./incidente-crud.page.scss'],
})
export class IncidentCrudPage implements OnInit, OnDestroy {
  navigationSubscription: Subscription;
  validationsForm: FormGroup;
  incidente = {} as IncidenteModel;
  datePickerObjPtBr: any = {};

  insumos: InsumoModel[];

  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public router: Router,
    private formBuilder: FormBuilder,
    private incidenteService: IncidenteService,
    private sharedTabsIncidente: SharedTabsIncidente,
    private alertCtrl: AlertController,
    private auth: AuthService,
    public insumoService: InsumoService,
    private authService: AuthService,
    public toastController: ToastController
  ) {
    const user = authService.getUser();
    if (!user) {
      this.router.navigate(['login']);
    }
    this.incidente.insumos = [] as Array<InsumoModel>;
  }

  ngOnInit() {
    this.datePickerObjPtBr = {
      inputDate: new Date(), // If you want to set date in date-picker
      fromDate: new Date(),
      toDate: new Date().setFullYear(new Date().getFullYear() + 5),
      //disableWeekDays: [],
      //disabledDates: [],
      mondayFirst: true,
      showTodayButton: true,
      dateFormat: 'DD/MM/YYYY',
      closeOnSelect: false,
      setLabel: 'ok',
      todayLabel: 'Hoje',
      closeLabel: 'Cancelar',
      titleLabel: 'Selecione uma data',
      monthsList: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ],
      weeksList: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      clearButton: false,
      momentLocale: 'pt-BR',
      btnProperties: {
        expand: 'full', // "block" | "full"
        fill: 'clear', // "clear" | "default" | "outline" | "solid"
        size: '', // "default" | "large" | "small"
        disabled: '', // boolean (default false)
        strong: 'false', // boolean (default false)
        color: '',
        // "primary", "secondary", "tertiary", "success", "warning", "danger", "light", "medium", "dark" , and give color in string
      },
    };

    this.getInsumos();
    this.resetFields();
    this.getData();
  }

  getInsumos() {
    this.insumoService.getResults().subscribe(
      (res: any) => {
        this.insumos = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  resetFields() {
    this.validationsForm = this.formBuilder.group({
      descricao: new FormControl('', Validators.required),
      dataIncidente: new FormControl(''),
      insumo: new FormControl(''),
      // description: new FormControl('', Validators.required),
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  async onSubmit() {
    const loading = await this.loadingCtrl.create({
      message: 'Aguarde...',
    });

    this.presentLoading(loading);

    // console.log(this.incidente);
    if (this.validationsForm.valid) {
      if (this.incidente.id) {
        this.incidente.id_usuario_alteracao = this.auth.getUser().id;

        this.incidenteService
          .updateIncidente(this.incidente.id, this.incidente)
          .subscribe(
            (res) => {
              loading.dismiss();
              this.sharedTabsIncidente.tabIncidente = this.incidente;
              this.presentToast('Incidente alterado com sucesso!');
              this.router.navigate(['incidente']);
            },
            (err) => {
              loading.dismiss();
              console.log(err);
            }
          );
      } else {
        this.incidente.id_usuario_inclusao = this.auth.getUser().id;

        this.incidenteService.createIncidente(this.incidente).subscribe(
          (res) => {
            this.incidente.id = Number(res.id);
            loading.dismiss();
            this.sharedTabsIncidente.tabIncidente = this.incidente;
            this.presentToast('Incidente salvo com sucesso!');
            this.router.navigate(['incidente']);
          },
          (err) => {
            loading.dismiss();
            console.log(err);
          }
        );
      }
    } else {
      this.validateAllFormFields(this.validationsForm);
    }
  }

  async delete() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm',
      message: 'Deseja excluir o incidente ' + this.incidente.descricao + '?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Sim',
          handler: () => {
            this.deleteInicidente();
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteInicidente() {
    const loading = await this.loadingCtrl.create({
      message: 'Aguarde...',
    });

    this.presentLoading(loading);
    this.incidenteService.deleteIncidente(this.incidente.id).subscribe(
      (res) => {
        loading.dismiss();
        this.presentToast('Incidente excluído com sucesso!');
        this.sharedTabsIncidente.tabIncidente = this.incidente;
        this.router.navigate(['incidente']);
      },
      (err) => {
        loading.dismiss();
        console.log(err);
      }
    );
  }

  async getData() {
    if (!isUndefined(this.sharedTabsIncidente.tabIncidente)) {
      this.incidente = this.sharedTabsIncidente.tabIncidente;
    }

    if (!isUndefined(this.router.getCurrentNavigation().extras.state)) {
      this.incidente = this.router.getCurrentNavigation().extras.state.incidente;
      const loading = await this.loadingCtrl.create({
        message: 'Aguarde...',
      });
      this.presentLoading(loading);
      this.incidenteService.getIncidente(this.incidente.id).subscribe(
        (data) => {
          loading.dismiss();
          if (data) {
            this.incidente = data;
            this.sharedTabsIncidente.tabIncidente = this.incidente;
          }
        },
        (err) => {
          loading.dismiss();
          console.log(err);
        }
      );
    }
  }

  existIncidente(): boolean {
    return isUndefined(this.incidente.id);
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  isNewIncidente(): boolean {
    return isUndefined(this.sharedTabsIncidente.tabIncidente);
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  filterPorts(insus: InsumoModel[], text: string) {
    return insus.filter((insu) => {
      return insu.nome.toLowerCase().indexOf(text) !== -1;
    });
  }
}
