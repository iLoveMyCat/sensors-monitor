import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Sensor } from '../interfaces/Sensor';

@Injectable({
  providedIn: 'root',
})
export class SensorsService {
  private sensorsState = new BehaviorSubject<Sensor[]>([]);
  private sensorJsonPath = 'assets/sensors.json';

  constructor(private http: HttpClient) {}

  get sensors$(): Observable<Sensor[]> {
    return this.sensorsState.asObservable();
  }

  fetchSensors(): void {
    this.http
      .get<Sensor[]>(this.sensorJsonPath)
      .pipe(
        tap((data) => {
          this.sensorsState.next(data);
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
      }
      return sensor;
    });

    this.sensorsState.next(updatedSensors);
  }
}
