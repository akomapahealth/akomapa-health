"use client";

import { CONTACT } from "@/config/contact";

export default function LocationMap() {
  return (
    <figure className="flex h-full flex-col bg-white dark:bg-[#1C1F1E]">
      <figcaption className="border-b border-[#1C1F1E]/10 px-4 py-3 font-heading text-sm font-semibold text-[#1C1F1E] dark:border-[#FCFAEF]/15 dark:text-[#FCFAEF] sm:px-5 sm:text-base">
        {CONTACT.map.label}
      </figcaption>
      <iframe
        src={CONTACT.map.embedUrl}
        className="min-h-0 w-full flex-1 border-0"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={CONTACT.map.title}
      />
    </figure>
  );
}
