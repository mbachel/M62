// Minimal JWT helpers for client-side auth checks
export function getToken(): string | null {
  try {
    return localStorage.getItem("m62_token");
  } catch (err) {
    return null;
  }
}

function base64UrlDecode(input: string) {
  // base64url -> base64
  let base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4;
  if (pad === 2) base64 += "==";
  else if (pad === 3) base64 += "=";
  else if (pad !== 0) return null;
  try {
    return decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  } catch (e) {
    return null;
  }
}

export function parseJwt(token: string): any | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = parts[1];
    const json = base64UrlDecode(payload);
    if (!json) return null;
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

export function isAuthenticated(): boolean {
  const token = getToken();
  if (!token) return false;
  const payload = parseJwt(token);
  if (!payload) return false;
  // Check exp if present (seconds since epoch)
  if (payload.exp && typeof payload.exp === "number") {
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  }
  // If no exp, treat token as invalid for safety
  return false;
}

export function signOut(): void {
  try {
    localStorage.removeItem("m62_token");
  } catch (e) {
    // ignore
  }
}
