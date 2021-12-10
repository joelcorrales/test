import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaunchesComponent } from './launches/launches.component';
import { RocketsComponent } from './rockets/rockets.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LaunchesComponent,
      },
      {
        path: 'launch/:launchId/rocket/:rocketId',
        component: RocketsComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
