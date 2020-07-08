import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SplashScreen from './src/screens/SplashScreen';
import TimelinesHomeScreen from './src/screens/TimelinesHomeScreen';
import TimelineCreateScreen from './src/screens/TimelineCreateScreen';
import TimelineEditScreen from './src/screens/TimelineEditScreen';
import TimelineDetailsScreen from './src/screens/TimelineDetailsScreen';
import TimelineFavoritesScreen from './src/screens/TimelineFavoritesScreen';

import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import { Provider as AuthProvider } from './src/context/authContext';
import { Provider as TimelineProvider } from './src/context/timelinesContext';
import { setNavigator } from './src/navigation/navigationRef';

import Icon from 'react-native-vector-icons/Ionicons';  

const switchNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen,
    Splash: SplashScreen
  }),
  mainFlow: createBottomTabNavigator({
    timelineFlow: createStackNavigator({
      TimelinesHome:TimelinesHomeScreen,
      TimelineDetail: TimelineDetailsScreen,
      TimelineEdit: TimelineEditScreen,
      TimelineCreate: TimelineCreateScreen
    },{
      navigationOptions:{
        tabBarLabel:'Home',  
        tabBarIcon:({tintColor})=>(  
            <Icon name="ios-home" color={tintColor} size={25}/>  
        )  
      }
    }),
    TimelineFavorites: {
      screen: TimelineFavoritesScreen,
      navigationOptions: {
        tabBarLabel: 'Favorites',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-bookmark" color={tintColor} size={25} />
        )
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-person" color={tintColor} size={25} />
        )
      }
    }
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <TimelineProvider>
      <AuthProvider>
        <App ref={(navigator) => setNavigator(navigator)} />
      </AuthProvider>
    </TimelineProvider>
  );
};