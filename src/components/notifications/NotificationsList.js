import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from 'react-navigation';

// dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const NotificationsList = ({ result , navigation }) => {

    dayjs.extend(relativeTime);

    const iconColor = result.read ? '#3498db' : '#ff3d00';

    const icon =
    result.type === 'like' ? (
      <Icon name={'md-heart'} size={26} color={iconColor} style={styles.icons} />
    ) : result.type === 'comment' ? (
      <Icon name={'md-text'} color={iconColor} size={26} style={styles.icons}/>
    ) : (
          <Icon name={'ios-bookmark'} color={iconColor} size={26} style={styles.icons} />
        )

    const verb = result.type === 'like' ? 'liked' : result.type === 'comment' ? 'added a card to' : 'favorited';
    const time = dayjs(result.createdAt).fromNow();

    return (
        <View style={styles.listItem}>
            <View style={{ alignItems: "flex-start", flex: 1 }}>
            <TouchableOpacity 
              onPress={() =>
              navigation.navigate('TimelineDetailScreenByID',
                  {
                      id: result.timelineId
                  })}>
                <Text style={styles.text}>
                {icon} {result.sender} {verb} your timeline
                </Text>
                 
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ height: 40, width: 100, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "black" }}>{time}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7F7F7',
      marginTop:60
    },
    listItem:{
      margin:8,
      padding:10,
      backgroundColor:"#FFF",
      width:"90%",
      flex:1,
      alignSelf:"center",
      flexDirection:"row",
      borderRadius:5
    },
    text:{
        fontWeight: 'bold',
        marginTop: 3
    },
    icons:{
        marginRight: 10
    }
  });

export default withNavigation(NotificationsList);