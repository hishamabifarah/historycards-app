import React from 'react';
import { Image, StyleSheet, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Content, Card, CardItem, Thumbnail, Left, Body } from 'native-base';
import { withNavigation } from 'react-navigation'
// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Divider from '../../elements/Divider';
import FavoriteTimelineButton from '../timeline/FavoriteTimelineButton';

const TimelineListAllFavorites = ({ result, navigation }) => {

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
                        <View style={styles.right}>
                            <FavoriteTimelineButton style={styles.favorite} timelineId={result.timelineId} />
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

export default withNavigation(TimelineListAllFavorites);