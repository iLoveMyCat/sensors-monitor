import { DeviceType } from '../enums/device-type.enum';

const deviceImageMap: { [key in DeviceType]: string } = {
  [DeviceType.MotionHanxi]: 'motion_hanxi',
  [DeviceType.MotionPhilio]: 'motion_philio',
  [DeviceType.Contact]: 'contact_hanxi',
  [DeviceType.Water]: 'water_philio',
  [DeviceType.Boiler]: 'boiler_mco_rect',
  [DeviceType.ZwaveLight]: 'zwavelight_mcohome_rect',
  [DeviceType.Camera]: 'camera_viv',
};

export function getDeviceImage(deviceType: DeviceType): string {
  return deviceImageMap[deviceType];
}
