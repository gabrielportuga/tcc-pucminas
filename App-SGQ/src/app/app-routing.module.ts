import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'incidente-crud',
    loadChildren: () =>
      import('./incidente-crud/incidente-crud.module').then(
        (m) => m.IncidentCrudPageModule
      ),
  },
  {
    path: 'incidente-crud/:id',
    loadChildren: () =>
      import('./incidente-crud/incidente-crud.module').then(
        (m) => m.IncidentCrudPageModule
      ),
  },
  {
    path: 'incidente-insumo-nc',
    loadChildren: () =>
      import('./incidente-insumo-nc/incidente-insumo-nc.module').then(
        (m) => m.IncidenteInsumoNcPageModule
      ),
  },
  {
    path: 'incidente',
    loadChildren: () => import('./incidente/incidente.module').then( m => m.IncidentePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
