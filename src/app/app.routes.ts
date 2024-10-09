import { Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { ListUserComponent } from './pages/user/list-user/list-user.component';
import { CreateUserComponent } from './pages/user/create-user/create-user.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: 'users',
    children: [
      { path: '', component: ListUserComponent },
      { path: 'new', component: CreateUserComponent },
    ],
  },
  { path: '', component: HomeComponent },
  { path: '**', component: MainLayoutComponent },
];
