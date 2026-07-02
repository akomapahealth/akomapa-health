export type ParsedMetricValue = {
  /** Numeric portion used to drive count-up animations. */
  value: number;
  /** Any characters before the number, e.g. "$" or "~". */
  prefix: string;
  /** Any characters after the number, e.g. "+" or "%". */
  suffix: string;
};

/**
 * Splits a human-readable metric string such as "2,000+" into a numeric value
 * plus its prefix/suffix so it can be animated with a count-up while preserving
 * the original decoration. Falls back to treating the whole string as a suffix
 * when no digits are present (e.g. "Coming soon").
 */
export function parseMetricDisplayValue(displayValue: string): ParsedMetricValue {
  const trimmedValue = displayValue.trim();
  const numericMatch = trimmedValue.match(/\d[\d,]*/);

  if (!numericMatch || numericMatch.index === undefined) {
    return {
      value: 0,
      prefix: "",
      suffix: trimmedValue,
    };
  }

  const numericText = numericMatch[0];
  const numericStart = numericMatch.index;
  const numericEnd = numericStart + numericText.length;

  return {
    value: Number(numericText.replaceAll(",", "")),
    prefix: trimmedValue.slice(0, numericStart),
    suffix: trimmedValue.slice(numericEnd),
  };
}
