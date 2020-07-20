import React from 'react';
import { Image, StyleSheet, SafeAreaView , Text} from 'react-native';
import {  Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body } from 'native-base';

// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const TimelinesCardsList = ({ result }) => {

    const noImageUri = 'https://pianomaster.ie/wp-content/uploads/2019/04/no-image.jpg';

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

    // ? <Image style={styles.image} source={{ uri: result.imageUrl }} />
    // : <Image style={styles.image} source={{ uri: noImageUri }} />

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
                    <CardItem>
                        <Left>
                            <Button transparent textStyle={{ color: '#87838B' }}>
                                <Icon name="logo-github" />
                                <Text>1,926 stars</Text>
                            </Button>
                        </Left>
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
    note:{
        fontSize: 12
    }
});

export default TimelinesCardsList;