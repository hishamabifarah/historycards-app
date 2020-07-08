import React from 'react'
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { theme } from '../constants';

const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View styles={styles.logoContainer}>
                <Text style={styles.logo}>History Cards</Text>
                <Text style={styles.title}>
                    Where History is never forgotten
                </Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => { navigation.navigate('Signin') }} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('Signup') }} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>SIGNUP</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('mainFlow') }} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>CHECK INSIDE</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
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
        marginTop: (HEIGHT / 2) - 120
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
    }
});

export default SplashScreen;