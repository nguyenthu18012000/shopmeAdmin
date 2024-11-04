import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { IRuleValidate } from '../../shared/models/common-input.model';
import { AuthCoreService } from '../../core/services/auth-core.service';
import { CommonInputComponent } from '../../shared/components/common-input/common-input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CommonInputComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
  });

  constructor(private readonly authService: AuthService) {}

  errorEmail: Array<IRuleValidate> = [
    {
      rule: 'required',
      errorMessage: 'Email is required.',
    },
    {
      rule: 'email',
      errorMessage: 'Must be an email.',
    },
    {
      rule: 'emailAlreadyExist',
      errorMessage: 'Email is already exist.',
    },
  ];

  get email(): AbstractControl<any, any> | null {
    return this.loginForm.get('email');
  }

  errorPassword: Array<IRuleValidate> = [
    {
      rule: 'required',
      errorMessage: 'Password is required.',
    },
    {
      rule: 'minlength',
      errorMessage: 'Length must be from 8 to 20 characters.',
    },
    {
      rule: 'maxlength',
      errorMessage: 'Length must be from 8 to 20 characters.',
    },
  ];

  get password(): AbstractControl<any, any> | null {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (e: any) => {
        console.log(e?.access_token);
        AuthCoreService.setAccessToken(e?.access_token);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
