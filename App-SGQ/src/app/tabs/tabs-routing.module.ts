import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      // {
      //   path: 'incidente-list',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () =>
      //         import('../incidente-list/incidente-list.module').then(m => m.IncidenteListPageModule)
      //     }
      //   ]
      // },
      {
        path: 'incidente-crud',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../incidente-crud/incidente-crud.module').then(m => m.IncidentCrudPageModule)
          }
        ]
      },
      {
        path: 'incidente-insumo-nc',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../incidente-insumo-nc/incidente-insumo-nc.module').then(m => m.IncidenteInsumoNcPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/incidente-crud',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/incidente-crud',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
