import createDataContext from '../context/createDataContext';
import historyCardsApi from '../api/historyCardsApi';
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigation/navigationRef';
import { Keyboard } from 'react-native'

const authReducer = (state, action) => {
    switch (action.type) {
        case 'signup':
            return { errors: [], token: action.payload, loading: false };
        case 'signin':
            return { errors: [], token: action.payload, loading: false };
        case 'signout':
            return { token: null, errors: [], loading: false };
        case 'SET_USER_DETAILS':
            return { userDetails: action.payload.user };
        case 'clear_error_messages':
            return { ...state, errors: [], loading: false };
        case 'loading_UI':
            return { ...state, loading: true }
        case 'signup_error':
            return { ...state, errors: action.payload, loading: false };
        case 'signin_error':
            return { ...state, errors: action.payload, loading: false };
        default:
            return state;
    }
};

const signup = (dispatch) => async ({ email, password, confirmPassword, handle }) => {
    Keyboard.dismiss();

    dispatch({
        type: 'loading_UI'
    });

    try {
        const newUserData = {
            "email": email,
            "password": password,
            "confirmPassword": confirmPassword,
            "handle": handle
        };
        console.log('newUserData: ', newUserData);
        const response = await historyCardsApi.post('/signup', newUserData);
        await AsyncStorage.setItem('token', response.data.tokenId);
        dispatch({
            type: 'signup',
            payload: response.data.tokenId
        })

        navigate('mainFlow');

    } catch (err) {
        console.log('err: ', err.response.data);
        dispatch({
            type: 'signup_error',
            payload: err.response.data
        })
    };
};

const signin = (dispatch) => async ({ email, password }) => {
    Keyboard.dismiss();
    dispatch({
        type: 'loading_UI'
    });

    try {
        const response = await historyCardsApi.post('/login', { email, password })
        await AsyncStorage.setItem('token', response.data.token);

        getUserData(response.data.token);

        dispatch({
            type: 'signin',
            payload: response.data.token
        });

        navigate('mainFlow');

    } catch (err) {
        console.log('err: ', err.response.data);
        dispatch({
            type: 'signin_error',
            payload: err.response.data
        });
    }
};

const updateUserDetails = (dispatch) => async ({ facebook, twitter , website , location , bio }) => {
   
    Keyboard.dismiss();
    const token = await AsyncStorage.getItem('token');

    const newUserData = {
        "facebook": facebook ? facebook: '',
        "twitter": twitter ? twitter: '',
        "website": website ? website: '',
        "location": location ? location: '',
        "bio" : bio ? bio: '',
    };
    
    // console.log('res data' , newUserData);
    // dispatch({
    //     type: 'loading_UI'
    // });

    try {
        await historyCardsApi.post('/user', newUserData , {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        getUserData(token);
        navigate('Profile');

    } catch (err) {
        console.log('err: ', err);
        
        // dispatch({
        //     type: 'signin_error',
        //     payload: err.response.data
        // });
    }
};

const signout = dispatch => async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    // navigate('loginFlow');
    navigate('Splash');
};

const tryLocalSignin = () => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        // dispatch({ type: 'signin', payload: token });
        navigate('TimelinesHome');
    } else {
        navigate('Splash');
    }
};

// get user data when he first signs in or signs up
// likes, notifications..

const getUserData = async (token) => {
    try {
        const res = await historyCardsApi.get('/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        await AsyncStorage.setItem('handle', res.data.credentials.handle);

    } catch (err) {
        //todo: handle error
        console.log('err get user data', err);
    }
}

const tryLocalProfile = (dispatch) => async () => {

    const token = await AsyncStorage.getItem('token');
    if (!token) {
        navigate('Splash');
    } else {
        try {
            const handle = await AsyncStorage.getItem('handle');
            const response = await historyCardsApi.get(`/user/${handle}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: 'SET_USER_DETAILS',
                payload: response.data
            })

        } catch (err) {
            //todo: handle error
            console.log('err', err)
        }
    }
}

const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_messages' })
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signin, signout, signup, clearErrorMessage, tryLocalSignin, tryLocalProfile , updateUserDetails },
    {
        errors: [],
        token: null,
        loading: false,
        userDetails: {}
    }
);