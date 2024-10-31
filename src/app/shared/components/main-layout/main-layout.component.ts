import {
  NgbAlertModule,
  NgbModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { PaginationComponent } from '../pagination/pagination.component';

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
