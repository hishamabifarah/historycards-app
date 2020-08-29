// React Native
import React, { useContext, useEffect, useState } from 'react'
import { Text, StyleSheet, ScrollView,  Dimensions, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Context as TimelineContext } from "../context/timelinesContext";

// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// Constants
import { theme } from '../constants';
import Spacer from '../elements/Spacer';
import CardsAllList from '../components/cards/CardsAllList';
const { width: WIDTH } = Dimensions.get('window');

const TimelineListAllCardsScreen = ({ navigation }) => {

    const id = navigation.getParam('id');
    const { state, getTimelineById } = useContext(TimelineContext);
    
    dayjs.extend(relativeTime);

    const [page, setPage] = useState(state.page)

    useEffect(() => {
        getTimelineById(id, page);
    }, []);

    useEffect(() => {
        if (page === 1) {

        } else {
            getTimelineById(id, page);
        }
    }, [page]);

    const reloadOnError = () => {
        getTimelineById(id, page);
    }

    return (

        <ScrollView>
            {state.loading && page === 1
                ? <ActivityIndicator style={{ paddingTop: 15 }} size="large" color="#00bcd4" />
                : (
                    <View>
                        <CardsAllList cards={state.timeline.cards} />
                    </View>
                )
            }

            {state.hasMoreCards && !state.loading && !state.errorsPaginateTimeline ?
                <TouchableOpacity onPress={() => setPage(page + 1)}>
                    <Spacer margin={10}>
                        <Text style={styles.link}>{'Load More'}</Text>
                    </Spacer>
                </TouchableOpacity>

                : state.hasMoreCards && !state.loading && state.errorsPaginateTimeline ? (
                    <View style={styles.mainErrorContainer}>
                        <View style={styles.errorContainer}>
                            <Text>{state.errorsPaginateTimeline}</Text>
                        </View>
                        <Spacer margin={10}>
                            <TouchableOpacity
                                onPress={reloadOnError}
                                style={styles.errorbutton}>
                                <Text style={styles.errorText}>Reload Cards</Text>
                            </TouchableOpacity>
                        </Spacer>
                    </View>

                ) : (null)
            }

        </ScrollView>
    )
};

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: (theme.sizes.base * 1.2) - 10,
        paddingVertical: theme.sizes.padding - 10,
    },
    description: {
        fontWeight: 'normal',
        color: 'gray',
        paddingHorizontal: (theme.sizes.base * 1.2) - 10,
        paddingVertical: theme.sizes.padding - 10,
    },
    image: {
        width: WIDTH,
        height: 250
    },
    list: {
        flex: 1,
        marginTop: 20,
    },
    link: {
        color: '#3498db',
        alignSelf: 'center'
    },
    mainErrorContainer: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10
    },
    errorbutton: {
        alignItems: "center",
        backgroundColor: "#3498db",
        padding: 10
    },
    errorContainer: {
        alignItems: "center",
        padding: 10
    },
    errorText: {
        color: '#FFF'
    },
    icons:{
        flexDirection:'row',
    },
});

export default TimelineListAllCardsScreen;