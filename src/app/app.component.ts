import { Component, OnInit } from '@angular/core';
import { SensorsService } from './services/sensors.service';
import { Sensor } from './interfaces/Sensor';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private sensorsService: SensorsService) {}
  sensorsCount$: Observable<{ working: number; notWorking: number }> =
    this.sensorsService.sensorsCount$;

  ngOnInit(): void {
    this.sensorsService.fetchSensors();
  }
}
