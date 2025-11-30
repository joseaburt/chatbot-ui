import { GeoMetaDTO } from "../dtos/geo.dto";

export class GeoService {
  public static async findGeoMetaFromIp(ip: string | null): Promise<GeoMetaDTO> {
    if (!ip) return {} as GeoMetaDTO;
    try {
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      if (!response.ok) return {} as GeoMetaDTO;
      const geo = await response.json();

      return {
        country: geo.country_name,
        city: geo.city,
        region: geo.region,
        latitude: geo.latitude,
        longitude: geo.longitude,
        language: `${geo.languages}`.split(",")[0] ?? "es-ES",
        countryPhoneCode: geo.country_calling_code,
      };
    } catch (e) {
      return {} as GeoMetaDTO;
    }
  }

  public static getBrowserProvider(): string {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes("edg")) return "edge";
    if (ua.includes("chrome") && !ua.includes("edg") && !ua.includes("opr")) return "chrome";
    if (ua.includes("firefox")) return "firefox";
    if (ua.includes("safari") && !ua.includes("chrome")) return "safari";
    if (ua.includes("opr") || ua.includes("opera")) return "opera";
    return "unknown";
  }
}
