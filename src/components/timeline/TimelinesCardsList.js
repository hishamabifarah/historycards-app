import React from 'react';
import { Image, StyleSheet, SafeAreaView, Text } from 'react-native';
import { Content, Card, CardItem, Thumbnail, Button, Left, Right, Body } from 'native-base';

// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Icon from 'react-native-vector-icons/Ionicons';
import Divider from '../../elements/Divider';
import LikeTimelineButton from '../timeline/LikeTimelineButton';

const TimelinesCardsList = ({ result }) => {
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
                            <LikeTimelineButton/>
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

                        <Right>
                            <Button transparent textStyle={{ color: '#87838B' }}>
                                <Icon
                                    style={{ marginRight: 3, marginLeft: 3 }}
                                    name={'ios-bookmark'}
                                    size={20}
                                    color={'#3498db'} />
                         
     
                                <Text>
                                    View Cards
                                </Text>
                            </Button>
                        </Right>
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
    }
});

export default TimelinesCardsList;