// React Native
import React, { useContext, useEffect } from 'react'
import { Text, StyleSheet, Button, ScrollView, Image, Dimensions, View , ActivityIndicator} from 'react-native';
import { Context as TimelineContext } from "../context/timelinesContext";
import Timeline from 'react-native-timeline-flatlist';
import { NavigationEvents } from 'react-navigation';

// Components
import Block from '../elements/Block';

// Constants
import { theme } from '../constants';

const { width: WIDTH } = Dimensions.get('window');

const TimelineDetailsScreen = ({ navigation }) => {

    const title = navigation.getParam('title');
    const description = navigation.getParam('description');
    const imageUrl = navigation.getParam('image');
    const id = navigation.getParam('id');
    const { state, getTimelineCards , clearCards } = useContext(TimelineContext);

    console.log('state Timeline Details: ', state);

    useEffect(() => {
        getTimelineCards(id);
    }, []);

    const createTimelineArray = (arr) => {
        if (arr && arr.length > 0) {
            let newArr = [];
            for (let i = 0; i < arr.length; i++) {
                let newValArr = {
                    "time": '09:12',
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

    const image = imageUrl
        ? <Image style={styles.image} source={{ uri: imageUrl }} />
        : <Image style={styles.image} source={{ uri: noImageUri }} />

    return (
        <ScrollView>
            <NavigationEvents
                onDidBlur={clearCards}
            />
            <View>
                <Block style={styles.timeline}>
                    {image}
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>
                        {description}
                    </Text>
                </Block>
            </View>

                
            {state.loading
            ? <ActivityIndicator style={{ paddingTop: 15 }} size="large" color="#00bcd4" />                
            :(
            <View>
                <Text style={styles.title}>Cards</Text>
                <Timeline
                    style={styles.list}
                    data={createTimelineArray(state.cards)}
                    circleSize={20}
                    circleColor='rgb(45,156,219)'
                    lineColor='rgb(45,156,219)'
                    timeContainerStyle={{ minWidth: 52, marginTop: 0 }}
                    timeStyle={{
                        textAlign: 'center',
                        backgroundColor: '#ff9797',
                        color: 'white',
                        padding: 5,
                        borderRadius: 13
                    }}
                    descriptionStyle={{ color: 'gray' }}
                    // options={{
                    //     style: { paddingTop: 5 },
                    //     refreshControl: (
                    //         <RefreshControl
                    //             refreshing={this.state.isRefreshing}
                    //             onRefresh={this.onRefresh}
                    //         />
                    //     ),
                    //     renderFooter: this.renderFooter,
                    //     onEndReached: this.onEndReached
                    // }}
                    innerCircle={'dot'}
                /> 
            </View>
            )}
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    timeline: {
        // paddingHorizontal: theme.sizes.base * 2,
        // paddingVertical: theme.sizes.padding,
    },
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

export default TimelineDetailsScreen;