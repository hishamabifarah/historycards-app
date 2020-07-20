import React, { useContext, useEffect } from 'react'
import { StyleSheet, ScrollView, Text, View , TouchableOpacity , ActivityIndicator } from 'react-native';
import { Context as TimelineContext } from "../context/timelinesContext";
import TimelinesHighestRatedList from '../components/timeline/TimelinesHighestRatedList';
import TimelinesLatestList from '../components/timeline/TimelinesLatestList';
import Divider from '../elements/Divider';
import Spacer from '../elements/Spacer';
import TimelineAdd from '../components/timeline/TimelineAdd';
import Notifications from '../components/notifications/Notifications';
import RecentActivitiesList from '../components/activities/RecentActivitiesList';

const sortTimelinesByRating = (arr) => {
    console.log('sort arr ' , arr);
    return arr.sort((a, b) => (a.ratingAverage < b.ratingAverage) ? 1 : -1)  
};

const filterTimelinesLatest = (arr, n) => {
    const newArr = arr.slice(0, n);
    console.log('new arr ' , newArr );
    return newArr;
};


const TimelinesHomeScreen = ({ navigation }) => {

    const { state, getTimelines , getRecentActivities} = useContext(TimelineContext);

    useEffect(() => {
        getTimelines(1);
        getRecentActivities();
    }, []);

    return (
        state.loading
            ? <ActivityIndicator style={{ paddingTop: 15 }} size="large" color="#00bcd4" />
            : (
                <ScrollView>
                    <TimelinesLatestList
                        // timelines={filterTimelinesLatest(state.timelines, 4)}
                        timelines={state.timelines}
                        title="Latest Timelines"
                    />

                    <TouchableOpacity  onPress={() => navigation.navigate('TimelineListAll')}>
                        <Spacer margin={10}>
                            <Text style={styles.link}>{'View All'}</Text>
                        </Spacer>
                    </TouchableOpacity>

                    {/* <Divider margin={[theme.sizes.padding * 0.9, 0]} /> */}
                    <Divider margin={[15 * 0.9, 0]} />

                    <TimelinesHighestRatedList
                        // timelines={sortTimelinesByRating(state.timelines)}
                        timelines={state.timelines}
                        title="Highest Rated"
                    />

                    <Divider margin={[15 * 0.9, 0]} />

                    <RecentActivitiesList
                        activities={state.activities}
                        title="Recent Activities"
                    />

                </ScrollView>
            )
    )
};

TimelinesHomeScreen.navigationOptions = () => ({
    title: 'History Cards',
    headerTintColor: '#FFF',
    headerStyle: {
        backgroundColor: '#00bcd4'
    },
    color: '#000',
    headerRight: () => (
        <View style={styles.icons}>
            <Notifications/>
            <TimelineAdd />
        </View>
    ),
});

const styles = StyleSheet.create({
    container: {
        paddingTop: 20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 5
    },
    icons:{
        flexDirection:'row',
        marginHorizontal: 10
    },
    link:{
        color: '#3498db',
        alignSelf: 'flex-end'
    }
});

export default TimelinesHomeScreen;