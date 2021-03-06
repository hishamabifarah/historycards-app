import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation'
import RecentActivitiesListDetails from './RecentActivitiesListDetails';


const RecentActivitiesList = ({ title, activities }) => {

    if (!activities) {
        return null;
    }
    return (
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
            <FlatList
                data={activities}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(activity) => activity.createdAt}
                renderItem={({ item }) => {
                    return (
                            <RecentActivitiesListDetails result={item} />
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 10,
        color: '#00bcd4'
    }
});

export default withNavigation(RecentActivitiesList);