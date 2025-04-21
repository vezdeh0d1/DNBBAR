import { Image, Text, View } from 'react-native';
import React from 'react';
import { images } from "@/constants/images";

type Drink = {
    id: number;
    name: string;
    date: number;
    text: string;
    imageUrl: string;
};

const NewsCard = ({ id, name, date, text, imageUrl }: Drink) => {
    const imageSource = images.news[name] || {
        uri: 'https://placehold.co/600x400/1a1a1a/ffffff.png',
    };

    return (
        <View className="w-full flex-row items-start gap-3 p-3 bg-[#1a1a1a] rounded-xl mb-4">
            <Image
                source={imageSource}
                className="w-28 aspect-[2/3] self-center rounded-lg"
                resizeMode="cover"
            />

            <View className="flex-1">
                <Text className="text-white text-base font-bold mb-1" numberOfLines={1}>
                    {name}
                </Text>
                <Text className="text-white text-xs mb-1">{date}</Text>
                <Text className="text-white text-sm" numberOfLines={10}>
                    {text}
                </Text>
            </View>
        </View>
    );
};

export default NewsCard;
