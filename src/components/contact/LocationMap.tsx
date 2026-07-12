"use client";

import { CONTACT } from "@/config/contact";

export default function LocationMap() {
  return (
    <figure className="flex h-full flex-col bg-white dark:bg-[#2F3332]">
      <figcaption className="border-b border-[#E6E7E7]/40 px-4 py-3 font-heading text-sm font-semibold text-[#1C1F1E] dark:border-[#4F5554]/40 dark:text-[#FCFAEF] sm:px-5 sm:text-base">
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
