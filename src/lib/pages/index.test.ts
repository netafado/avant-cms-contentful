jest.mock("@/lib/contentful", () => ({
  client: { pageLanding: jest.fn() },
}));

import { client } from "@/lib/contentful";
import { getPageData } from "./index";

const mockPageLanding = client.pageLanding as jest.Mock;

const homepage = { internalName: "Homepage" };

// The route locales ("en", "pt-BR") are not all valid Contentful locale codes:
// the space's default locale is "en-US", so the lookup must translate before
// querying or Contentful rejects the request with UNKNOWN_LOCALE.
describe("getPageData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPageLanding.mockResolvedValue({
      pageLandingCollection: { items: [homepage] },
    });
  });

  it("maps the bare 'en' route locale onto Contentful's en-US", async () => {
    await expect(getPageData("/", "en")).resolves.toBe(homepage);

    expect(mockPageLanding).toHaveBeenCalledWith({
      where: { url: "/" },
      locale: "en-US",
    });
  });

  it("passes pt-BR through unchanged", async () => {
    await getPageData("resume", "pt-BR");

    expect(mockPageLanding).toHaveBeenCalledWith({
      where: { url: "resume" },
      locale: "pt-BR",
    });
  });

  it("falls back to the default locale for unsupported route locales", async () => {
    await getPageData("/", "fr");

    expect(mockPageLanding).toHaveBeenCalledWith(
      expect.objectContaining({ locale: "en-US" })
    );
  });

  it("returns null instead of throwing when the CMS call fails", async () => {
    mockPageLanding.mockRejectedValue(new Error("UNKNOWN_LOCALE"));
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await expect(getPageData("/", "pt-BR")).resolves.toBeNull();

    consoleError.mockRestore();
  });
});
