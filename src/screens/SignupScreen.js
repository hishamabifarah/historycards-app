import React, { useContext, useState } from 'react'
import { Context as AuthContext } from "../context/authContext";
import { theme } from '../constants'
import NavLink from '../navigation/NavLink';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { NavigationEvents } from 'react-navigation';


import {
    Text,
    StyleSheet,
    TextInput,
    View,
    Dimensions,
    TouchableOpacity,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const SignupScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [handle, setHandle] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { state, signup, clearErrorMessage } = useContext(AuthContext);

    const onFocus = () => {
        clearErrorMessage();
    }
    return (

        <KeyboardAvoidingView style={styles.container}>
            <NavigationEvents
                onWillBlur={clearErrorMessage}
            />
            <View styles={styles.logoContainer}>
                <HideWithKeyboard>
                    <Text style={styles.logo}>History Cards</Text>
                    <Text style={styles.title}>
                        Where History is never forgotten
                </Text>
                </HideWithKeyboard>
            </View>
            <View style={styles.buttonsContainer}>
                <View>
                    <Icon style={styles.inputIcon} name={'mail-outline'} size={24} color={'rgb(255,255,255,0.7)'} />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType={"email-address"}
                        returnKeyType="next"
                        onFocus= {() => onFocus()}
                    />
                    {
                        state.errors.email
                            ? <Text style={styles.error} >{state.errors.email}</Text>
                            : null
                    }

                </View>
                <View>
                    <Icon style={styles.inputIcon} name={'lock-outline'} size={24} color={'rgb(255,255,255,0.7)'} />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        style={styles.input}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                        returnKeyType="go"
                        onFocus= {() => onFocus()}
                    />
                    {
                        state.errors.password
                            ? <Text style={styles.error}>{state.errors.password}</Text>
                            : null
                    }
                </View>

                {/* CONFIRM PASSWORD */}
                <View>
                    <Icon style={styles.inputIcon} name={'lock-outline'} size={24} color={'rgb(255,255,255,0.7)'} />
                    <TextInput
                        placeholder="Confirm Password"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        style={styles.input}
                        secureTextEntry={true}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        returnKeyType="go"
                        onFocus= {() => onFocus()}
                    />
                </View>

                {/* USERNAME */}
                <View>
                    <Icon style={styles.inputIcon} name={'person-outline'} size={24} color={'rgb(255,255,255,0.7)'} />
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        style={styles.input}
                        value={handle}
                        onChangeText={setHandle}
                        returnKeyType="go"
                        onFocus= {() => onFocus()}
                    />
                    {
                        state.errors.handle
                            ? <Text style={styles.error}>{state.errors.handle}</Text>
                            : null
                    }
                </View>

                <TouchableOpacity
                    onPress={() => signup({ email, password, confirmPassword, handle })}
                    style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>SIGNUP</Text>
                </TouchableOpacity>

                {state.loading ? (
                    <ActivityIndicator style={{ paddingTop: 7 }} size="small" color="white" />
                ) : null
                }

                <NavLink routeName="Signin" text="Already have an account? Sign In" />
            </View>
        </KeyboardAvoidingView>
    )
};

SignupScreen.navigationOptions = {
    headerShown: false
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        marginTop: (HEIGHT / 2) - 150
    },
    title: {
        opacity: 0.9,
        color: '#FFF',
        marginTop: 5,
        fontSize: 18,
        fontStyle: "italic"
    },
    buttonsContainer: {
        justifyContent: 'flex-end',
        marginBottom: 36,
        flex: 1
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15,
        marginTop: 10,
        width: WIDTH - 55
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700',
        letterSpacing: 2
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10,
        fontSize: 16,
        fontWeight: '600',
        paddingLeft: 40
    },
    inputIcon: {
        position: 'absolute',
        top: 6,
        left: 4,
        color: '#FFF',
        opacity: 0.7
    },
    error:{
        color: theme.colors.secondary,
        position: 'absolute',
        right:5,
        top: 11
    }

});
export default SignupScreen;