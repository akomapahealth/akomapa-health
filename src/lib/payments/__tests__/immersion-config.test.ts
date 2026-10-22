import { afterEach, describe, expect, it, vi } from "vitest";
import { findInvitee, getImmersionConfig, signInviteToken, verifyInviteToken } from "../immersion";
import { IMMERSION_DIRECT_INVITE_EXPIRES_AT } from "../immersion-direct-invite";
import { immersionCheckoutWindow } from "../immersion-terms";

afterEach(() => vi.unstubAllEnvs());

function configure() {
  vi.stubEnv("VERCEL_ENV", "preview");
  vi.stubEnv("NEXT_PUBLIC_IMMERSION_STRIPE_TEST_ENABLED", "true");
  vi.stubEnv("IMMERSION_INVITE_TOKEN_SECRET", "x".repeat(48));
  vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_fixture");
  vi.stubEnv("STRIPE_IMMERSION_DEPOSIT_PRICE_ID", "price_deposit");
  vi.stubEnv("STRIPE_IMMERSION_FULL_PRICE_ID", "price_full");
  vi.stubEnv("STRIPE_IMMERSION_BALANCE_PRICE_ID", "price_balance");
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

  it("keeps direct invites optional and expires them with the balance grace period", () => {
    configure();
    vi.stubEnv("IMMERSION_DIRECT_INVITE_SECRET", "too-short");
    expect(getImmersionConfig()?.directInviteSecret).toBeUndefined();
    vi.stubEnv("IMMERSION_DIRECT_INVITE_SECRET", "d".repeat(48));
    expect(getImmersionConfig()?.directInviteSecret).toBe("d".repeat(48));
    expect(IMMERSION_DIRECT_INVITE_EXPIRES_AT).toBe(immersionCheckoutWindow("balance").closeAt);
  });

  it("requires separate live resources before enabling production", () => {
    configure();
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("IMMERSION_STRIPE_LIVE_ENABLED", "true");
    expect(getImmersionConfig()).toBeNull();
    vi.stubEnv("STRIPE_IMMERSION_LIVE_RESTRICTED_KEY", "rk_live_fixture");
    vi.stubEnv("STRIPE_IMMERSION_LIVE_DEPOSIT_PRICE_ID", "price_live_deposit");
    vi.stubEnv("STRIPE_IMMERSION_LIVE_FULL_PRICE_ID", "price_live_full");
    vi.stubEnv("STRIPE_IMMERSION_LIVE_BALANCE_PRICE_ID", "price_live_balance");
    vi.stubEnv("STRIPE_IMMERSION_LIVE_WEBHOOK_SECRET", "whsec_live_fixture");
    vi.stubEnv("IMMERSION_LIVE_BASE_URL", "https://akomapa.org");
    expect(getImmersionConfig()).toMatchObject({ mode: "live", baseUrl: "https://akomapa.org" });
    vi.stubEnv("STRIPE_IMMERSION_LIVE_RESTRICTED_KEY", "sk_test_wrong_mode");
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
