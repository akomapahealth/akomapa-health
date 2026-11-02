import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  ConsentProvider,
  useCookieConsent,
} from "@/components/consent/ConsentProvider";
import Footer from "@/components/layout/Footer";
import { BRAND } from "@/config/brand";
import { CONTACT } from "@/config/contact";

function SettingsState() {
  const { isSettingsOpen } = useCookieConsent();
  return <p data-testid="settings-state">{isSettingsOpen ? "open" : "closed"}</p>;
}

function renderFooter() {
  return render(
    <ConsentProvider>
      <Footer />
      <SettingsState />
    </ConsentProvider>,
  );
}

describe("Footer", () => {
  it("renders the editorial footer structure without changing its foundation", () => {
    renderFooter();

    const footer = screen.getByRole("contentinfo");

    expect(footer).toHaveAttribute("data-site-footer");
    expect(footer).toHaveClass("bg-[#FCFAEF]");
    expect(footer).toHaveTextContent(BRAND.footerMission);
    expect(footer).toHaveTextContent(BRAND.legalNotice);
    expect(
      within(footer).getByRole("heading", { name: "Quick Links" }),
    ).toBeVisible();
    expect(
      within(footer).getByRole("heading", { name: "Our Initiatives" }),
    ).toBeVisible();
    expect(
      within(footer).getByRole("heading", { name: "Contact Us" }),
    ).toBeVisible();
    expect(
      within(footer).getByRole("heading", {
        name: "Join the Akomapa newsletter",
      }),
    ).toBeVisible();
  });

  it("preserves contact, social, and legal destinations", () => {
    renderFooter();

    const footer = screen.getByRole("contentinfo");
    for (const social of ["Facebook", "TikTok", "Instagram", "LinkedIn"]) {
      expect(within(footer).getByRole("link", { name: social })).toBeVisible();
    }

    expect(
      within(footer).getByRole("link", { name: CONTACT.email.display }),
    ).toHaveAttribute("href", CONTACT.email.href);
    expect(
      within(footer).getByRole("link", { name: "Send us a message" }),
    ).toHaveAttribute("href", "/contact");
    expect(within(footer).getByRole("link", { name: "News" })).toHaveAttribute(
      "href",
      "/news",
    );
    expect(
      within(footer).getByRole("link", { name: "Privacy Policy" }),
    ).toHaveAttribute("href", "/privacy");
    expect(
      within(footer).getByRole("link", { name: "Terms of Service" }),
    ).toHaveAttribute("href", "/terms");
    expect(
      within(footer).getByRole("link", { name: "Cookie Policy" }),
    ).toHaveAttribute("href", "/cookie-policy");
  });

  it("lets visitors revisit their cookie choice from every page", async () => {
    const user = userEvent.setup();
    renderFooter();

    const legal = screen
      .getByRole("contentinfo")
      .querySelector<HTMLElement>("[data-footer-legal]");
    const settings = within(legal!).getByRole("button", { name: "Cookie settings" });
    expect(settings).toHaveAttribute("aria-haspopup", "dialog");

    await user.click(settings);
    expect(screen.getByTestId("settings-state")).toHaveTextContent("open");
  });

  it("keeps office addresses and phone numbers on the contact page only", () => {
    renderFooter();

    const footer = screen.getByRole("contentinfo");
    for (const office of CONTACT.offices) {
      expect(footer).not.toHaveTextContent(office.label);
      // The final line is the country, which the legal notice still names.
      for (const line of office.addressLines.slice(0, -1)) {
        expect(footer).not.toHaveTextContent(line);
      }
      expect(footer).not.toHaveTextContent(office.phone.display);
      expect(
        footer.querySelector(`a[href="${office.phone.href}"]`),
      ).toBeNull();
    }
    expect(footer.querySelector("address")).toBeNull();
  });

  it("reserves announcement FAB clearance around Subscribe and legal links", () => {
    renderFooter();

    const footer = screen.getByRole("contentinfo");
    const shell = footer.querySelector(".site-container");
    const newsletterForm = footer.querySelector("[data-newsletter-form]");
    const legal = footer.querySelector("[data-footer-legal]");

    expect(shell?.className).toMatch(
      /pb-\[max\(3\.5rem,calc\(5rem\+env\(safe-area-inset-bottom\)\)\)\]/,
    );
    expect(shell?.className).toMatch(
      /md:pb-\[max\(4rem,calc\(5\.5rem\+env\(safe-area-inset-bottom\)\)\)\]/,
    );
    expect(newsletterForm).toHaveClass("pe-20", "sm:pe-[5.5rem]");
    expect(legal).toHaveClass("pe-20", "sm:pe-[5.5rem]");
  });
});
