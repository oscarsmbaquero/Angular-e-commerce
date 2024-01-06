import { CardPlayModule } from './../pages/products/card-play/card-play.module';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/guards/auth.guard';


const routes: Routes = [
  {
    path: "",//raiz de la app
    pathMatch:'full',//coincida nombre exacto
    loadChildren: () => import('src/pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'user',
    loadChildren: () => import('src/core/components/user/user.module').then(m => m.UserModule)
  },
   {
    path: "list",
    loadChildren: () => import('src/pages/products/list/list.module').then(m => m.ListModule)
   },
   {
    path: "detail/:id",
    loadChildren: () => import('src/pages/products/detail/detail.module').then(m => m.DetailModule)
   },
   {
    path: "cesta",
    loadChildren: () => import('src/pages/products/cart/cart.module').then(m => m.CartModule)
   },
   {
    path: 'client',
    canActivate: [AuthGuard],
    loadChildren: () => import('src/pages/client/client.module').then(m => m.ClientModule)
  },
  {
    path: 'inventario',
    //canActivate: [AuthGuard],
    loadChildren: () => import('src/pages/products/inventary/inventary.module').then(m => m.InventaryModule)
  },
  {
    path: 'envios',
    //canActivate: [AuthGuard],
    loadChildren: () => import('src/pages/products/shipments/shipments.module').then(m => m.ShipmentsModule)
  },
  {
    path: 'clients',
    //canActivate: [AuthGuard],
    loadChildren: () => import('src/pages/client/clients/clients.module').then(m => m.ClientsModule)
  },
  {
    path: 'ventas',
    //canActivate: [AuthGuard],
    loadChildren: () => import('src/pages/ventas/ventas.module').then(m => m.VentasModule)
  },
  {
    path: 'anadir',
    //canActivate: [AuthGuard],
    loadChildren: () => import('src/pages/products/anadir/anadir.module').then(m => m.AnadirModule)
  },
  {
    path: 'anadir-gasto',
    //canActivate: [AuthGuard],
    loadChildren: () => import('src/pages/gastos/gastos.module').then(m => m.GastosModule)
  },
  {
    path: 'top-ventas',
    //canActivate: [AuthGuard],
    loadChildren: () => import('src/pages/products/top-ventas/top-ventas.module').then(m => m.TopVentasModule)
  },
  {
    path: 'parrilla',
    //canActivate: [AuthGuard],
    loadChildren: () => import('src/pages/products/cartelera-products/cartelera-products.module').then(m => m.CarteleraProductsModule)
  },
  {
    path: 'card-play',
    //canActivate: [AuthGuard],
    loadChildren: () => import('src/pages/products/card-play/card-play.module').then(m => m.CardPlayModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
