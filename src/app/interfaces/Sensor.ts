import { DeviceType } from '../enums/device-type.enum';

export interface Sensor {
  InstallDate: string;
  DeviceOK: number;
  DeviceTypeHebrew: string;
  DeviceId: string;
  DeviceType: DeviceType;
  WebSiteDeviceName: string;
  LastReportDate: string;
  Picture: string;
}
