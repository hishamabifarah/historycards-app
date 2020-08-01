import React, { useContext, useEffect } from 'react'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Context as TimelineContext } from "../context/timelinesContext";
import TimelinesAllList from '../components/timeline/TimelinesAllList';
import Spacer from '../elements/Spacer';
const TimelineListAllScreen = () => {

    const { state, getTimelines } = useContext(TimelineContext);
    useEffect(() => {
        getTimelines(1);
    },[])

    const loadMore = (page) => {
        getTimelines(page);
    }

    return (
        <ScrollView>
            {state.loading
                ? <ActivityIndicator style={{ paddingTop: 15 }} size="large" color="#00bcd4" />
                : (
                    <View>
                
                        <TimelinesAllList timelines={state.timelines} />
                            {state.page < state.pageCount
                            ? <TouchableOpacity onPress={() => loadMore(state.page+1)}>
                                <Spacer margin={10}>
                                    <Text style={styles.link}>{'Load More'}</Text>
                                </Spacer>
                            </TouchableOpacity>
                            : null 
                        }
                    </View>
                )
            }
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    link:{
        color: '#3498db',
        alignSelf: 'center'
    }
});

export default TimelineListAllScreen;