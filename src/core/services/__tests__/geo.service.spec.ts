import { GeoService } from "../geo.service";

describe("GeoService", () => {
  let mockFetch: jest.Mock;

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
  });

  describe("findGeoMetaFromIp", () => {
    it("should return the geo meta from ip", async () => {
      mockFetch.mockResolvedValue({ json: () => Promise.resolve({ ok: true, country_name: "United States", city: "New York", region: "NY", latitude: 40.7128, longitude: -74.006, languages: "en-US", country_calling_code: "+1" }) } as unknown as Response);
      const geoMeta = await GeoService.findGeoMetaFromIp("194.116.220.0");
      expect(geoMeta).toEqual({ country: "United States", city: "New York", region: "NY", latitude: 40.7128, longitude: -74.006, language: "en-US", countryPhoneCode: "+1" });
      expect(mockFetch).toHaveBeenCalledWith("https://ipapi.co/194.116.220.0/json/");
    });

    it("should return an empty object if the ip is null", async () => {
      const geoMeta = await GeoService.findGeoMetaFromIp(null);
      expect(geoMeta).toEqual({});
    });

    it("should return an empty object if the fetch method fails", async () => {
      mockFetch.mockResolvedValueOnce({ ok: false } as unknown as Response);
      const geoMeta = await GeoService.findGeoMetaFromIp("194.116.220.0");
      expect(geoMeta).toEqual({});
    });

    it("should return an empty object if the response is not ok", async () => {
      mockFetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ error: "Invalid IP address" }) } as unknown as Response);
      const geoMeta = await GeoService.findGeoMetaFromIp("194.116.220.0");
      expect(geoMeta).toEqual({});
    });
  });
});
