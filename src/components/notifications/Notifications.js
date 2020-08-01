import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from "../../context/authContext";
import { Badge, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

const Notifications = ({ navigation }) => {
    const { state, markNotificationsRead } = useContext(AuthContext);

    const checkIfAuthenticated = () => {
        if (state.authenticated) {
            navigation.navigate('Notifications');
            let unreadNotificationsIds = state.notifications
                .filter(n => !n.read)
                .map(n => n.notificationId);
            markNotificationsRead(unreadNotificationsIds);
        } else {
            navigation.navigate('Splash');
        }
    }

    if (state.authenticated) {
        return (
            <View>
                <View style={{ marginLeft: 5 }}>
                    <Icon
                        type="ionicon"
                        name="ios-notifications"
                        onPress={checkIfAuthenticated}
                        size={28} color='#fff' />

                    {
                        state.notifications && state.notifications.filter(n => !n.read).length > 0
                            ?
                            <Badge
                                value={state.notifications.filter(n => n.read === false).length}
                                status="error"
                                containerStyle={styles.badgeStyle}
                            />
                            : null
                    }
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