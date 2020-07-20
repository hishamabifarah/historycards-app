import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const RecentActivitiesListDetails = ({ result }) => {
    dayjs.extend(relativeTime);

    const time = dayjs(result.createdAt).fromNow();
    const verb = result.type === 'timeline' ? ' created timeline: ' : ` added card '${result.title}' to timeline: `;

    return (
        <View style={styles.listItem}>

            <Image
                source={{ uri: result.userImage }}
                style={{ width: 40, height: 40, borderRadius: 30 }} />

            <View style={{ alignItems: "flex-start", flex: 1, marginLeft: 10 }}>

                <Text style={{ fontWeight: "bold" }}>{result.userHandle}</Text>

                <Text>{verb} {result.title}</Text>

            </View>

            <TouchableOpacity style={{ height: 50, width: 100, justifyContent: "flex-end", alignItems: "flex-end" }}>
                <Text style={{ color: "black" }}>{time}</Text>
            </TouchableOpacity>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        marginTop: 60
    },
    listItem: {
        margin: 8,
        padding: 12,
        backgroundColor: "#FFF",
        width: "96%",
        flex: 1,
        alignSelf: "flex-start",
        flexDirection: "row",
        borderRadius: 5
    },
    text: {
        fontSize: 16,
        marginTop: 3,
    },
    icons: {
        marginRight: 10
    },
    user: {
        color: '#3498db',
        fontWeight: 'bold',
        position: 'absolute',
        left: 50
    },
    verb: {
        position: 'absolute',
        left: 45,
        top: 16
    },
    title: {
        color: '#3498db',
        fontWeight: 'bold',
        left: 45,
        top: 24
    }
});

export default RecentActivitiesListDetails;