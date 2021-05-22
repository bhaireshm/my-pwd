import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/shared/home/home.component';
import { PageNotFoundComponent } from './modules/shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('../app/modules/auth/auth.module')
        .then((m) => m.AuthModule)
        .catch((e) => console.log(e)),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
