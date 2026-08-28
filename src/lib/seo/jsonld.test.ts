import {
  buildBreadcrumbList,
  buildOrganization,
  buildPerson,
  buildProfilePage,
  buildWebSite,
} from "./jsonld";
import { siteConfig } from "./site-config";

describe("jsonld builders", () => {
  it("builds a Person with a stable @id and the configured socials", () => {
    const person = buildPerson();
    expect(person["@context"]).toBe("https://schema.org");
    expect(person["@type"]).toBe("Person");
    expect(person["@id"]).toBe(siteConfig.personId);
    expect(person["@id"]).toMatch(/^https?:\/\/.+\/#person$/);
    expect(person.sameAs).toEqual(
      expect.arrayContaining([
        siteConfig.socials.linkedin,
        siteConfig.socials.github,
        siteConfig.socials.medium,
      ]),
    );
    // The Person references the Organization by @id, not by literal name
    expect(person.worksFor).toEqual({ "@id": siteConfig.organizationId });
  });

  it("builds a WebSite that points at the Person and Organization", () => {
    const site = buildWebSite();
    expect(site["@id"]).toBe(siteConfig.websiteId);
    expect(site.author).toEqual({ "@id": siteConfig.personId });
    expect(site.publisher).toEqual({ "@id": siteConfig.organizationId });
  });

  it("builds an Organization that references the Person as founder", () => {
    const org = buildOrganization();
    expect(org["@id"]).toBe(siteConfig.organizationId);
    expect(org.founder).toEqual({ "@id": siteConfig.personId });
  });

  it("builds a BreadcrumbList with absolute URLs and 1-based positions", () => {
    const crumbs = buildBreadcrumbList([
      { name: "Home", url: "/" },
      { name: "Resume", url: "/resume" },
    ]);
    expect(crumbs.itemListElement).toHaveLength(2);
    expect(crumbs.itemListElement?.[0]).toMatchObject({
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${siteConfig.siteUrl}/`,
    });
    expect(crumbs.itemListElement?.[1]).toMatchObject({
      position: 2,
      name: "Resume",
      item: `${siteConfig.siteUrl}/resume`,
    });
  });

  it("builds a ProfilePage anchored to the Person @id", () => {
    const page = buildProfilePage({
      path: "/",
      name: "Isaias F. Santos",
      description: "Full-stack developer portfolio.",
    });
    expect(page["@type"]).toBe("ProfilePage");
    expect(page.mainEntity).toEqual({ "@id": siteConfig.personId });
    expect(page.about).toEqual({ "@id": siteConfig.personId });
    expect(page.isPartOf).toEqual({ "@id": siteConfig.websiteId });
  });
});
