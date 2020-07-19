import React, { useContext, useEffect } from "react";
import { FlatList,  StyleSheet, Text, View, Alert } from 'react-native';  
const NotificationsScreen = () => {

     return (
        <View style={styles.container}>  
        <FlatList  
            data={[  
                {key: 'Android'},  
                {key: 'Php'},
                {key: 'Python'},
                {key: 'Ruby'},
                {key: 'Perl'},  
                {key: 'Ajax'},
                {key: 'Rails'} 
            ]}  
            renderItem={({item}) =>  
                <Text style={styles.item}>
                      {item.key}</Text>}  
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