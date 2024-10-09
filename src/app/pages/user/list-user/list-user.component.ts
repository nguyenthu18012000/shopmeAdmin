import { Component } from '@angular/core';
import { MainLayoutComponent } from '../../../components/main-layout/main-layout.component';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [MainLayoutComponent, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.scss',
})
export class ListUserComponent {
  constructor(private userService: UserService) {}

  listUser: any[] = [];

  ngOnInit() {
    this.userService
      .getListUser()
      .subscribe((e) => (this.listUser = e as any[]));
  }

  ngAfterViewChecked() {
    console.log(this.listUser);
  }
}
