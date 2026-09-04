import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import GlobalClickTracker from "../GlobalClickTracker";
import { trackEvent } from "@/lib/analytics";

vi.mock("@/lib/analytics", () => ({ trackEvent: vi.fn() }));

function clickLink(href: string) {
  const view = render(<><GlobalClickTracker /><main><a><span>Learn more</span></a></main></>);
  const anchor = view.container.querySelector("a")!;
  // Set the raw attribute so React does not sanitize the URL under test.
  anchor.setAttribute("href", href);
  // Prevent jsdom navigation after the document capture listener has run.
  anchor.addEventListener("click", (event) => event.preventDefault());
  fireEvent.click(anchor.querySelector("span")!);
  return view;
}

describe("GlobalClickTracker", () => {
  beforeEach(() => vi.mocked(trackEvent).mockClear());

  it.each([
    "javascript:void(0)", "JaVaScRiPt:void(0)", " javascript:void(0)",
    "java\nscript:void(0)", "java\tscript:void(0)", "data:text/plain,hello",
    "vbscript:msgbox(1)", "http://[invalid", "#section", "",
  ])("ignores unsupported, malformed, or fragment URLs: %j", (href) => {
    clickLink(href);
    expect(trackEvent).not.toHaveBeenCalled();
  });

  it.each(["/about", "mailto:hello@example.org", "tel:+15555550123"])("tracks supported links: %s", (href) => {
    clickLink(href);
    expect(trackEvent).toHaveBeenCalledExactlyOnceWith({
      name: "link_click", link_text: "Learn more",
      link_url: new URL(href, document.baseURI).href,
      link_external: false, page_path: window.location.pathname, surface: "main",
    });
  });

  it("tracks outbound web links", () => {
    clickLink("HTTPS://example.org/path");
    expect(trackEvent).toHaveBeenCalledTimes(2);
    expect(trackEvent).toHaveBeenCalledWith(expect.objectContaining({
      name: "link_click", link_url: "https://example.org/path", link_external: true,
    }));
    expect(trackEvent).toHaveBeenCalledWith(expect.objectContaining({ name: "outbound_click" }));
  });

  it("removes its document listener when unmounted", () => {
    const view = clickLink("/about");
    view.unmount();
    vi.mocked(trackEvent).mockClear();
    const anchor = document.createElement("a");
    anchor.href = "/about";
    document.body.append(anchor);
    anchor.addEventListener("click", (event) => event.preventDefault());
    fireEvent.click(anchor);
    anchor.remove();
    expect(trackEvent).not.toHaveBeenCalled();
  });
});
