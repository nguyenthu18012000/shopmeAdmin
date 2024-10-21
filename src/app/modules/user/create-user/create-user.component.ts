import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { UserService } from '../../../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { RoleValidator } from '../../../shared/directives/role-validator.directive';
import { MainLayoutComponent } from '../../../shared/components/main-layout/main-layout.component';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    MainLayoutComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    UserFormComponent,
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  listRoles: any[] = [];

  createUserForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(45),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(45),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
    roles: new FormControl([] as number[], [RoleValidator()]),
    enabled: new FormControl(true),
    photos: new FormControl(''),
  });

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(value: any) {
    const formData = new FormData();
    formData.append('email', this.createUserForm.value?.email || '');
    formData.append('firstName', this.createUserForm.value?.firstName || '');
    formData.append('lastName', this.createUserForm.value?.lastName || '');
    formData.append('password', this.createUserForm.value?.password || '');
    formData.append(
      'roles',
      this.createUserForm.value?.roles?.toString() || ''
    );
    formData.append('enabled', this.createUserForm.value?.enabled ? '1' : '0');
    formData.append('image', value?.image);

    this.userService.createUser(formData).subscribe({
      next: (res) => {
        if (res === 'email is existed') {
          this.createUserForm.controls['email'].setErrors({
            emailAlreadyExist: true,
          });
        } else {
          this.router.navigate(['/users']);
        }
      },
      error: (err) => {},
    });
  }

  onCancel() {
    this.router.navigate(['/users']);
  }
}
