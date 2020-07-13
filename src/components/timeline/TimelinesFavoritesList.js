import React from 'react'
import { FlatList, View, Text , StyleSheet, TouchableOpacity , SafeAreaView } from 'react-native';
import TimelinesCardsList from './TimelinesCardsList';

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
                            <TimelinesCardsList result={item} />
                    )
                }}
            />
        </View>
    )
};

const styles = StyleSheet.create({

});

export default TimelinesFavoritesList;