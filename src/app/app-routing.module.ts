
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: "",//raiz de la app
    pathMatch:'full',//coincida nombre exacto
    loadChildren: () => import('src/pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'user',
    loadChildren: () => import('src/core/components/user/login.module').then(m => m.LoginModule)
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
