import React, { useContext } from 'react'
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from "../context/authContext";
import { Badge, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

const Notifications = ({navigation}) => {
    const { state } = useContext(AuthContext);
    console.log('state in notif', state);
    if (state.authenticated) {
        return (
            <View >
                <View style={{ marginLeft: 5 }}>
                    <Icon 
                        type="ionicon" 
                        name="ios-notifications" 
                        onPress={() => navigation.navigate('Notifications')}
                        size={26} color='#fff' />
                    <Badge
                        value={state.notifications.filter(n => n.read === false).length}
                        status="error"
                        containerStyle={styles.badgeStyle}
                    />
                </View>
            </View>
        )

    } else {
        return null;
    }
};

const styles = StyleSheet.create({
    badgeStyle: {
        position: 'absolute',
        top: -6,
        right: -11
    }
})

export default withNavigation(Notifications);