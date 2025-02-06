import { ChangeDetectorRef, Component } from '@angular/core';
import { SensorsService } from '../../services/sensors.service';
import { Sensor } from '../../interfaces/Sensor';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-sensor-dashboard',
  templateUrl: './sensor-dashboard.component.html',
  styleUrl: './sensor-dashboard.component.scss',
})
export class SensorDashboardComponent {
  filter = {
    name: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
  };

  filteredSensors$: Observable<Sensor[]> = this.sensorsService.filteredSensors$;

  constructor(private sensorsService: SensorsService) {}

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.sensorsService.filterSensors(this.filter);
  }

  clearFilters(): void {
    this.filter = { name: '', startDate: null, endDate: null };
    this.applyFilters();
  }
}
