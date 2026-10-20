import { afterEach, describe, expect, it, vi } from "vitest";
import { findInvitee, getImmersionConfig, signInviteToken, verifyInviteToken } from "../immersion";

afterEach(() => vi.unstubAllEnvs());

function configure() {
  vi.stubEnv("VERCEL_ENV", "preview");
  vi.stubEnv("NEXT_PUBLIC_IMMERSION_STRIPE_TEST_ENABLED", "true");
  vi.stubEnv("IMMERSION_INVITE_TOKEN_SECRET", "x".repeat(48));
  vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_fixture");
  vi.stubEnv("STRIPE_IMMERSION_DEPOSIT_PRICE_ID", "price_deposit");
  vi.stubEnv("STRIPE_IMMERSION_FULL_PRICE_ID", "price_full");
  vi.stubEnv("RESEND_API_KEY", "re_fixture");
  vi.stubEnv("FORM_NOTIFICATION_FROM", "Akomapa <test@example.com>");
  vi.stubEnv("FORM_NOTIFICATION_TO", "staff@example.com");
  vi.stubEnv("IMMERSION_SELECTED_PARTICIPANTS_JSON", JSON.stringify([{ name: "Test Participant", email: "test@example.com" }]));
}

describe("Immersion invite configuration", () => {
  it("uses a server-only roster in preview", () => {
    configure();
    expect(getImmersionConfig()?.roster).toHaveLength(1);
    vi.stubEnv("VERCEL_ENV", "production");
    expect(getImmersionConfig()).toBeNull();
  });

  it("rejects missing configuration and forged tokens", () => {
    configure();
    vi.stubEnv("IMMERSION_SELECTED_PARTICIPANTS_JSON", "not-json");
    expect(getImmersionConfig()).toBeNull();
    const token = signInviteToken("test@example.com", "email", "x".repeat(48), 60);
    expect(verifyInviteToken(token, "email", "x".repeat(48))).toBe("test@example.com");
    expect(verifyInviteToken(token, "session", "x".repeat(48))).toBeNull();
    expect(verifyInviteToken(token + "forged", "email", "x".repeat(48))).toBeNull();
  });

  it("does not authorize an expired temporary invitee", () => {
    configure();
    vi.stubEnv("IMMERSION_SELECTED_PARTICIPANTS_JSON", JSON.stringify([
      { name: "Akomapa Test", email: "test@example.com", expiresAt: "2020-01-01T00:00:00Z" },
    ]));
    const roster = getImmersionConfig()?.roster;
    expect(roster).toBeDefined();
    expect(findInvitee(roster!, "test@example.com")).toBeUndefined();
  });
});
