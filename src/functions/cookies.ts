// src/utils/cookies.ts
export type CookieOptions = {
  minutes?: number;
  hours?: number;
  days?: number;
  months?: number;
  path?: string;
  domain?: string;
  sameSite?: "Lax" | "Strict" | "None";
  secure?: boolean;
};

export function setCookie(
  name: string,
  value: unknown,
  opts: CookieOptions = {}
) {
  if (typeof document === "undefined") return;

  const {
    minutes,
    hours,
    days,
    months,
    path = "/",
    domain,
    sameSite = "Lax",
    secure = sameSite === "None" ? true : false,
  } = opts;

  const encName = encodeURIComponent(name);
  const encValue = encodeURIComponent(JSON.stringify(value));

  let cookie = `${encName}=${encValue}`;

  // מחשבים זמן תפוגה לפי היחידות
  if (minutes || hours || days || months) {
    const date = new Date();
    if (minutes) date.setMinutes(date.getMinutes() + minutes);
    if (hours) date.setHours(date.getHours() + hours);
    if (days) date.setDate(date.getDate() + days);
    if (months) date.setMonth(date.getMonth() + months);
    cookie += `; Expires=${date.toUTCString()}`;
  }

  if (path) cookie += `; Path=${path}`;
  if (domain) cookie += `; Domain=${domain}`;
  if (sameSite) cookie += `; SameSite=${sameSite}`;
  if (secure) cookie += `; Secure`;

  document.cookie = cookie;
}

export function getCookie<T = unknown>(name: string): T | null {
  if (typeof document === "undefined") return null;
  const encName = encodeURIComponent(name) + "=";
  const parts = document.cookie.split("; ");
  for (const part of parts) {
    if (part.startsWith(encName)) {
      try {
        return JSON.parse(
          decodeURIComponent(part.substring(encName.length))
        ) as T;
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function deleteCookie(name: string, path = "/", domain?: string) {
  if (typeof document === "undefined") return;
  document.cookie =
    `${encodeURIComponent(name)}=` +
    `; Expires=Thu, 01 Jan 1970 00:00:00 GMT` +
    `; Path=${path}` +
    (domain ? `; Domain=${domain}` : "");
}
