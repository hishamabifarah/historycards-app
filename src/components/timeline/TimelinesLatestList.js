import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ResultsDetail from '../ResultsDetail';
import { withNavigation } from 'react-navigation'

const TimelinesLatestList = ({ title, timelines, navigation }) => {

    if (!timelines.length) {
        return null;
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                numColumns={2}
                data={timelines}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(timeline) => timeline.timelineId}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('TimelineDetailScreenByID',
                                {
                                    id: item.timelineId,
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
        marginBottom: 10,
        marginTop: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 10, 
        color: '#00bcd4'
    }
});

export default withNavigation(TimelinesLatestList);