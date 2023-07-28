import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: "",//raiz de la app
    pathMatch:'full',//coincida nombre exacto
    loadChildren: () => import('src/pages/products/list/list.module').then(m => m.ListModule)
  },
  {
    path: "list",
    loadChildren: () => import('src/pages/products/list/list.module').then(m => m.ListModule)
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
