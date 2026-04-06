import * as React from "react";

const CONSENT_COOKIE_NAME = "la-cookie-consent";
const CONSENT_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export interface ConsentState {
  decided: boolean;
  preferences: Record<string, boolean>;
}

export function readConsentCookie(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE_NAME}=([^;]*)`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1])) as ConsentState;
  } catch {
    return null;
  }
}

export function writeConsentCookie(state: ConsentState): void {
  const value = encodeURIComponent(JSON.stringify(state));
  // biome-ignore lint/suspicious/noDocumentCookie: consent persistence requires direct cookie write
  document.cookie = `${CONSENT_COOKIE_NAME}=${value};path=/;max-age=${CONSENT_COOKIE_MAX_AGE};SameSite=Lax`;
}

export function clearConsentCookie(): void {
  // biome-ignore lint/suspicious/noDocumentCookie: consent persistence requires direct cookie write
  document.cookie = `${CONSENT_COOKIE_NAME}=;path=/;max-age=0`;
}

export function useCookieConsent() {
  const [state, setState] = React.useState<ConsentState | null>(() => readConsentCookie());

  function saveConsent(preferences: Record<string, boolean>) {
    const next: ConsentState = { decided: true, preferences };
    writeConsentCookie(next);
    setState(next);
  }

  function resetConsent() {
    clearConsentCookie();
    setState(null);
  }

  return { state, saveConsent, resetConsent };
}
