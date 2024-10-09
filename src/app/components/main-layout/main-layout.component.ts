import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  NgbAlertModule,
  NgbModule,
  NgbNavConfig,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
