export type ContactOffice = Readonly<{
  id: "ghana" | "usa";
  label: string;
  addressLines: readonly string[];
  phone: Readonly<{
    display: string;
    href: `tel:${string}`;
  }>;
}>;

export const CONTACT = {
  email: {
    display: "info@akomapa.org",
    href: "mailto:info@akomapa.org",
  },
  offices: [
    {
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
  },
} as const;

export function getContactOffice(id: ContactOffice["id"]): ContactOffice {
  const office = CONTACT.offices.find((candidate) => candidate.id === id);

  if (!office) {
    throw new Error(`Unknown contact office: ${id}`);
  }

  return office;
}
