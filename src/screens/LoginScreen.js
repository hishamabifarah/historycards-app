import React, { useContext, useState } from 'react'
import { Context as AuthContext } from "../context/authContext";
import NavLink from '../navigation/NavLink';
// import Block from "../elements/Block";
// import Input from "../elements/Input";
// import Button from "../elements/Button";

import {  Block, Input } from "../elements";

import {
    Text,
    Button,
    StyleSheet,
    TextInput,
    View,
    ImageBackground,
    Image,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView
} from 'react-native';

import bgImage from '../../assets/images/background.jpg';
import logo from '../../assets/images/logo.png';

// destructure later
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/EvilIcons';

import { theme } from '../constants';
import LikeTimelineButton from '../components/LikeTimelineButton';
import DislikeTimelineButton from '../components/DislikeTimelineButton';

const { width: WIDTH } = Dimensions.get('window');

console.log(`width signup screen: ${WIDTH} `);

const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { state, signup, clearErrorMessage } = useContext(AuthContext);

    console.log("state", state);

    const hasErrors = key => (state.errors.includes(key) ? styles.hasErrors : null);

    return (
        <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text>
            Login
          </Text>
          <Block middle>
            <Input
              label="Email"
              error={hasErrors("email")}
              style={[styles.input, hasErrors("email")]}
              value={email}
              onChangeText={setEmail}
            />
            <Input
              secure
              label="Password"
              error={hasErrors("password")}
              style={[styles.input, hasErrors("password")]}
              defaultValue={password}
              onChangeText={setPassword}
            />
            <Button 
                title={"Login"}
                gradient 
                onPress={() => this.handleLogin()}>
              {state.loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Login
                </Text>
              )}
            </Button>

            <Button  title={"Forgot Password"} onPress={() => navigation.navigate("Forgot")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}
              >
                Forgot your password?
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
};

// LoginScreen.navigationOptions = {
//     header: null
// };

const styles = StyleSheet.create({
    login: {
        flex: 1,
        justifyContent: "center"
      },
      input: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth
      },
      hasErrors: {
        borderBottomColor: theme.colors.accent
      }
});

export default LoginScreen;