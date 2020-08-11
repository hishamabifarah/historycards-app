import React, { useState, useContext } from 'react'
import {
    Text, StyleSheet, View, TouchableOpacity, TextInput,
    ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback,
    Alert, Keyboard
} from 'react-native';
import { Context as TimelineContext } from "../context/timelinesContext";
import DatePicker from 'react-native-datepicker';

const TimelineEditCard = ({ navigation }) => {

    const [title, setTitle] = useState(navigation.getParam('title'));
    const [body, setBody] = useState(navigation.getParam('body'));
    const [source, setSource] = useState(navigation.getParam('source'));
    // const [cardDate, setCardDate] = useState(navigation.getParam('cardDate'));
    const [cardDate, setCardDate] = useState(new Date());
    const [timelineId] = useState(navigation.getParam('timelineId'));
    const [cardId] = useState(navigation.getParam('cardId'));
    const { state, editTimelineCard } = useContext(TimelineContext);

    const handleChange = cardDate => setDate(cardDate);

    const checkInput = () => {
        if (title.trim().length === 0) {
            Alert.alert('Please Enter Title');
        } else if (body.trim().length === 0) {
            Alert.alert('Please Enter Description');
        } else if (source.trim().length === 0) {
            Alert.alert('Please Enter Source');
        }
        else {
            editTimelineCard({ timelineId, cardId , title, body , cardDate, source });
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
                            value={body}
                            multiline
                            numberOfLines={10}
                            onChangeText={(text) => setBody(text)} />

                        <TextInput
                            placeholder="Source"
                            placeholdercolor="#c4c3cb"
                            style={styles.loginFormTextInput}
                            value={source}
                            onChangeText={(text) => setSource(text)} />

                        <DatePicker
                            style={styles.datepicker}
                            date={cardDate}
                            selected={cardDate}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            minDate="0001-01-01"
                            maxDate="4000-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={handleChange} />

                        <TouchableOpacity
                            style={styles.buttonContainer}
                            disabled={state.loading}
                            onPress={() => checkInput()}>
                            <Text style={styles.buttonText}>Edit Card</Text>
                        </TouchableOpacity>

                        {state.loading ? (
                            <ActivityIndicator style={{ paddingTop: 10 }} size="large" color="#00bcd4" />
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
        marginTop: 20,
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
    },
    datepicker: {
        width: 300,
        alignSelf: 'center',
        marginRight: 15,
        marginTop: 5,
        marginBottom: 20
    }
})

export default TimelineEditCard;