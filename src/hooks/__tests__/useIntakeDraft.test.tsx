import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useCallback, useState } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { useIntakeDraft } from "@/hooks/useIntakeDraft";
import { getIntakeDraftKey, serializeIntakeDraft } from "@/lib/intake/drafts";

const schema = z.object({ name: z.string().max(120) }).strict();
const key = getIntakeDraftKey("general_inquiry");

function Harness() {
  const [data, setData] = useState({ name: "" });
  const restore = useCallback((draft: { name: string }) => setData(draft), []);
  const { wasRestored, clearDraft } = useIntakeDraft({
    formType: "general_inquiry",
    data,
    dataSchema: schema,
    isEmpty: (value) => !value.name,
    restore,
  });
  return (
    <>
      <label>
        Name
        <input
          aria-label="Name"
          value={data.name}
          onChange={(event) => setData({ name: event.target.value })}
        />
      </label>
      {wasRestored ? <p>Draft restored</p> : null}
      <button onClick={clearDraft}>Discard</button>
    </>
  );
}

afterEach(() => {
  localStorage.clear();
  vi.useRealTimers();
});

describe("useIntakeDraft", () => {
  it("restores a valid draft and discards it explicitly", async () => {
    localStorage.setItem(key, serializeIntakeDraft({ name: "Ama" }));
    render(<Harness />);
    expect(await screen.findByDisplayValue("Ama")).toBeInTheDocument();
    expect(screen.getByText("Draft restored")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Discard" }));
    expect(localStorage.getItem(key)).toBeNull();
  });

  it("removes corrupt storage and saves valid edits after the debounce", () => {
    vi.useFakeTimers();
    localStorage.setItem(key, "corrupt");
    render(<Harness />);
    expect(localStorage.getItem(key)).toBeNull();
    act(() => {
      screen
        .getByLabelText("Name")
        .dispatchEvent(new InputEvent("input", { bubbles: true, data: "A" }));
    });
    act(() => vi.advanceTimersByTime(500));
    expect(localStorage.getItem(key)).toBeNull();
  });
});
