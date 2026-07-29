import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  EditorialArrowLink,
  EditorialBand,
  EditorialButton,
  EditorialHeading,
} from "@/components/shared/EditorialPrimitives";
import {
  HomeBand,
  HomeButton,
  HomeHeading,
} from "@/components/home/_home-ui";

describe("EditorialPrimitives", () => {
  it("renders a semantic flat band with a hidden editorial marker", () => {
    render(
      <EditorialBand
        tone="teal"
        marker="02"
        aria-labelledby="editorial-heading"
      >
        <EditorialHeading id="editorial-heading">
          Shared editorial language
        </EditorialHeading>
      </EditorialBand>,
    );

    const band = screen.getByRole("region", {
      name: "Shared editorial language",
    });
    expect(band).toHaveAttribute("data-editorial-tone", "teal");
    expect(band).toHaveClass("bg-[#0097b2]");
    expect(band.className).not.toContain("gradient");

    const marker = band.querySelector("[data-editorial-band-marker]");
    expect(marker).toHaveTextContent("02");
    expect(marker).toHaveAttribute("aria-hidden", "true");
    expect(marker).toHaveAttribute("data-home-band-marker");
  });

  it("gives standalone links and buttons durable focus and target sizing", () => {
    render(
      <>
        <EditorialArrowLink href="/about">Read our story</EditorialArrowLink>
        <EditorialButton href="/contact">Contact us</EditorialButton>
        <EditorialButton href="https://example.com" external>
          External resource
        </EditorialButton>
      </>,
    );

    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveClass("min-h-11");
      expect(link.className).toContain("focus-visible:ring-2");
    }

    expect(
      screen.getByRole("link", { name: "External resource" }),
    ).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("keeps the homepage compatibility exports wired to the neutral core", () => {
    expect(HomeBand).toBe(EditorialBand);
    expect(HomeButton).toBe(EditorialButton);
    expect(HomeHeading).toBe(EditorialHeading);
  });
});
