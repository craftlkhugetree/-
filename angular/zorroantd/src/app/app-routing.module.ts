import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path:'', pathMatch: 'full', redirectTo: '/pages/table-sort-combine' },
  // { path:'*', redirectTo:'/pages/monitor'},
  { path: 'pages', loadChildren : () => import('./pages/pages.module').then(m => m.PagesModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
