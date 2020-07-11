import React, { useContext, useEffect } from 'react'
import { StyleSheet, ScrollView, Text , View } from 'react-native';
import { Context as TimelineContext } from "../context/timelinesContext";
import TimelinesFavoritesList from '../components/timeline/TimelinesFavoritesList';


const TimelineFavoritesScreen = () => {

    const { state, getTimelineFavorites } = useContext(TimelineContext);

    useEffect(() => {
        getTimelineFavorites();
    }, [])

    return (
        state.loading
            ? <Text>loading</Text>
            : (
                <ScrollView>
                    <TimelinesFavoritesList timelines={state.favorites}/>
                </ScrollView>
            )
    )
};

TimelineFavoritesScreen.navigationOptions = {
    title: 'Favorites',
    headerTintColor: '#FFF',
    headerStyle: {
      backgroundColor: '#00bcd4'
    },
    color: '#000'
};

const styles = StyleSheet.create({});

export default TimelineFavoritesScreen;