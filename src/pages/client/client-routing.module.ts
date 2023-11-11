import { OrderComponent } from './orders/order.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientAccountComponent } from './client-account/client-account.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';

const routes: Routes = [
  {
    path: 'orders',
    component: OrderComponent,
  },
  {
    path: 'account',
    component: ClientAccountComponent,
  },
  {
    path: 'profile',
    component: ClientProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
