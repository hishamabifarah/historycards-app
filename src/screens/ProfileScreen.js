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

const styles = StyleSheet.create({});

export default ProfileScreen;