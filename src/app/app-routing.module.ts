import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SensorFormComponent } from './components/sensor-form/sensor-form.component';
import { SensorDashboardComponent } from './components/sensor-dashboard/sensor-dashboard.component';

const routes: Routes = [
  { path: '', component: SensorDashboardComponent },
  { path: 'add-sensor', component: SensorFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
