import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/authContext";
import { Text, StyleSheet, Button , View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import NotLoggedIn from '../components/auth/NotLoggedIn';
import Profile from '../components/auth/Profile';

const ProfileScreen = () => {

    const { signout , state , tryLocalProfile } = useContext(AuthContext);
    console.log('state in profile' , state);

    useEffect(() => {
        tryLocalProfile();
    } ,[])

    return (        
        state.token ? <Profile /> : <NotLoggedIn />
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