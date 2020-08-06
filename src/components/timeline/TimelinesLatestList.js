import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ResultsDetail from '../ResultsDetail';
import { withNavigation } from 'react-navigation'

const TimelinesLatestList = ({ title, timelines, navigation }) => {

    // const sortTimelinesByRating = (arr) => {
    //     console.log('sort arr ' , arr);
    //     return arr.sort((a, b) => (a.ratingAverage < b.ratingAverage) ? 1 : -1)  
    // };

    
    // const filterTimelinesLatest = (arr, n) => {
    //     const newArr = arr.slice(0, n);
    //     console.log('new arr ' , newArr);
    //     return newArr;
    // };


    if (!timelines.length) {
        return null;
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                numColumns={2}
                // data={timelines.slice(0, 4)}
                data={timelines}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(timeline) => timeline.timelineId}
                renderItem={({ item }) => {
                    return (
                        
                        // <TouchableOpacity onPress={() =>
                        //     navigation.navigate('TimelineDetail',
                        //         {
                        //             id: item.timelineId,
                        //             title: item.title,
                        //             description: item.description,
                        //             image: item.imageUrl
                        //         })}>
                        //     <ResultsDetail result={item} />
                        // </TouchableOpacity>
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