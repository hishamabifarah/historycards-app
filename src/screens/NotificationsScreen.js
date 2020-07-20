import React, { useContext } from "react";
import { FlatList,  StyleSheet, View } from 'react-native';  
import { Context as AuthContext } from "../context/authContext";
import NotificationsList from '../components/notifications/NotificationsList';

const NotificationsScreen = () => {

    const { state } = useContext(AuthContext);
    // console.log('state in notif screen', state);

     return (
        <View style={styles.container}>  
        <FlatList  
            data={state.notifications}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(notification) => notification.createdAt}
            renderItem={({ item }) => {
                return (
                    <NotificationsList result={item} />
                )
            }}
        />  
    </View>  
     )

};

const styles = StyleSheet.create({  
    container: {  
        flex: 1,  
    },  
    item: {  
        padding: 10,  
        fontSize: 18,  
        height: 44,  
    },  
})  

export default NotificationsScreen;