import React, { useContext, useEffect } from 'react'
import { StyleSheet, ScrollView, Text, View , TouchableOpacity } from 'react-native';
import { Context as TimelineContext } from "../context/timelinesContext";
import TimelinesHighestRatedList from '../components/timeline/TimelinesHighestRatedList';
import TimelinesLatestList from '../components/timeline/TimelinesLatestList';
import Divider from '../elements/Divider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Spacer from '../elements/Spacer';

const sortTimelinesByRating = (arr) => {
    console.log('sort arr ' , arr);
    return arr.sort((a, b) => (a.ratingAverage < b.ratingAverage) ? 1 : -1)  
};

const filterTimelinesLatest = (arr, n) => {
    const newArr = arr.slice(0, n);
    console.log('new arr ' , newArr);
    return newArr;
};


const TimelinesHomeScreen = ({navigation}) => {

    const { state, getTimelines } = useContext(TimelineContext );

    useEffect(() => {
        getTimelines(1);
    }, []);

    return (
        
        state.loading
            ? <Text>loading</Text>
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

                    <Text> Recent Activities </Text>

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
    color: '#000',
    headerRight: () => (
        <View style={styles.icons}>
            <Icon
                onPress={() => console.log('notifications')}
                name={'notifications'}
                size={26}
                color="#fff"
            />
            <Icon
            style={{marginLeft: 5}}
                name={'add'}
                size={26}
                color="#fff"
                onPress={() => console.log('add')}
            />
        </View>
    ),
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