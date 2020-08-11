import React from 'react'
import { FlatList, View } from 'react-native';
import TimelineListAllFavorites from './TimelineListAllFavorites';

const TimelinesFavoritesList = ({ timelines }) => {
    if (!timelines.length) {
        return null;
    }
    return (
        <View>
            <FlatList
                data={timelines}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(timeline) => timeline.timelineId}
                renderItem={({ item }) => {
                    return (
                            <TimelineListAllFavorites result={item} />
                    )
                }}
            />
        </View>
    )
};

export default TimelinesFavoritesList;