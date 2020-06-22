import { UserModel } from './../../models/user-model';
import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validationsForm: FormGroup;
  errorMessage = '';

  validationMessages = {
    cpf: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' },
    ],
    senha: [
      { type: 'required', message: 'A senha é obrigatória' },
      {
        type: 'minlength',
        message: 'A senha deve possuir mais de 5 caracteres.',
      },
    ],
  };

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    // this.menuCtrl.enable(false);
    this.validationsForm = this.formBuilder.group({
      cpf: new FormControl(
        '',
        Validators.compose([Validators.minLength(5), Validators.required])
        // Validators.compose([
        //   Validators.required,
        //   Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        // ])
      ),
      senha: new FormControl(
        '',
        Validators.compose([Validators.minLength(5), Validators.required])
      ),
    });
  }

  tryLogin(value) {
    this.authService.doLogin(value).subscribe(
      (res) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/incidente']);
        window.location.reload();
      },
      (err) => {
        this.errorMessage = 'Usuário ou senha inválidos!';
        console.log(err);
      }
    );
  }

  goRegisterPage() {
    this.router.navigate(['/register']);
  }
}
