import { Component } from '@angular/core';
import { Sensor } from '../../interfaces/Sensor';
import { SensorsService } from '../../services/sensors.service';
import { Router } from '@angular/router';
import { getDeviceImage } from '../../utils/device-image.util';
import { DeviceType } from '../../enums/device-type.enum';
import { getDeviceName } from '../../utils/device-name.util';

@Component({
  selector: 'app-sensor-form',
  templateUrl: './sensor-form.component.html',
  styleUrl: './sensor-form.component.scss',
})
export class SensorFormComponent {
  //default vales
  newSensor: Sensor = {
    DeviceId: Math.random().toString(),
    WebSiteDeviceName: '',
    DeviceOK: 1,
    DeviceType: DeviceType.MotionHanxi,
    DeviceTypeHebrew: '',
    InstallDate: new Date().toISOString(),
    LastReportDate: new Date().toISOString(),
    Picture: '',
  };
  DeviceType = DeviceType;

  constructor(private sensorsService: SensorsService, private router: Router) {}

  onSubmit(): void {
    this.newSensor.Picture = getDeviceImage(this.newSensor.DeviceType);
    this.newSensor.LastReportDate = new Date().toISOString();
    this.newSensor.DeviceTypeHebrew = getDeviceName(this.newSensor.DeviceType);
    debugger;
    this.sensorsService.addSensor(this.newSensor);
    console.log(this.newSensor);
    this.router.navigate(['/']);
  }
}
