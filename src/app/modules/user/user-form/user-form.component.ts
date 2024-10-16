import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { UserService } from '../../../services/user.service';
import { RoleValidator } from '../../../shared/directives/role-validator.directive';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  listRoles: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  @Input() userForm: FormGroup = new FormGroup({
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

  onCancel() {
    this.router.navigate(['/users']);
  }

  get email() {
    return this.userForm.get('email');
  }

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get password() {
    return this.userForm.get('password');
  }

  get roles() {
    return this.userForm.get('roles');
  }

  ngOnInit() {
    this.userService
      .getListUserRole()
      .subscribe((roles) => (this.listRoles = roles as any[]));
  }

  onCheck(id: number) {
    const roles = this.userForm.value.roles ?? [];
    let newRole;
    if (roles.includes(id)) {
      newRole = roles.filter((e: number) => e !== id);
    } else {
      newRole = [...roles, id];
    }
    this.userForm.patchValue({
      roles: newRole,
    });
  }

  @Output() formSubmitEvent = new EventEmitter<any>();
  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.formSubmitEvent.emit(this.userForm.value);
  }
}
