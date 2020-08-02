// React
import React, { useContext, useEffect, useState } from 'react'
import { Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, View, ActivityIndicator } from 'react-native';
import { Context as TimelineContext } from "../context/timelinesContext";

// Components
import Block from '../elements/Block';
import Spacer from '../elements/Spacer';
import Timeline from 'react-native-timeline-flatlist';
import { theme } from '../constants';
import AddTimelineCard from '../components/cards/AddTimelineCard';

// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const { width: WIDTH } = Dimensions.get('window');

const TimelineDetailsScreen = ({ navigation }) => {

    const title = navigation.getParam('title');
    const description = navigation.getParam('description');
    const imageUrl = navigation.getParam('image');
    const id = navigation.getParam('id');

    const { state, getTimelineCards } = useContext(TimelineContext);

    // console.log('state in TimelineDetailsScreen ' , state);

    const [page, setPage] = useState(state.page)

    dayjs.extend(relativeTime);

    useEffect(() => {
        getTimelineCards(id, page);
    }, []);

    useEffect(() => {
        if (page === 1) {

        } else {
            getTimelineCards(id, page);
        }
    }, [page]);

    const reloadOnError = () => {
        getTimelineCards(id, page);
    }

    const createTimelineArray = (arr) => {
        if (arr && arr.length > 0) {
            let newArr = [];
            for (let i = 0; i < arr.length; i++) {
                let newValArr = {
                    "time": dayjs(arr[i].cardDate).format('MMM DD, YYYY'),
                    "title": arr[i].title,
                    "description": arr[i].body
                }
                newArr.push(newValArr)
            }
            return newArr;
        }
    };

    const timelineInd = id;

    TimelineDetailsScreen.navigationOptions = () => ({
        title: 'Timeline Details',
        headerTintColor: '#FFF',
        headerStyle: {
            backgroundColor: '#3498db'
        },
        color: '#000',
        headerRight: () => (
            
            <View style={styles.icons}>
                <AddTimelineCard timelineId = {timelineInd}/>
            </View>
        ),
    });


    const image = imageUrl
        ? <Image style={styles.image} source={{ uri: imageUrl }} />
        : <Image style={styles.image} source={require('../../assets/images/no-image.jpg')} />

    return (
        <ScrollView>
            <View>
                <Block>
                    {image}
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>
                        {description}
                    </Text>
                </Block>
            </View>

            {state.loading && page === 1
                ? <ActivityIndicator style={{ paddingTop: 15 }} size="large" color="#00bcd4" />
                : (
                    <View>
                        <Text style={styles.title}>Cards</Text>
                        <Timeline
                            style={styles.list}
                            data={createTimelineArray(state.cards)}
                            circleSize={18}
                            circleColor='rgb(45,156,219)'
                            lineColor='rgb(45,156,219)'
                            timeContainerStyle={{ minWidth: 52, marginTop: 0, marginLeft: 2 }}
                            timeStyle={{
                                textAlign: 'left',
                                backgroundColor: '#ff9797',
                                color: 'white',
                                padding: 4,
                                borderRadius: 13
                            }}
                            descriptionStyle={{ color: 'gray' }}
                            options={{
                                style: { paddingTop: 5 },
                            }}
                            innerCircle={'dot'}
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
    }
});

export default TimelineDetailsScreen;