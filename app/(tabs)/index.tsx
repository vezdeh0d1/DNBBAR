import {
    View,
    ScrollView,
    Image,
    FlatList,
    Text,
    ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import React from "react";

import { fetchNews } from "@/services/api";
import useFetch from "@/services/useFetch";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import NewsCard from "@/components/NewsCard";

const Index = () => {
    const router = useRouter();

    const {
        data: news,
        loading: newsLoading,
        error: newsError,
        refetch,
    } = useFetch(fetchNews); // Загружаем список новостей

    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="absolute w-full z-0"
                resizeMode="cover"
            />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
            >
                <Image
                    source={icons.logo}
                    className="w-16 h-16 mt-12 mb-5 mx-auto"
                />

                {newsLoading ? (
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        className="mt-10 self-center"
                    />
                ) : newsError ? (
                    <Text className="text-white text-center mt-4">
                        Error: {newsError.message}
                    </Text>
                ) : (
                    <FlatList
                        data={news}
                        renderItem={({ item }) => <NewsCard {...item} />}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={1}
                        className="mt-2 pb-32"
                        scrollEnabled={false}
                    />
                )}
            </ScrollView>
        </View>
    );
};

export default Index;
