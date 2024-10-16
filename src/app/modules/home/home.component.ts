import { Component } from '@angular/core';

import { MainLayoutComponent } from '../../shared/components/main-layout/main-layout.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainLayoutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
