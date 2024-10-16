import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import {
  faPortrait,
  faEdit,
  faTrash,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../../../services/user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainLayoutComponent } from '../../../components/main-layout/main-layout.component';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [
    MainLayoutComponent,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
  ],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss',
})
export class ListUserComponent {
  constructor(private userService: UserService) {}

  listUser: any[] = [];
  faPortrait = faPortrait;
  faEdit = faEdit;
  faTrash = faTrash;
  faCheckCircle = faCheckCircle;

  ngOnInit() {
    this.userService
      .getListUser()
      .subscribe((e) => (this.listUser = e as any[]));
  }
}
