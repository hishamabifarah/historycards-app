import React, { useState, useContext } from 'react'
import {
    Text, StyleSheet, View, TouchableOpacity, TextInput,
    ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback,
    Alert, Keyboard
} from 'react-native';
import { Context as TimelineContext } from "../context/timelinesContext";

const TimelineEditScreen = ({ navigation }) => {

    // const id = navigation.getParam('id');
    // console.log('id', id)
    const [title, setTitle] = useState(navigation.getParam('title'));
    const [description, setDescription] = useState(navigation.getParam('description'));
    const [id] = useState(navigation.getParam('id'));
    const { state, editTimeline } = useContext(TimelineContext);

    console.log('state', state.loading);

    const checkInput = () => {
        if (title.trim().length === 0) {
            Alert.alert('Please Enter Title');
        } else if (description.trim().length === 0) {
            Alert.alert('Please Enter Description');
        } else {
            editTimeline({ id, title, description });
        }
    }

    return (
        <KeyboardAvoidingView style={styles.containerView}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.loginScreenContainer}>
                    <View style={styles.loginFormView}>
                        <Text style={styles.logoText}>Edit Timeline</Text>
                        <TextInput
                            placeholder="Title"
                            placeholdercolor="#c4c3cb"
                            style={styles.loginFormTextInput}
                            value={title}
                            onChangeText={(text) => setTitle(text)} />

                        <TextInput
                            placeholder="Description"
                            placeholdercolor="#c4c3cb"
                            style={styles.description}
                            value={description}
                            multiline
                            numberOfLines={10}
                            onChangeText={(text) => setDescription(text)} />

                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => checkInput()}>
                            <Text style={styles.buttonText}>Edit Timeline</Text>
                        </TouchableOpacity>

                        {state.loading ? (
                            <ActivityIndicator style={{ paddingTop: 15 }} size="large" color="#00bcd4" />
                        ) : null
                        }

                        {state.errors &&
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>{state.errors}</Text>
                            </View>
                        }

                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
    },
    loginScreenContainer: {
        flex: 1,
    },
    logoText: {
        fontSize: 20,
        fontWeight: "800",
        marginTop: 50,
        marginBottom: 30,
        textAlign: 'center',
    },
    loginFormView: {
        flex: 1
    },
    loginFormTextInput: {
        height: 43,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
    },
    description: {
        height: 150,
        fontSize: 14,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 25,

    },
    loginButton: {
        backgroundColor: '#3897f1',
        borderRadius: 5,
        height: 45,
        marginTop: 50,
        width: '90%'
    },
    fbLoginButton: {
        height: 45,
        marginTop: 10,
        backgroundColor: 'transparent',
    },

    buttonContainer: {
        height: 45,
        justifyContent: 'center',
        marginBottom: 20,
        borderRadius: 30,
        backgroundColor: "#3498db",
        alignItems: 'center',
        alignSelf: 'center',
        padding: 20,
        width: 200
    },
    buttonText: {
        color: '#FFF'
    },
    errorContainer: {
        alignItems: "center",
        padding: 10
    },
    errorText: {
        fontWeight: 'bold',
        color: '#ff3d00'
    }
})

export default TimelineEditScreen;