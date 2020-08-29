// React Native
import React, { useContext, useEffect, useState } from 'react'
import { Text, StyleSheet, ScrollView, Image, Dimensions, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Context as TimelineContext } from "../context/timelinesContext";
import Timeline from 'react-native-timeline-flatlist';
// Components
import Block from '../elements/Block';
import AddTimelineCard from '../components/cards/AddTimelineCard';
import EditTimelineCard from '../components/cards/EditTimelineCard';
// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// Constants
import { theme } from '../constants';
import Spacer from '../elements/Spacer';
const { width: WIDTH } = Dimensions.get('window');

const TimelineDetailScreenByID = ({ navigation }) => {

    const id = navigation.getParam('id');
    const { state, getTimelineById } = useContext(TimelineContext);

    dayjs.extend(relativeTime);

    const [page, setPage] = useState(state.page)
    const noImageUri = 'https://pianomaster.ie/wp-content/uploads/2019/04/no-image.jpg';
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

    const createTimelineArray = (arr) => {
        if (arr && arr.length > 0) {
            let newArr = [];
            for (let i = 0; i < arr.length; i++) {
                let newValArr = {
                    "time": dayjs(arr[i].cardDate).format('MM/DD/YYYY'),
                    "title": arr[i].title,
                    "description": arr[i].body
                }
                newArr.push(newValArr)
            }
            return newArr;
        }
    };

    TimelineDetailScreenByID.navigationOptions = () => ({
        headerRight: () => (
            <View style={styles.icons}>
                <EditTimelineCard timelineId = {id} />
                <AddTimelineCard timelineId = {id}/>
            </View>
        ),
    });

    const image = state.timeline.imageUrl
        ? <Image style={styles.image} source={{ uri: state.timeline.imageUrl }} />
        : <Image style={styles.image} source={{ uri: noImageUri }} />

    return (

        <ScrollView>
            {state.loading && page === 1
                ? <ActivityIndicator style={{ paddingTop: 15 }} size="large" color="#00bcd4" />
                : (
                    <View>
                        <Block>
                            {image}
                            <Text style={styles.title}>{state.timeline.title}</Text>
                            <Text style={styles.description}>
                                {state.timeline.description}
                            </Text>
                        </Block>

                        <Text style={styles.title}>Cards</Text>

                        
                        <Timeline
                            style={styles.list}
                            data={createTimelineArray(state.timeline.cards)}
                            circleSize={16}
                            circleColor='rgb(45,156,219)'
                            seperator={true}
                            lineColor='rgb(45,156,219)'
                            timeContainerStyle={{ minWidth: 72, marginTop: 0, marginLeft: 2, marginRight: 2 }}
                            timeStyle={{
                                textAlign: 'left',
                                backgroundColor: '#ff9797',
                                color: 'white',
                                padding: 8,
                                borderRadius: 14
                            }}
                            descriptionStyle={{ color: 'gray' }}
                            options={{
                                style: { paddingTop: 5 },
                            }}
                            innerCircle={'dot'}
                            onPress={() => console.log('pressed')}
                        />
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

export default TimelineDetailScreenByID;