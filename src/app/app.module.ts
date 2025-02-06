import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SensorSummaryComponent } from './components/sensor-summary/sensor-summary.component';
import { SensorListComponent } from './components/sensor-list/sensor-list.component';
import { SensorItemComponent } from './components/sensor-item/sensor-item.component';
import { SensorFormComponent } from './components/sensor-form/sensor-form.component';
import { SensorDashboardComponent } from './components/sensor-dashboard/sensor-dashboard.component';

@NgModule({
  declarations: [AppComponent, SensorSummaryComponent, SensorListComponent, SensorItemComponent, SensorFormComponent, SensorDashboardComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
