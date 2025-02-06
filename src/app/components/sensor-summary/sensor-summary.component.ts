import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Sensor } from '../../interfaces/Sensor';
import { SensorsService } from '../../services/sensors.service';

@Component({
  selector: 'app-sensor-summary',
  templateUrl: './sensor-summary.component.html',
  styleUrl: './sensor-summary.component.scss',
})
export class SensorSummaryComponent {
  sensors$: Observable<Sensor[]> = this.sensorsService.sensors$;
  sensorsCount$: Observable<{ working: number; notWorking: number }> =
    this.sensorsService.sensorsCount$;

  constructor(private sensorsService: SensorsService) {}
}
