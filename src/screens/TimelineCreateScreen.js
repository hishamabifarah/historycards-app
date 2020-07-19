import React, { useState, useContext } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, TextInput, Button , ScrollView , ActivityIndicator} from 'react-native';
import { Context as TimelineContext } from "../context/timelinesContext";

const TimelineCreateScreen = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const { state , addNewTimeline } = useContext(TimelineContext);
    console.log('state' , state.loading);
    
    return (

        <ScrollView>
            <Text style={styles.label}>Title: </Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={(text) => setTitle(text)} />

            <Text style={styles.label}>Description: </Text>
            <TextInput
                style={styles.inputMultiLine}
                value={description}
                multiline
                numberOfLines={8}
                onChangeText={(text) => setDescription(text)} />

            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => addNewTimeline({ title, description })}>
                <Text style={styles.buttonText}>Create Timeline</Text>
            </TouchableOpacity>

            {state.loading ? (
                    <ActivityIndicator style={{ paddingTop: 7 }} size="small" color="white" />
                ) : null
                }

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
        padding: 5
    },

    label: {
        fontSize: 18,
        marginBottom: 4,
        marginLeft: 4
    },
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
})

export default TimelineCreateScreen;