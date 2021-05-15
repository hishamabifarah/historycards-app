import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import Spacer from '../elements/Spacer';
import { withNavigation } from 'react-navigation';

const NavLink = ({ navigation, text, routeName }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
            <Spacer margin={15}>
                <Text style={styles.link}>{text}</Text>
            </Spacer>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    link: {
        color: 'white'
    }
});

// NavLink will now be called with the navigate prop
export default withNavigation(NavLink);