import axios from "@/api/axios";

export const getUserProfile = async (): Promise<boolean> => {
  try {
    const res = await axios.get("/api/users/profile");
    return res.data;
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
