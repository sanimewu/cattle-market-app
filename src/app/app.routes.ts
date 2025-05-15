import { Routes } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {CattleListComponent} from './cattle/cattle-list/cattle-list.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'list', component:CattleListComponent}
];
