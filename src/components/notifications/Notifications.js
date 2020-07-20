import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from "../../context/authContext";
import { Badge, Icon } from 'react-native-elements';
import { withNavigation } from 'react-navigation';

const Notifications = ({ navigation }) => {
    const { state } = useContext(AuthContext);

    if (state.authenticated) {
        return (
            <View >
                <View style={{ marginLeft: 5 }}>
                    <Icon
                        type="ionicon"
                        name="ios-notifications"
                        onPress={() => navigation.navigate('Notifications')}
                        size={26} color='#fff' />

                    {
                        state.notifications && state.notifications.length > 0
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