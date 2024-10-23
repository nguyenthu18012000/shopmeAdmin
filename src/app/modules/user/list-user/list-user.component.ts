import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
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

import { toSignal, toObservable } from '@angular/core/rxjs-interop';
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

  pageSignal = signal(1);
  page$ = toObservable(this.pageSignal);

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.page$
      .pipe(switchMap((_) => this.userService.getListUser(this.pageSignal())))
      .subscribe((e: any) => {
        this.listUser = e?.items as any[];
        this.page = e?.page;
        this.pageSize = e?.pageSize;
        this.totalPage = e?.totalPage;
        this.totalItems = e?.totalItems;
      });
  }

  onGetList() {}

  onDeleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((_) => {
      this.pageSignal.set(1);
    });
  }

  onChangePage(page: number) {
    if (page < 1) {
      this.pageSignal.set(1);
      return;
    }
    if (page > this.totalPage) {
      this.pageSignal.set(this.totalPage);

      return;
    }
    this.pageSignal.set(page);
  }
}
