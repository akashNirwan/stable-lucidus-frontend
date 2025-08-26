
import { UAParser } from "ua-parser-js";
//commit
export function getDeviceInfo() {
  
  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem("deviceId", deviceId);
  }

  
  const parser = new UAParser();
  const result = parser.getResult();
  const deviceName = `${result.browser.name} ${result.browser.version} on ${result.os.name} ${result.os.version}`;

  return { deviceId, deviceName };
}
