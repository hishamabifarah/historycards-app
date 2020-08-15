import React from 'react';
import { Image, StyleSheet, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Content, Card, CardItem, Thumbnail, Button, Left, Right, Body } from 'native-base';
import { withNavigation } from 'react-navigation'
// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Icon from 'react-native-vector-icons/Ionicons';
import Divider from '../../elements/Divider';
import Spacer from '../../elements/Spacer';

import DeleteCardTimeline from '../cards/DeleteCardTimeline';
import EditCardTimeline from '../cards/EditCardTimeline';

import LikeTimelineCardButton from '../cards/LikeTimelineCardButton'
import DislikeTimelineCardButton from '../cards/DislikeTimelineCardButton';


const CardsList = ({ result, navigation }) => {

    console.log('result card date' , result.cardDate);

    const userAvar = result.userImage

    const image = result.imageUrl

    const renderIfImage = result.imageUrl
        ? (
            <Image
                source={{ uri: image }}
                style={styles.image}
            />
        )
        : null

    dayjs.extend(relativeTime);

    return (
        <SafeAreaView style={styles.container}>
            <Content>
                <Card style={styles.card}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{ uri: userAvar }} />
                            <Body>
                                <Text>{result.title}</Text>
                                <Text style={styles.note}>{dayjs(result.cardDate).format('MMM DD , YYYY')}</Text>
                            </Body>
                        </Left>
                        <View style={styles.right}>
                            <EditCardTimeline
                                cardId={result.cardId}
                                title={result.title}
                                body={result.body}
                                cardDate = {result.cardDate}
                                source = {result.source}
                                timelineId = {result.timelineId}
                                userHandle={result.userHandle} />
                            <DeleteCardTimeline 
                                cardId={result.cardId} 
                                timelineId={result.timelineId}
                                userHandle={result.userHandle} />
                        </View>
                    </CardItem>
                    <CardItem>
                        <Body>
                            {renderIfImage}
                            <Text>{result.body}</Text>
                        </Body>
                    </CardItem>

                    <Divider margin={[2 * 0.9, 0]} />

                    <CardItem>
                        <Left>
                            <View>
                            <Text>Source: {result.source}</Text>
                            </View>
                        </Left>
                    </CardItem>
                    <CardItem >
                        <View style={styles.right}>

                            <Text style={styles.likeCount}>{result.likeCount}</Text>
                            <LikeTimelineCardButton
                                style={styles.likeIcon}
                                handle={result.userHandle}
                                id={result.cardId} />

                            <Text style={styles.dislikeCount}>{result.dislikeCount}</Text>
                            <DislikeTimelineCardButton
                                style={styles.dislikeIcon}
                                handle={result.userHandle}
                                id={result.cardId} />

                        </View>
                     
                    </CardItem>
                </Card>
            </Content>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    card: {
        padding: 8,
        elevation: 5,
        flex: 0
    },
    image: {
        width: '100%',
        height: 180,
        marginBottom: 10
    },
    note: {
        fontSize: 12
    },
    right: {
        flexDirection: 'row',
    },
    likeIcon: {
        marginRight:10
    },
    dislikeIcon:{
        marginTop: 2
    },  
    likeCount:{
        marginRight: 10,
        marginTop: 5
    },
    dislikeCount:{
        marginRight: 10,
        marginTop: 5,
        marginLeft: 10
    }

});

export default withNavigation(CardsList);