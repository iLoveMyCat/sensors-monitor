import { Component, Input } from '@angular/core';
import { SensorsService } from '../../services/sensors.service';
import { Observable } from 'rxjs';
import { Sensor } from '../../interfaces/Sensor';

@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrl: './sensor-list.component.scss',
})
export class SensorListComponent {
  @Input() filteredSensors: Sensor[] = [];

  toggleSensorState(deviceId: string) {
    this.sensorsService.toggleSensorState(deviceId);
  }
  constructor(private sensorsService: SensorsService) {}
}
