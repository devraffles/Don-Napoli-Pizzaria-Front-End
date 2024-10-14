import { cookies } from "next/headers";

export function getCookiesSever() {
    const token = cookies().get("session")?.value;

    return token || null;
}