import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, switchMap } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';

import {
  faPortrait,
  faEdit,
  faTrash,
  faCheckCircle,
  faSortUp,
  faSortDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { UserService } from '../../../services/user.service';
import { ExportUtil } from '../../../shared/utils/export.util';
import { IGetListUserParam } from '../../../core/models/user.model';
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
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss',
})
export class ListUserComponent {
  faPortrait = faPortrait;
  faEdit = faEdit;
  faTrash = faTrash;
  faCheckCircle = faCheckCircle;
  faSortUp = faSortUp;
  faSortDown = faSortDown;

  listUser: any[] = [];
  page: number = 1;
  pageSize: number = 0;
  totalPage: number = 0;
  totalItems: number = 0;
  sortField: string = 'firstName';
  sortDir: string = 'asc';

  searchForm: FormGroup = new FormGroup({
    search: new FormControl(''),
  });

  private pageSubject = new BehaviorSubject<IGetListUserParam>({
    page: 1,
    sortField: 'firstName',
    sortDir: 'asc',
    keyword: '',
  });

  page$ = this.pageSubject.asObservable();

  constructor(private userService: UserService) {
    this.page$
      .pipe(switchMap((params) => this.userService.getListUser(params)))
      .subscribe((e: any) => {
        this.listUser = e?.items as any[];
        this.page = e?.page;
        this.pageSize = e?.pageSize;
        this.totalPage = e?.totalPage;
        this.totalItems = e?.totalItems;
      });
  }

  onDeleteUser(id: number) {
    const value = this.pageSubject.value;
    this.userService.deleteUser(id).subscribe((_) => {
      this.pageSubject.next({ ...value, page: 1 });
    });
  }

  onChangePage(page: number) {
    const value = this.pageSubject.value;
    if (page < 1) {
      this.pageSubject.next({ ...value, page: 1 });
      return;
    }
    if (page > this.totalPage) {
      this.pageSubject.next({ ...value, page: this.totalPage });
      return;
    }
    this.pageSubject.next({ ...value, page: page });
  }

  onChangeSort(sortFieldClick: string, sortDirClick?: string) {
    const value = this.pageSubject.value;
    console.log(value, sortDirClick);
    if (sortFieldClick === this.sortField && sortDirClick) {
      this.sortDir = sortDirClick;
      this.pageSubject.next({ ...value, sortDir: sortDirClick });
      return;
    }
    if (sortFieldClick !== this.sortField) {
      this.sortField = sortFieldClick;
      this.sortDir = 'asc';
      this.pageSubject.next({
        ...value,
        sortField: sortFieldClick,
        sortDir: 'asc',
      });
    }
  }

  onSearch() {
    const value = this.pageSubject.value;
    const searchValue = this.searchForm.value?.search;
    this.pageSubject.next({ ...value, page: 1, keyword: searchValue });
  }

  onClear() {
    const value = this.pageSubject.value;
    this.searchForm.setValue({ search: '' });
    this.pageSubject.next({ ...value, page: 1, keyword: '' });
  }

  onExportCSV() {
    this.userService.exportUserCSV().subscribe((e) => {
      ExportUtil.exportExcel(e, 'filename');
    });
  }
}
