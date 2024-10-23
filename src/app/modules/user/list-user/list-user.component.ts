import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, switchMap } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';

import {
  faPortrait,
  faEdit,
  faTrash,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { UserService } from '../../../services/user.service';
import { MainLayoutComponent } from '../../../shared/components/main-layout/main-layout.component';

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
  faPortrait = faPortrait;
  faEdit = faEdit;
  faTrash = faTrash;
  faCheckCircle = faCheckCircle;

  listUser: any[] = [];
  page: number = 1;
  pageSize: number = 0;
  totalPage: number = 0;
  totalItems: number = 0;

  private pageSubject = new BehaviorSubject<number>(1);

  page$ = this.pageSubject.asObservable();

  constructor(private userService: UserService) {
    this.page$
      .pipe(switchMap((page) => this.userService.getListUser(page)))
      .subscribe((e: any) => {
        this.listUser = e?.items as any[];
        this.page = e?.page;
        this.pageSize = e?.pageSize;
        this.totalPage = e?.totalPage;
        this.totalItems = e?.totalItems;
      });
  }

  onDeleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((_) => {
      this.pageSubject.next(1);
    });
  }

  onChangePage(page: number) {
    if (page < 1) {
      this.pageSubject.next(1);
      return;
    }
    if (page > this.totalPage) {
      this.pageSubject.next(this.totalPage);
      return;
    }
    this.pageSubject.next(page);
  }
}
