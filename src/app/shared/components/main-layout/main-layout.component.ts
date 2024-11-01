import {
  NgbAlertModule,
  NgbModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { PaginationComponent } from '@app/shared/components/pagination/pagination.component';
import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    RouterLink,
    RouterLinkActive,
    PaginationComponent,
    IconComponent,
    CommonModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  current = 7;
  total = 20;
  onGoTo(page: any) {
    this.current = page;
    console.log(page);
  }
}
