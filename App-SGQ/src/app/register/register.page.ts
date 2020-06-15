import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  validationsForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  validationMessages = {
    displayName: [
      { type: 'required', message: 'Name is required.' },
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' },
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      {
        type: 'minlength',
        message: 'Password must be at least 5 characters long.',
      },
    ],
  };

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      displayName: new FormControl(
        '',
        Validators.required
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.minLength(5), Validators.required])
      ),
    });
  }

  tryRegister(value) {
    // this.authService.doRegister(value).then(
    //   (res) => {
    //     console.log(res);
    //     this.errorMessage = '';
    //     this.successMessage = 'Your account has been created. Please log in.';
    //   },
    //   (err) => {
    //     console.log(err);
    //     this.errorMessage = err.message;
    //     this.successMessage = '';
    //   }
    // );
  }

  goLoginPage() {
    this.router.navigate(['/login']);
  }
}
