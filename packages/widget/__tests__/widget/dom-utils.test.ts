import { afterEach, describe, expect, it, vi } from "vitest";
import { formatRelativeDate } from "../../src/dom-utils.js";

describe("formatRelativeDate", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns 'now' equivalent for just now (fr)", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-15T12:00:00Z"));
    const result = formatRelativeDate("2025-06-15T12:00:00Z", "fr");
    // Intl.RelativeTimeFormat with numeric: "auto" returns "maintenant" in French
    expect(result).toMatch(/maintenant/i);
  });

  it("returns 'now' equivalent for just now (en)", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-15T12:00:00Z"));
    const result = formatRelativeDate("2025-06-15T12:00:00Z", "en");
    expect(result).toMatch(/now/i);
  });

  it("returns minutes for < 60min", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-15T12:00:00Z"));
    const d = new Date(Date.now() - 15 * 60_000).toISOString();
    const result = formatRelativeDate(d, "fr");
    expect(result).toContain("15");
  });

  it("returns hours for < 24h", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-15T12:00:00Z"));
    const d = new Date(Date.now() - 3 * 3600_000).toISOString();
    const result = formatRelativeDate(d, "fr");
    expect(result).toContain("3");
  });

  it("returns days for < 7d", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-15T12:00:00Z"));
    const d = new Date(Date.now() - 2 * 86400_000).toISOString();
    const result = formatRelativeDate(d, "fr");
    expect(result).toContain("2");
  });

  it("returns formatted date for > 7d", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-15T12:00:00Z"));
    // 30 days before 2025-06-15 = 2025-05-16
    const d = new Date(Date.now() - 30 * 86400_000).toISOString();
    const result = formatRelativeDate(d, "fr");
    // toLocaleDateString("fr") returns something like "16/05/2025"
    expect(result).toContain("2025");
  });

  it("defaults to French locale when no locale is provided", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-15T12:00:00Z"));
    const result = formatRelativeDate("2025-06-15T12:00:00Z");
    expect(result).toMatch(/maintenant/i);
  });

  it("respects English locale", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-15T12:00:00Z"));
    const d = new Date(Date.now() - 15 * 60_000).toISOString();
    const result = formatRelativeDate(d, "en");
    // English Intl.RelativeTimeFormat should return something with "15" and "min" or "ago"
    expect(result).toContain("15");
  });
});
