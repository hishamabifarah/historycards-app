import React, { useContext, useEffect } from 'react'
import { StyleSheet, ScrollView, Text , View , SafeAreaView , ActivityIndicator } from 'react-native';
import { Context as TimelineContext } from "../context/timelinesContext";
import TimelinesFavoritesList from '../components/timeline/TimelinesFavoritesList';


const TimelineFavoritesScreen = () => {

    const { state, getTimelineFavorites } = useContext(TimelineContext);

    useEffect(() => {
        getTimelineFavorites();
    }, [])

    return (
        state.loading
            ? <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#00bcd4" />
            : (
 
                <ScrollView>
                    <Text style={styles.title}> Favorite Timelines </Text>
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

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop : 50,
        color: '#00bcd4',
        alignSelf:'center'
    }
});

export default TimelineFavoritesScreen;