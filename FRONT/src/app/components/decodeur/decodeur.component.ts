import { Component } from '@angular/core';

@Component({
  selector: 'app-decodeur',
  templateUrl: './decodeur.component.html',
  styleUrl: './decodeur.component.scss'
})
export class DecodeurComponent {

  constructor() {}

  scan(action: any, fn: string): void {
    const playDeviceFacingBack = (devices: any[]) => {
      // front camera or back camera check here!
      const device = devices.find(f => (/back|rear|environment/gi.test(f.label))); // Default Back Facing Camera
      action.playDevice(device ? device.deviceId : devices[0].deviceId);
    }
    if (fn === 'start') action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r), alert);
    else action[fn]().subscribe((r: any) => console.log(fn, r), alert);
  }
}
