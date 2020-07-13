import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/authContext";
import { Text, StyleSheet, Button , View , ScrollView , TouchableOpacity} from 'react-native';
import NotLoggedIn from '../components/auth/NotLoggedIn';
import Profile from '../components/auth/Profile';

const ProfileScreen = () => {

    const { state, tryLocalProfile, signout } = useContext(AuthContext);

    useEffect(() => {
        tryLocalProfile();
    })

    return (
        !state.userDetails ? null :
            (
                <ScrollView>
                    <Profile profile={state.userDetails} />
                    <TouchableOpacity style={styles.buttonContainer} onPress={signout}>
                        <Text style={styles.buttonText}>Sign Out</Text>
                    </TouchableOpacity>
                </ScrollView>
            )
    )
};

const styles = StyleSheet.create({
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 200,
        borderRadius: 30,
        backgroundColor: "#3498db",
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        padding: 12
    },
    buttonText: {
        color: '#fff'
    }
});

export default ProfileScreen;