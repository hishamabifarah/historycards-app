import React from 'react'
import { FlatList, View } from 'react-native';
import TimelinesCardsList from './TimelinesCardsList';

const TimelinesAllList = ({ timelines }) => {
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
                        <TimelinesCardsList result={item} />
                    )
                }}
            />
        </View>
    )
};

export default TimelinesAllList;