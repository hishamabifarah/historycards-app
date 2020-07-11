import React, { useContext, useEffect } from 'react'
import { Text, View, ScrollView, TouchableOpacity , StyleSheet} from 'react-native';
import { Context as TimelineContext } from "../context/timelinesContext";
import TimelinesAllList from '../components/timeline/TimelinesAllList';
import Spacer from '../elements/Spacer';
const TimelineListAllScreen = () => {

    const { state, getTimelines } = useContext(TimelineContext);
    console.log('state favorites' , state);
    useEffect(() => {
        getTimelines(1);
    },[])

    const loadMore = (page) => {
        console.log('page in load more' , page)
        getTimelines(page);
    }

    console.log('timelines All state' , state.timelines)

    return (
        <ScrollView>
            {state.loading
                ? <Text>Loading</Text>
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