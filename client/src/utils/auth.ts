import axios from "@/api/axios";

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    await axios.get("/api/users/profile");
    return true;
  } catch {
    return false;
  }
};

export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
  return null;
}

export function getCsrfToken(): string | null {
  return getCookie("csrf_token");
}
