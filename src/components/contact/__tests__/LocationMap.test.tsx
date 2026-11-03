import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import LocationMap from "@/components/contact/LocationMap";
import { CONTACT } from "@/config/contact";

describe("LocationMap", () => {
  it("renders an offline preview without contacting Google", () => {
    const { container } = render(<LocationMap />);

    expect(screen.getByRole("figure")).toContainElement(
      screen.getByText(CONTACT.map.label, { selector: "figcaption" }),
    );
    expect(container.querySelector("iframe")).toBeNull();
    expect(container.innerHTML).not.toContain("output=embed");
    expect(
      screen.getByText("43 Yam Street, Tema Community 23, Adjei Kojo, Accra, Ghana"),
    ).toBeInTheDocument();
  });

  it("explains that showing the map loads it from Google", () => {
    render(<LocationMap />);

    expect(
      screen.getByRole("button", { name: "Show map" }),
    ).toHaveAccessibleDescription(CONTACT.map.consentNote);
  });

  it("offers Google Maps in a new tab without loading the embed", () => {
    const { container } = render(<LocationMap />);

    const link = screen.getByRole("link", {
      name: "Open in Google Maps (opens in a new tab)",
    });
    expect(link).toHaveAttribute("href", CONTACT.map.openUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(container.querySelector("iframe")).toBeNull();
  });

  it("loads the canonical embed on request and moves focus to it", async () => {
    const user = userEvent.setup();
    render(<LocationMap />);

    await user.click(screen.getByRole("button", { name: "Show map" }));

    const frame = screen.getByTitle(CONTACT.map.title);
    expect(frame.tagName).toBe("IFRAME");
    expect(frame).toHaveAttribute("src", CONTACT.map.embedUrl);
    expect(frame).not.toHaveAttribute("loading");
    expect(frame).toHaveFocus();
    expect(screen.queryByRole("button", { name: "Show map" })).toBeNull();
    expect(screen.queryByRole("link", { name: /Open in Google Maps/ })).toBeNull();
  });

  it("works from the keyboard and announces loading until the frame loads", async () => {
    const user = userEvent.setup();
    render(<LocationMap />);

    await user.tab();
    expect(screen.getByRole("button", { name: "Show map" })).toHaveFocus();
    await user.keyboard("{Enter}");

    expect(screen.getByRole("status")).toHaveTextContent("Loading map…");

    fireEvent.load(screen.getByTitle(CONTACT.map.title));

    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.getByTitle(CONTACT.map.title)).toHaveFocus();
  });
});
