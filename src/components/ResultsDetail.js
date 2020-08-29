import React from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';

const { width: WIDTH } = Dimensions.get('window');

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

                <View style={{flexDirection:'row'}}>
                    <StarRating
                        disabled={false}
                        maxStars={5}
                        starSize={16}
                        fullStarColor={'#ffb400'}
                        rating={result.ratingAverage}
                    />
                    <Icon
                        style={{ marginRight: 6, marginLeft: 6 }}
                        name={'md-heart'}
                        size={16}
                        color={'#3498db'} />
                    <Text>
                        {result.likeCount}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5
    },
    image: {
        width: (WIDTH / 2) - 10,
        height: 120,
        borderRadius: 4,
        marginBottom: 5
    },
    name: {
        fontWeight: 'bold',
        marginBottom: 2
    },
    ratings: {
        marginBottom: 1,
        marginRight: 10
    }
});

export default ResultsDetail;