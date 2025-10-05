import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";
import { fetchEventDetails } from "@/services/api";

// Минимальная версия под твой EventCard — без форматтеров и лишних хелперов

type Event = {
  id: number | string;
  name: string;
  text?: string | null;
  price?: number | null;
  image?: string | { id?: string } | null;
  imageUrl?: string | null;
};

// Тот же конфиг, что и в EventCard
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

// Копия assetUrl из EventCard — 1:1
const assetUrl = (img?: string | { id?: string } | null, w = 800) => {
  if (!img) return "";
  if (typeof img === "string" && img.startsWith("http")) return img;
  const id = typeof img === "string" ? img : img?.id;
  if (!id || !BASE_URL) return "";
  const q = `?width=${w}&quality=80&format=webp`;
  const auth = TOKEN ? `&access_token=${TOKEN}` : "";
  return `${BASE_URL}/assets/${id}${q}${auth}`;
};

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof id === "string") {
      setLoading(true);
      fetchEventDetails(id)
        .then(setEvent)
        .catch((e) => {
          console.error("fetchEventDetails failed", e);
          setEvent(null);
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (!event) {
    return (
      <View className="flex-1 bg-primary items-center justify-center px-4">
        <Text className="text-white">Details not found</Text>
      </View>
    );
  }

  const finalUrl = assetUrl(event.image) || event.imageUrl || PLACEHOLDER;

  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Image
          source={{ uri: finalUrl }}
          className="mt-16 h-64 aspect-[3/2] self-center rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-white text-lg font-bold mt-4 px-4">
          {event.name}
        </Text>

        {event.text ? (
          <Text className="text-white text-sm px-4 mt-2">{event.text}</Text>
        ) : null}

        {event.price != null ? (
          <Text className="text-yellow-500 text-base font-semibold px-4 mt-3">
            {event.price} €
          </Text>
        ) : null}
      </ScrollView>
    </View>
  );
}
