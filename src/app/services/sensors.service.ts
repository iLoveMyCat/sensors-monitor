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
          console.log('sensors fetched:', data);
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
