// REACT
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { StatusBar } from 'react-native';
// SCREENS
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SplashScreen from './src/screens/SplashScreen';
import TimelinesHomeScreen from './src/screens/TimelinesHomeScreen';
import TimelineCreateScreen from './src/screens/TimelineCreateScreen';
import TimelineEditScreen from './src/screens/TimelineEditScreen';
import TimelineFavoritesScreen from './src/screens/TimelineFavoritesScreen';
import TimelineListAllScreen from './src/screens/TimelineListAllScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import ProfileEditDetailsScreen from './src/screens/ProfileEditDetailsScreen';
import TimelineAddImageScreen from './src/screens/TimelineAddImageScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import TimelineDetailScreenByID from './src/screens/TimelineDetailScreenByID';
import CardsCreateScreen from './src/screens/CardsCreateScreen';
import TimelineListAllCardsScreen from './src/screens/TimelineListAllCardsScreen';
import TimelineEditCardScreen from './src/screens/TimelineEditCardScreen';

// CONTEXT
import { Provider as AuthProvider } from './src/context/authContext';
import { Provider as TimelineProvider } from './src/context/timelinesContext';
// NAVIGATION 
import { setNavigator } from './src/navigation/navigationRef';
import Icon from 'react-native-vector-icons/Ionicons';
// FONTS & ICONS 
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  Splash: SplashScreen,

  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen,
    Splash: SplashScreen
  }),
  mainFlow: createBottomTabNavigator({
    timelineFlow: createStackNavigator({
      TimelinesHome: TimelinesHomeScreen, 
      TimelineEdit: {
        screen: TimelineEditScreen,
        navigationOptions:{
          title: 'Edit Timeline'
        }
      },
      Notifications: NotificationsScreen,
      TimelineDetailScreenByID: {
        screen: TimelineDetailScreenByID,
        navigationOptions: {
          title: 'Timeline Detail',
          headerTintColor: '#FFF',
          headerStyle: {
              backgroundColor: '#3498db'
          },
          color: '#000',
        }
      },
      TimelineCreate: {
        screen: TimelineCreateScreen,
        navigationOptions: {
          title: 'New Timeline'
        }
      },
      TimelineAddImage: {
        screen: TimelineAddImageScreen,
        navigationOptions: {
          title: 'New Timeline Image'
        }
      },
      TimelineListAll: {
        screen: TimelineListAllScreen,
        navigationOptions: {
          title: 'Timelines'
        }
      },
      TimelineListAllCards:{
        screen: TimelineListAllCardsScreen,
        navigationOptions: {
          title: 'Timeline Cards'
        }
      },
      ProfileEditDetails: {
        screen: ProfileEditDetailsScreen,
        navigationOptions: {
          title: 'Edit Profile'
        }
      },
      CardsCreate:{
        screen: CardsCreateScreen,
        title: 'Create New Card'
      },
      TimelineEditCard : {
        screen: TimelineEditCardScreen,
        title: 'Edit Card'
      },
    }, {
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-home" color={tintColor} size={25} />
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
  let [fontsLoaded] = useFonts({
    Roboto: require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    ...Ionicons.font,
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <TimelineProvider>
        <AuthProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#3498db"
          />
          <App ref={(navigator) => setNavigator(navigator)} />
        </AuthProvider>
      </TimelineProvider>
    );
  }
};