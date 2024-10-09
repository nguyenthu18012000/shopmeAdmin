import { Component, SimpleChanges } from '@angular/core';
import { MainLayoutComponent } from '../../../components/main-layout/main-layout.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RoleValidator } from './validators.directive';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    MainLayoutComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
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
  });

  constructor(private userService: UserService, private router: Router) {}

  get email() {
    return this.createUserForm.get('email');
  }

  get firstName() {
    return this.createUserForm.get('firstName');
  }

  get lastName() {
    return this.createUserForm.get('lastName');
  }

  get password() {
    return this.createUserForm.get('password');
  }

  get roles() {
    return this.createUserForm.get('roles');
  }

  ngOnInit() {
    this.userService
      .getListUserRole()
      .subscribe((roles) => (this.listRoles = roles as any[]));
  }

  onSubmit() {
    if (this.createUserForm.invalid) {
      this.createUserForm.markAllAsTouched();
      return;
    }
    this.userService.createUser(this.createUserForm.value).subscribe({
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

  onCheck(id: number) {
    const roles = this.createUserForm.value.roles ?? [];
    let newRole;
    if (roles.includes(id)) {
      newRole = roles.filter((e) => e !== id);
    } else {
      newRole = [...roles, id];
    }
    this.createUserForm.patchValue({
      roles: newRole,
    });
  }
}
