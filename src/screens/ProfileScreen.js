import React, { useContext } from "react";
import { Context as AuthContext } from "../context/authContext";
import { Text, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-navigation';

const ProfileScreen = () => {

    const { signout } = useContext(AuthContext);

    return (
        <SafeAreaView forceInset={{top: 'always'}}>
            <Text>Account Screen</Text>

            <Button
                title="Sign out"
                onPress={signout}
            />
        </SafeAreaView>
    )
};

ProfileScreen.navigationOptions = {
    title: 'Profile',
    headerTintColor: '#FFF',
    headerStyle: {
      backgroundColor: '#00bcd4'
    },
    color: '#000'
};

const styles = StyleSheet.create({});

export default ProfileScreen;