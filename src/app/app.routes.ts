import { Routes } from '@angular/router';

import { HomeComponent } from './modules/home/home.component';
import { ListUserComponent } from './modules/user/list-user/list-user.component';
import { EditUserComponent } from './modules/user/edit-user/edit-user.component';
import { CreateUserComponent } from './modules/user/create-user/create-user.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'users',
    children: [
      { path: '', component: ListUserComponent },
      { path: 'new', component: CreateUserComponent },
      { path: 'edit/:userId', component: EditUserComponent },
    ],
  },
  { path: '', component: HomeComponent },
  { path: '**', component: MainLayoutComponent },
];
