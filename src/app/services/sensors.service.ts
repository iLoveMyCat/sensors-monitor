import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Sensor } from '../interfaces/Sensor';

@Injectable({
  providedIn: 'root',
})
export class SensorsService {
  private sensorJsonPath = 'assets/sensors.json';

  private sensorsState = new BehaviorSubject<Sensor[]>([]);
  sensors$ = this.sensorsState.asObservable();

  private filteredSensorsState = new BehaviorSubject<Sensor[]>([]);
  filteredSensors$ = this.filteredSensorsState.asObservable();

  private sensorCountState = new BehaviorSubject<{
    working: number;
    notWorking: number;
  }>({ working: 0, notWorking: 0 });
  sensorsCount$ = this.sensorCountState.asObservable();

  constructor(private http: HttpClient) {}

  fetchSensors(): void {
    this.http
      .get<Sensor[]>(this.sensorJsonPath)
      .pipe(
        tap((data) => {
          this.updateSensorState(data);
          console.log('Sensors fetched:', data);
        }),
        tap(() => {
          this.filterSensors({ name: '', startDate: null, endDate: null });
        })
      )
      .subscribe();
  }

  toggleSensorState(deviceId: string) {
    const currentSensors = this.sensorsState.getValue();

    const updatedSensors = currentSensors.map((sensor: Sensor) => {
      if (deviceId == sensor.DeviceId) {
        sensor.DeviceOK = sensor.DeviceOK == 1 ? 0 : 1;
        sensor.LastReportDate = new Date().toISOString();
      }
      return sensor;
    });

    this.updateSensorState(updatedSensors);
  }

  addSensor(newSensor: Sensor): void {
    const updatedSensors = [...this.sensorsState.value, newSensor];
    this.updateSensorState(updatedSensors);
  }

  filterSensors(filter: {
    name: string;
    startDate: Date | null;
    endDate: Date | null;
  }) {
    const sensors = this.sensorsState.getValue();

    if (!filter.name && !filter.startDate && !filter.endDate) {
      this.filteredSensorsState.next(sensors);
      return;
    }

    const filtered = sensors.filter((sensor) => {
      const matchesName =
        !filter.name || sensor.WebSiteDeviceName.includes(filter.name);
      const matchesDateRange = this.isWithinDateRange(
        sensor.LastReportDate,
        filter.startDate,
        filter.endDate
      );
      return matchesName && matchesDateRange;
    });

    this.filteredSensorsState.next(filtered);
  }

  private isWithinDateRange(
    dateString: string | null,
    startDate: Date | null,
    endDate: Date | null
  ): boolean {
    if (!dateString) return true;
    const date = new Date(dateString);
    return (
      (!startDate || date >= new Date(startDate)) &&
      (!endDate || date <= new Date(endDate))
    );
  }

  //centralized update state
  private updateSensorState(sensors: Sensor[]) {
    this.sensorsState.next(sensors);
    this.updateCounts(sensors);
  }

  private updateCounts(sensors: Sensor[]) {
    const totalCount = sensors.length;
    const workingSensors = sensors.filter((s) => s.DeviceOK == 1).length;
    const notWorkingSensors = totalCount - workingSensors;

    this.sensorCountState.next({
      working: workingSensors,
      notWorking: notWorkingSensors,
    });
  }
}
