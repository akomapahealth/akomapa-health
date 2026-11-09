export type ContactOffice = Readonly<{
  id: "ghana" | "usa";
  label: string;
  addressLines: readonly string[];
  phone: Readonly<{
    display: string;
    href: `tel:${string}`;
  }>;
}>;

const GHANA_OFFICE_ADDRESS_LINES = [
  "43 Yam Street",
  "Tema Community 23, Adjei Kojo",
  "Accra, Ghana",
] as const;

// Google Maps URLs universal search link: no API key, no embed, no cookies
// until the visitor follows it.
// https://developers.google.com/maps/documentation/urls/get-started#search-action
const GHANA_OFFICE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  GHANA_OFFICE_ADDRESS_LINES.join(", "),
)}`;

export const CONTACT = {
  email: {
    display: "info@akomapa.org",
    href: "mailto:info@akomapa.org",
  },
  offices: [
    {
      id: "ghana",
      label: "Ghana Office",
      addressLines: GHANA_OFFICE_ADDRESS_LINES,
      phone: {
        display: "+233 50 296 6072",
        href: "tel:+233502966072",
      },
    },
    {
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
    },
  ] satisfies readonly ContactOffice[],
  map: {
    officeId: "ghana",
    label: "Ghana Office map",
    title: "Map showing Akomapa Health Foundation's Ghana Office",
    embedUrl:
      "https://www.google.com/maps?q=43%20Yam%20Street%2C%20Tema%20Community%2023%2C%20Adjei%20Kojo%2C%20Accra%2C%20Ghana&output=embed",
    /** Opened in a new tab; works without loading the embed. */
    openUrl: GHANA_OFFICE_MAPS_URL,
    /** Shown before the embed loads, since loading it contacts Google. */
    consentNote:
      "Showing the map loads it from Google, which may set cookies on your device.",
  },
} as const;

export function getContactOffice(id: ContactOffice["id"]): ContactOffice {
  const office = CONTACT.offices.find((candidate) => candidate.id === id);

  if (!office) {
    throw new Error(`Unknown contact office: ${id}`);
  }

  return office;
}
