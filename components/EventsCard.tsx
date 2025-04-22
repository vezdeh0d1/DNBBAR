import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {Link} from "expo-router";
import { images } from "@/constants/images";

type Event = {
    id: number;
    name: string;
    date: number;
    price: string;
    text: string;
    imageUrl: string;
};

const EventsCard = ({ id, name, price, imageUrl }: Event) => {
    const imageSource = images.events[name] || {
        uri: 'https://placehold.co/600x400/1a1a1a/ffffff.png',
    };

    return (
        <Link href={`/events/${id}`} asChild>
            <TouchableOpacity>
                <Text className="text-sm font-semibold self-center text-white mt-2" numberOfLines={1}>{name}</Text>

                <Image
                    source={imageSource}
                    className="h-64 aspect-[3/2] self-center rounded-lg"
                    resizeMode="cover"
                />
                <Text className="text-sm text-yellow-500 mb-6">{price}</Text>
            </TouchableOpacity>
        </Link>
    );
};
export default EventsCard
