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
      .pipe(tap((data) => this.sensorsState.next(data)))
      .subscribe();
  }
}
