import { Component, OnInit } from '@angular/core';
import { SensorsService } from './services/sensors.service';
import { Sensor } from './interfaces/Sensor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  sensors: Sensor[] = [];

  constructor(private sensorsService: SensorsService) {}

  ngOnInit(): void {
    this.sensorsService.sensors$.subscribe((data) => {
      this.sensors = data;
      console.log('sensors initialized:', this.sensors);
    });

    this.sensorsService.fetchSensors();
  }

  title = 'sensors-monitor';
}
