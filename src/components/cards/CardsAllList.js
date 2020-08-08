import React from 'react'
import { FlatList, View } from 'react-native';
import CardsList from './CardsList';

const CardsAllList = ({ cards }) => {
    if (!cards && !cards.length) {
        return null;
    }

    return (
        <View>
            <FlatList
                data={cards}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(card) => card.cardId}
                renderItem={({ item }) => {
                    return (
                        <CardsList result={item} />
                    )
                }}
            />
        </View>
    )
};

export default CardsAllList;