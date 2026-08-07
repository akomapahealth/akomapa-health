export type ContactIntent = {
  subject: string;
  partnershipType: string;
  message: string;
};

const contactIntents = {
  outreach: {
    subject: "Partnership Inquiry - Host Community Engagement Programs",
    partnershipType: "Host Community Engagement Programs",
    message:
      "I'm interested in learning more about hosting community engagement programs with Akomapa Health Foundation.",
  },
  partnership: {
    subject: "Partnership Inquiry - Strategic Partnerships",
    partnershipType: "Strategic Partnerships",
    message:
      "I'm interested in learning more about strategic partnership opportunities with Akomapa Health Foundation.",
  },
  donation: {
    subject: "Partnership Inquiry - Monetary Sponsorship",
    partnershipType: "Monetary Sponsorship",
    message:
      "I'm interested in learning more about monetary sponsorship opportunities with Akomapa Health Foundation.",
  },
  immersion: {
    subject: "Global Health Immersion Program Interest",
    partnershipType: "General Inquiry",
    message:
      "I'm interested in the Akomapa Global Health Immersion Program. Please notify me when the next cohort details are available.",
  },
  "immersion-brochure": {
    subject: "Global Health Immersion Program Brochure Request",
    partnershipType: "General Inquiry",
    message:
      "Please send me the latest available information about the Akomapa Global Health Immersion Program.",
  },
} as const satisfies Record<string, ContactIntent>;

export type ContactIntentKey = keyof typeof contactIntents;

export function getContactIntent(value: string | null): ContactIntent | null {
  if (!value || !Object.prototype.hasOwnProperty.call(contactIntents, value)) {
    return null;
  }

  return contactIntents[value as ContactIntentKey];
}
