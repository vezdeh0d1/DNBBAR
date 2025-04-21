import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {Link} from "expo-router";
import { images} from "@/constants/images";



type Drink = {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
};

const DrinkCard = ({ id, name, price, imageUrl }: Drink) => {
    const imageSource = images.drinks[name] || {
        uri: 'https://placehold.co/600x400/1a1a1a/ffffff.png',
    };

    return (
        <Link href={`/drinks/${id}`} asChild>
            <TouchableOpacity className="w-[30%]">
                <Image
                    source={imageSource}
                    className="w-full h-52 rounded-xl"
                    resizeMode="cover"
                />

                <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
                    {name}
                </Text>
                <Text className="text-sm text-yellow-500">{price} €</Text>
            </TouchableOpacity>
        </Link>
    );
};
export default DrinkCard
