import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';

const { width: WIDTH } = Dimensions.get('window');
console.log(`width signup screen: ${WIDTH} `);

const ResultsDetail = ({ result }) => {

    const noImageUri = 'https://pianomaster.ie/wp-content/uploads/2019/04/no-image.jpg';

    const image = result.imageUrl
        ? <Image style={styles.image} source={{ uri: result.imageUrl }} />
        : <Image style={styles.image} source={{ uri: noImageUri }} />
    return (
        <View style={styles.container}>
            <View>
                {image}
                <Text style={styles.name}>{result.title}</Text>
                <Text style={styles.ratings}>{result.ratingAverage} Stars , {result.likeCount} Likes</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 15
    },
    image: {
        width: 180,
        height: 120,
        borderRadius: 4,
        marginBottom: 5
    },
    name: {
        fontWeight: 'bold'
    },
    ratings: {
        marginBottom: 1
    }
});

export default ResultsDetail;