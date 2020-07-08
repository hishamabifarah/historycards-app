import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ResultsDetail from '../ResultsDetail';
import { withNavigation } from 'react-navigation'

const TimelinesHighestRatedList = ({ title, timelines, navigation }) => {

    if (!timelines.length) {
        return null;
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            <FlatList
                horizontal
                data={timelines}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(timeline) => timeline.timelineId}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('TimelineDetail',
                                {
                                    id: item.timelineId,
                                    title: item.title,
                                    description: item.description,
                                    image: item.imageUrl
                                })}>
                            <ResultsDetail result={item} />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 10,
        color: '#00bcd4'
    }
});

export default withNavigation(TimelinesHighestRatedList);