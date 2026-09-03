const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/,"");
export function api(path: string,init?:RequestInit)
{
    return fetch(`${API_BASE}${path}`,init);
}