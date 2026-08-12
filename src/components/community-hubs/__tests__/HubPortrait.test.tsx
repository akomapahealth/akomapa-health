import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HubPortrait from "@/components/community-hubs/HubPortrait";

describe("HubPortrait", () => {
  it("renders a populated image without layout fallback markup", () => {
    const { container } = render(
      <HubPortrait
        name="Ama Mensah"
        image="/ucc-team/ama-mensah.jpg"
        alt="Portrait of Ama Mensah, Community Lead at Test Hub"
      />,
    );

    const image = screen.getByRole("img", {
      name: "Portrait of Ama Mensah, Community Lead at Test Hub",
    });
    expect(image).toBeVisible();
    expect(image).toHaveAttribute("src", expect.stringContaining("ama-mensah"));
    expect(container.querySelector("[data-hub-portrait-fallback]")).toBeNull();
  });

  it("renders branded initials when a portrait path is missing", () => {
    const { container } = render(
      <HubPortrait
        name="Kojo Owusu"
        alt="Portrait of Kojo Owusu, Operations Lead at Test Hub"
      />,
    );

    const fallback = container.querySelector(
      "[data-hub-portrait-fallback]",
    ) as HTMLElement;
    expect(fallback).not.toBeNull();
    expect(fallback).toHaveAttribute(
      "aria-label",
      "Portrait pending for Kojo Owusu",
    );
    expect(fallback).toHaveTextContent("KO");
    expect(container.querySelector("img")).toBeNull();
  });

  it("uses the hub monogram when neither image nor name is available", () => {
    const { container } = render(
      <HubPortrait
        alt="Reserved portrait for Akomapa–UG Community Health Hub leadership"
        monogram="UG"
      />,
    );

    const fallback = container.querySelector(
      "[data-hub-portrait-fallback]",
    ) as HTMLElement;
    expect(fallback).not.toBeNull();
    expect(fallback).toHaveAttribute(
      "aria-label",
      "Reserved portrait for Akomapa–UG Community Health Hub leadership",
    );
    expect(fallback).toHaveTextContent("UG");
    expect(container.querySelector("img")).toBeNull();
  });

  it("treats blank image strings as missing so no broken request is made", () => {
    const { container } = render(
      <HubPortrait
        name="Ama Mensah"
        image="   "
        alt="Portrait of Ama Mensah"
      />,
    );

    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector("[data-hub-portrait-fallback]")).not.toBeNull();
  });
});
