import { DeviceType } from '../enums/device-type.enum';

const deviceNameMap: { [key in DeviceType]: string } = {
  [DeviceType.MotionHanxi]: 'גלאי תנועה',
  [DeviceType.MotionPhilio]: 'גלאי תנועה',
  [DeviceType.Contact]: 'גלאי דלת/חלון',
  [DeviceType.Water]: 'גלאי הצפה',
  [DeviceType.Boiler]: 'בקר דוד',
  [DeviceType.ZwaveLight]: 'בקר תאורה',
  [DeviceType.Camera]: 'מצלמה',
};

export function getDeviceName(deviceType: DeviceType): string {
  return deviceNameMap[deviceType];
}
