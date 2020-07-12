import React from 'react'
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { theme } from '../../constants';
import { withNavigation } from 'react-navigation';
const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');

const NotLoggedIn = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => { navigation.navigate('Signin') }} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('Signup') }} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>SIGNUP</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('TimelinesHome') }} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>HOME</Text>
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

export default withNavigation (NotLoggedIn);