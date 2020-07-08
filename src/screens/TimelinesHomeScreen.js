import React, { useContext, useEffect } from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native';
import { Context as TimelineContext } from "../context/timelinesContext";
import TimelinesHighestRatedList from '../components/timeline/TimelinesHighestRatedList';
import TimelinesLatestList from '../components/timeline/TimelinesLatestList';
import Divider from '../elements/Divider';

const TimelinesHomeScreen = () => {

    const { state, getTimelines } = useContext(TimelineContext);
    // console.log('state ', state);

    useEffect(() => {
        getTimelines();
    }, []);

    const filterTimelinesLatest = (arr, n) => {
        const newArr = arr.slice(0, n);
        return newArr;
    };

    const sortTimelinesByRating = (arr) => {
        return arr.sort((a, b) => (a.ratingAverage < b.ratingAverage) ? 1 : -1)
    };

    return (

        state.loading
            // replace with skeleton loading
            ? <Text>loading</Text>
            : (
                <ScrollView>
                    <TimelinesLatestList
                        timelines={filterTimelinesLatest(state.timelines, 4)}
                        title="Latest Timelines"
                    />

                    {/* <Divider margin={[theme.sizes.padding * 0.9, 0]} /> */}
                    <Divider margin={[15 * 0.9, 0]} />

                    <TimelinesHighestRatedList
                        timelines={sortTimelinesByRating(state.timelines)}
                        title="Highest Rated"
                    />
                </ScrollView>
            )
    )
};

TimelinesHomeScreen.navigationOptions = {
    title: 'History Cards',
    headerTintColor: '#FFF',
    headerStyle: {
      backgroundColor: '#00bcd4'
    },
    color: '#000'
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 5
    }
});

export default TimelinesHomeScreen;