import { IpService } from "../ip.service";

describe("IpService", () => {
  let mockFetch: jest.Mock;

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
  });

  it("should get the ip address", async () => {
    mockFetch.mockResolvedValue({ json: () => Promise.resolve({ ip: "194.116.220.0" }), ok: true } as unknown as Response);
    const ip = await IpService.getIp();
    expect(ip).toBe("194.116.220.0");
    expect(mockFetch).toHaveBeenCalledWith("https://api.ipify.org?format=json");
  });

  it("should throw an error if the fetch method fails", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false } as unknown as Response);
    const ip = await IpService.getIp();
    expect(ip).toBeNull();
  });
});
