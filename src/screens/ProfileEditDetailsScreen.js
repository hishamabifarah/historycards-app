import React, { useState, useContext } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, TextInput, Button , ScrollView } from 'react-native';
import { Context as AuthContext } from "../context/authContext";

const ProfileEditDetailsScreen = ({ navigation }) => {

    const [twitter, setTwitter] = useState(navigation.getParam('twitter'));
    const [facebook, setFacebook] = useState(navigation.getParam('facebook'));
    const [location, setLocation] = useState(navigation.getParam('location'));
    const [website, setWebsite] = useState(navigation.getParam('website'));
    const [bio, setBio] = useState(navigation.getParam('bio'));

    const { state, updateUserDetails, clearErrorMessage } = useContext(AuthContext);

    return (
        <ScrollView>
            <Text style={styles.label}>Twitter: </Text>

            <TextInput
                style={styles.input}
                value={twitter}
                onChangeText={(text) => setTwitter(text)} />

            <Text style={styles.label}>Facebook: </Text>
            <TextInput
                style={styles.input}
                value={facebook}
                onChangeText={(text) => setFacebook(text)} />

            <Text style={styles.label}>Location: </Text>
            <TextInput
                style={styles.input}
                value={location}
                onChangeText={(text) => setLocation(text)} />

            <Text style={styles.label}>Website: </Text>
            <TextInput
                style={styles.input}
                value={website}
                onChangeText={(text) => setWebsite(text)} />

            <Text style={styles.label}>Bio: </Text>
            <TextInput
                style={styles.inputMultiLine}
                value={bio}
                multiline
                numberOfLines={4}
                onChangeText={(text) => setBio(text)} />

            <Button
                onPress={() => updateUserDetails({ facebook, twitter, website, location, bio })}
                title="Save Details" />
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 5
    },
    inputMultiLine: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 15,
        margin: 5,
        padding : 5
    },

    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
    }
})

export default ProfileEditDetailsScreen;