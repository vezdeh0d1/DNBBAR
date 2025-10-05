const BASE_URL = process.env.EXPO_PUBLIC_DIRECTUS_URL!;
const TOKEN    = process.env.EXPO_PUBLIC_DIRECTUS_TOKEN!;

const authHeaders = { Authorization: `Bearer ${TOKEN}` };

// строим URL к картинке (UUID из поля image)
export const assetUrl = (id?: string, width = 800) =>
  id ? `${BASE_URL}/assets/${id}?width=${width}&quality=80&format=webp` : undefined;

/** ---------- EVENTS ---------- */
export type EventItem = {
  id: number;
  name: string;
  text?: string;
  price?: number;
  date?: string;        // у тебя поле date в events — строка/дата
  image?: string;       // UUID файла
};

export const fetchEvents = async (): Promise<(EventItem & { imageUrl?: string })[]> => {
  const url =
    `${BASE_URL}/items/events` +
    `?fields=id,name,price,text,date,image,status` +
    `&filter[status][_neq]=archived` +   // не показывать архивные (как в админке)
    `&sort[]=-date&limit=50`;

  const res = await fetch(url, { headers: authHeaders });
  if (!res.ok) throw new Error(`events: ${res.statusText}`);
  const { data } = await res.json() as { data: EventItem[] };

  return data.map(it => ({ ...it, imageUrl: assetUrl(it.image) }));
};

export const fetchEventDetails = async (id: number) => {
  const url = `${BASE_URL}/items/events/${id}?fields=id,name,price,text,date,image,status`;
  const res = await fetch(url, { headers: authHeaders });
  if (!res.ok) throw new Error(`event ${id}: ${res.statusText}`);
  const { data } = await res.json() as { data: EventItem };
  return { ...data, imageUrl: assetUrl(data.image) };
};

/** ---------- DRINKS ---------- */
export type DrinkItem = { id: number; name: string; price?: number; text?: string; image?: string };
export const fetchDrinks = async (query = ""): Promise<(DrinkItem & { imageUrl?: string })[]> => {
  const url =
    `${BASE_URL}/items/drinks` +
    `?fields=id,name,price,text,image` +
    (query ? `&search=${encodeURIComponent(query)}` : "") +
    `&sort[]=name`;
  const res = await fetch(url, { headers: authHeaders });
  if (!res.ok) throw new Error(`drinks: ${res.statusText}`);
  const { data } = await res.json() as { data: DrinkItem[] };
  return data.map(it => ({ ...it, imageUrl: assetUrl(it.image) }));
};

export const fetchDrinksDetails = async (id: number) => {
  const url = `${BASE_URL}/items/drinks/${id}?fields=id,name,price,text,image`;
  const res = await fetch(url, { headers: authHeaders });
  if (!res.ok) throw new Error(`drink ${id}: ${res.statusText}`);
  const { data } = await res.json() as { data: DrinkItem };
  return { ...data, imageUrl: assetUrl(data.image) };
};

/** ---------- NEWS ---------- */
export type NewsItem = { id: number; name: string; date: string; text: string; image?: string };
export const fetchNews = async (): Promise<(NewsItem & { imageUrl?: string })[]> => {
  const url =
    `${BASE_URL}/items/news?fields=id,name,date,text,image&sort[]=-date&limit=50`;
  const res = await fetch(url, { headers: authHeaders });
  if (!res.ok) throw new Error(`news: ${res.statusText}`);
  const { data } = await res.json() as { data: NewsItem[] };
  return data.map(it => ({ ...it, imageUrl: assetUrl(it.image) }));
};
