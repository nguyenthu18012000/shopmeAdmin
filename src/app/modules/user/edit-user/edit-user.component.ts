import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RegexConstant } from '../../../core/constants/regex';
import { UserService } from '../../../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { RoleValidator } from '../../../shared/directives/role-validator.directive';
import { MainLayoutComponent } from '../../../shared/components/main-layout/main-layout.component';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    UserFormComponent,
    MainLayoutComponent,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent {
  currentUserId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly userService: UserService
  ) {}

  editUserForm = new FormGroup({
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
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
    roles: new FormControl([] as number[], [RoleValidator()]),
    enabled: new FormControl(true),
    photos: new FormControl(''),
  });

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('userId');
    if (!!userId && RegexConstant.REGEX_NUMBER_ONLY.test(userId)) {
      this.currentUserId = Number(userId);
      this.userService.getUserById(Number(userId)).subscribe((e: any) => {
        this.editUserForm.controls['email'].setValue(e?.email);
        this.editUserForm.controls['firstName'].setValue(e?.firstName);
        this.editUserForm.controls['lastName'].setValue(e?.lastName);
        this.editUserForm.controls['roles'].setValue(
          e?.roles.map((role: any) => role?.id)
        );
        this.editUserForm.controls['enabled'].setValue(e?.enabled);
      });
    }
  }

  onSubmit(value: any) {
    const formData = new FormData();
    formData.append('email', this.editUserForm.value?.email || '');
    formData.append('firstName', this.editUserForm.value?.firstName || '');
    formData.append('lastName', this.editUserForm.value?.lastName || '');
    formData.append('password', this.editUserForm.value?.password || '');
    formData.append('roles', this.editUserForm.value?.roles?.toString() || '');
    formData.append('enabled', this.editUserForm.value?.enabled ? '1' : '0');
    formData.append('image', value?.image);
    formData.append('id', this.currentUserId.toString());

    this.userService.editUser(formData).subscribe({
      next: (res) => {
        if (res === 'email is existed') {
          this.editUserForm.controls['email'].setErrors({
            emailAlreadyExist: true,
          });
        } else {
          this.router.navigate(['/users']);
        }
      },
      error: (err) => {},
    });
  }
}
