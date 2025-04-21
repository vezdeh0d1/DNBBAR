import {ActivityIndicator, FlatList, Image, ScrollView, StyleSheet, Text, View,} from 'react-native';
import React, { useEffect, useState } from 'react';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import SearchBar from '@/components/SearchBar';
import useFetch from '@/services/useFetch';
import { fetchDrinks } from '@/services/api';
import DrinkCard from '@/components/DrinkCard';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const {
        data: drinks,
        loading: drinksLoading,
        error: drinksError,
        refetch,
    } = useFetch<Drink[]>(() => fetchDrinks({ query: searchQuery }), false); // autoFetch: false

    // обновлять результат при каждом вводе
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            refetch(); // вызывает fetchDrinks({ query })
        }, 300); // debounce: ждать 300 мс

        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />

            <ScrollView
                className="flex-1 px-5"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}
            >
                <Image
                    source={icons.logo}
                    className="w-16 h-16 mt-12 mb-5 mx-auto"
                />

                <View className="flex-1 mt-5">
                    <SearchBar
                        placeholder="Search for a drink"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />

                    <Text className="text-lg text-white font-bold mt-5 mb-3">
                        Best Drinks
                    </Text>

                    {drinksLoading ? (
                        <ActivityIndicator
                            size="large"
                            color="#0000ff"
                            className="mt-10 self-center"
                        />
                    ) : drinksError ? (
                        <Text>Error: {drinksError.message}</Text>
                    ) : (
                        <FlatList<Drink>
                            data={drinks}
                            renderItem={({ item }) => <DrinkCard {...item} />}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={3}
                            columnWrapperStyle={{
                                justifyContent: 'flex-start',
                                gap: 20,
                                paddingRight: 5,
                                marginBottom: 10,
                            }}
                            className="mt-2 pb-32"
                            scrollEnabled={false}
                        />
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

export default Search;

const styles = StyleSheet.create({});
