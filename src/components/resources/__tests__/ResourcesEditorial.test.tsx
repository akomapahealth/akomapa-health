import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ResourceFilter from "@/components/resources/ResourceFilter";
import ResourceGrid from "@/components/resources/ResourceGrid";
import ResourceCard from "@/components/resources/ResourceCard";
import { resources } from "@/data/resources";

describe("Resources editorial explorer", () => {
  it("renders labeled filters with durable targets and a live result count", () => {
    const setFilters = vi.fn();
    render(
      <ResourceFilter
        filters={{
          category: "all",
          type: "all",
          program: "all",
          search: "",
        }}
        setFilters={setFilters}
        totalResources={3}
      />,
    );

    expect(screen.getByLabelText("Search resources")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Resource Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Related Program")).toBeInTheDocument();
    expect(screen.getByText(/Showing/)).toHaveTextContent("3");
    expect(document.querySelector("[data-resource-filter]")).toBeTruthy();
  });

  it("shows an empty state without marketing card chrome", () => {
    const { container } = render(<ResourceGrid resources={[]} />);

    expect(
      screen.getByRole("heading", { name: "No Resources Found" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status"),
    ).toHaveAttribute("data-publication-empty-state");
    expect(container.innerHTML).not.toContain("gradient");
    expect(container.innerHTML).not.toContain("homepage-hover-card");
  });

  it("preserves external and download link semantics on resource entries", () => {
    const external = resources.find((r) => r.url.startsWith("http"));
    expect(external).toBeTruthy();

    render(<ResourceCard resource={external!} />);

    const view = screen.getByRole("link", { name: /View Resource/i });
    expect(view).toHaveAttribute("target", "_blank");
    expect(view).toHaveAttribute("rel", "noopener noreferrer");
    expect(document.querySelector("[data-resource-entry]")).toBeTruthy();
  });

  it("submits search on form submit rather than each keystroke", async () => {
    const user = userEvent.setup();
    const setFilters = vi.fn();

    render(
      <ResourceFilter
        filters={{
          category: "all",
          type: "all",
          program: "all",
          search: "",
        }}
        setFilters={setFilters}
        totalResources={0}
      />,
    );

    await user.type(screen.getByLabelText("Search resources"), "maternal");
    expect(setFilters).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "Search" }));
    expect(setFilters).toHaveBeenCalled();
  });
});
