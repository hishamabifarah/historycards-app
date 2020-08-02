// React Native
import React, { useContext, useEffect } from 'react'
import { Text, StyleSheet, Button, ScrollView, Image, Dimensions, View , ActivityIndicator } from 'react-native';
// import { NavigationEvents } from 'react-navigation';
import { Context as TimelineContext } from "../context/timelinesContext";
import Timeline from 'react-native-timeline-flatlist';
// Components
import Block from '../elements/Block';
// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// Constants
import { theme } from '../constants';

const { width: WIDTH } = Dimensions.get('window');

const TimelineDetailScreenByID = ({ navigation }) => {

    const id = navigation.getParam('id');
    const { state, getTimelineById , clearCards } = useContext(TimelineContext);

    // console.log('state Timeline Details: ', state);
    dayjs.extend(relativeTime);
    useEffect(() => {
        getTimelineById(id);
    }, []);

    const createTimelineArray = (arr) => {
        if (arr && arr.length > 0) {
            let newArr = [];
            for (let i = 0; i < arr.length; i++) {
                let newValArr = {
                    "time":  dayjs(arr[i].cardDate).format('MM DD, YYYY'),
                    "title": arr[i].title,
                    "description": arr[i].body
                }
                newArr.push(newValArr)
            }
            return newArr;
        }
    };

    // get one from assets
    const noImageUri = 'https://pianomaster.ie/wp-content/uploads/2019/04/no-image.jpg';

    const image = state.timeline.imageUrl
        ? <Image style={styles.image} source={{ uri: state.timeline.imageUrl }} />
        : <Image style={styles.image} source={{ uri: noImageUri }} />

    return (

        state.loading
        ? <ActivityIndicator style={{ paddingTop: 15 }} size="large" color="#00bcd4" /> 
        :   
        (
        <ScrollView>
            <View>
                <Block style={styles.timeline}>
                    {image}
              
                    <Text style={styles.title}>{state.timeline.title}</Text>
                    <Text style={styles.description}>
                        {state.timeline.description}
                    </Text>
                </Block>
            </View>

            <View>
                <Text style={styles.title}>Cards</Text>
                <Timeline
                    style={styles.list}
                    data={createTimelineArray(state.timeline.cards)}
                    circleSize={20}
                    circleColor='rgb(45,156,219)'
                    lineColor='rgb(45,156,219)'
                    timeContainerStyle={{ minWidth: 48, marginTop: 0 }}
                    timeStyle={{
                        textAlign: 'center',
                        backgroundColor: '#ff9797',
                        color: 'white',
                        padding: 5,
                        borderRadius: 13
                    }}
                    descriptionStyle={{ color: 'gray' }}
                    innerCircle={'dot'}
                /> 
            </View>
      
        </ScrollView>
        )
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
});

export default TimelineDetailScreenByID;