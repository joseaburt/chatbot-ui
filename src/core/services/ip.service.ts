export class IpService {
  public static async getIp() {
    const response = await fetch("https://api.ipify.org?format=json");
    if (!response.ok) return null;
    const data = await response.json();
    return data.ip;
  }
}
