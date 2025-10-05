import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Constants from "expo-constants";

type EventCardProps = {
  id: number;
  name: string;
  price?: number | null;
  // из API может прийти UUID (string) или объект { id }, либо готовый URL
  image?: string | { id?: string } | null;
  imageUrl?: string | null;
};

const EXTRA = (Constants.expoConfig?.extra ?? {}) as {
  DIRECTUS_URL?: string;
  DIRECTUS_TOKEN?: string;
};

const BASE_URL =
  EXTRA.DIRECTUS_URL || process.env.EXPO_PUBLIC_DIRECTUS_URL || "";
const TOKEN =
  EXTRA.DIRECTUS_TOKEN || process.env.EXPO_PUBLIC_DIRECTUS_TOKEN || "";
const PLACEHOLDER =
  "https://placehold.co/800x450/1a1a1a/ffffff.png?text=DNB+Bar";

const assetUrl = (img?: string | { id?: string } | null, w = 800) => {
  if (!img) return "";
  if (typeof img === "string" && img.startsWith("http")) return img; // уже полный URL
  const id = typeof img === "string" ? img : img?.id;
  if (!id || !BASE_URL) return "";
  const q = `?width=${w}&quality=80&format=webp`;
  const auth = TOKEN ? `&access_token=${TOKEN}` : "";
  return `${BASE_URL}/assets/${id}${q}${auth}`;
};

export default function EventsCard({
  id,
  name,
  price,
  image,
  imageUrl,
}: EventCardProps) {
  const finalUrl = assetUrl(image) || imageUrl || PLACEHOLDER;

  return (
    <Link href={`/events/${id}`} asChild>
      <TouchableOpacity>
        <Text
          className="text-lg font-semibold self-center text-white mt-2"
          numberOfLines={1}
        >
          {name}
        </Text>

        <Image
          source={{ uri: finalUrl }}
          className="h-64 aspect-[3/2] self-center rounded-lg"
          resizeMode="cover"
        />

        {price != null ? (
          <Text className="text-yellow-500 text-base font-semibold px-4 mt-3">
            {price} €
          </Text>
        ) : null}
      </TouchableOpacity>
    </Link>
  );
}
