import { NewPasswordComponent } from './new-password/new-password.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: "",
    component: UserComponent
  },
  {
    path: "reset",
    component: ResetPasswordComponent
  },
  {
    path: "new",
    component: NewPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }