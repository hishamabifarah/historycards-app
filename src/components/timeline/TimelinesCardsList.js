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

import LikeTimelineButton from '../timeline/LikeTimelineButton';
import FavoriteTimelineButton from '../timeline/FavoriteTimelineButton';
import DeleteTimelineButton from '../timeline/DeleteTimelineButton';
import EditTimelineButton from '../timeline/EditTimelineButton';

const TimelinesCardsList = ({ result, navigation }) => {

    // console.log('result user handle ' , result.userHandle);

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
                                <Text style={styles.note}>{dayjs(result.createdAt).fromNow()}</Text>

                            </Body>
                        </Left>
                        <View style={styles.right}>
                            <EditTimelineButton 
                                timelineId={result.timelineId} 
                                title={result.title}
                                description={result.description}
                                userHandle={result.userHandle}/>
                            <DeleteTimelineButton timelineId={result.timelineId} userHandle={result.userHandle} />
                          
                        </View>
                    </CardItem>
                    <CardItem>
                        <Body>
                            {renderIfImage}
                            <Text>{result.description}</Text>
                        </Body>
                    </CardItem>

                    <Divider margin={[2 * 0.9, 0]} />

                    <CardItem>
                        <Left>
                            <Button transparent textStyle={{ color: '#87838B' }}>
                                <LikeTimelineButton timelineId={result.timelineId} />
                                <Text>
                                    {result.likeCount}
                                </Text>
                            </Button>
                            <Button transparent textStyle={{ color: '#87838B' }}>
                                <Icon
                                    style={{ marginRight: 3, marginLeft: 3 }}
                                    name={'md-text'}
                                    size={20}
                                    color={'#3498db'} />
                                <Text>
                                    {result.commentCount}
                                </Text>
                            </Button>
                            <Button transparent textStyle={{ color: '#87838B' }}>
                                <Icon
                                    style={{ marginRight: 3, marginLeft: 3 }}
                                    name={'ios-eye'}
                                    size={20}
                                    color={'#3498db'} />
                                <Text>
                                    {result.viewsCount}
                                </Text>
                            </Button>
                        </Left>

                        <View style={styles.right}>
                            <FavoriteTimelineButton style={styles.favorite} timelineId={result.timelineId} />
                            {/* <Text onPress={() =>
                                    navigation.navigate('TimelineDetail',
                                        {
                                            id: result.timelineId,
                                            title: result.title,
                                            description: result.description,
                                            image: result.imageUrl
                                        })}>
                                    View Cards
                                </Text> */}
                            <TouchableOpacity
                                style={styles.viewcards}
                                onPress={() =>
                                    navigation.navigate('TimelineDetailScreenByID',
                                        {
                                            id: result.timelineId
                                        })}>
                                <Text style={styles.link}>{'View Cards'}</Text>
                            </TouchableOpacity>
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
    favorite: {
        marginTop: 10,
    },
    viewcards: {
        marginLeft: 15,
        marginTop: 1
    },
    link: {
        color: '#3498db',
        alignSelf: 'flex-end'
    },

});

export default withNavigation(TimelinesCardsList);