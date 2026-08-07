import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { CONTACT, getContactOffice } from "@/config/contact";

function readSource(path: string) {
  return readFileSync(join(process.cwd(), path), "utf8");
}

describe("canonical contact configuration", () => {
  it("publishes the approved organization email", () => {
    expect(CONTACT.email).toEqual({
      display: "info@akomapa.org",
      href: "mailto:info@akomapa.org",
    });
  });

  it("publishes the approved Ghana office details", () => {
    expect(getContactOffice("ghana")).toEqual({
      id: "ghana",
      label: "Ghana Office",
      addressLines: [
        "43 Yam Street",
        "Tema Community 23, Adjei Kojo",
        "Accra, Ghana",
      ],
      phone: {
        display: "+233 50 296 6072",
        href: "tel:+233502966072",
      },
    });
  });

  it("publishes the approved USA office details", () => {
    expect(getContactOffice("usa")).toEqual({
      id: "usa",
      label: "USA Office",
      addressLines: [
        "University Towers, Apt 5N",
        "100 York Street, New Haven, CT 06511",
        "United States",
      ],
      phone: {
        display: "+1 (203) 410-6306",
        href: "tel:+12034106306",
      },
    });
  });

  it("targets and accurately labels the Ghana office map", () => {
    expect(CONTACT.map).toEqual({
      officeId: "ghana",
      label: "Ghana Office map",
      title: "Map showing Akomapa Health Foundation's Ghana Office",
      embedUrl:
        "https://www.google.com/maps?q=43%20Yam%20Street%2C%20Tema%20Community%2023%2C%20Adjei%20Kojo%2C%20Accra%2C%20Ghana&output=embed",
    });

    expect(getContactOffice(CONTACT.map.officeId).addressLines).toContain(
      "43 Yam Street",
    );
  });

  it("keeps every public contact surface tied to the canonical source", () => {
    for (const path of [
      "src/app/(main)/contact/Content.tsx",
      "src/components/contact/ContactForm.tsx",
      "src/components/layout/Footer.tsx",
      "src/components/contact/LocationMap.tsx",
      "src/components/partnerships/CorporateSponsorshipContent.tsx",
      "src/components/get-involved/GetInvolvedCTA.tsx",
    ]) {
      const source = readSource(path);

      expect(source, `${path} should import canonical contact data`).toContain(
        'from "@/config/contact"',
      );
      expect(source, `${path} should not contain the retired Ghana phone`).not.toContain(
        "+233 20 954 4834",
      );
      expect(source, `${path} should not duplicate the canonical Ghana phone`).not.toContain(
        "+233 50 296 6072",
      );
    }
  });
});
