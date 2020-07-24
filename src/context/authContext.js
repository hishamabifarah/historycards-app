import createDataContext from '../context/createDataContext';
import historyCardsApi from '../api/historyCardsApi';
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigation/navigationRef';
import { Keyboard } from 'react-native'

const authReducer = (state, action) => {
    switch (action.type) {
        case 'signup':
            return { errors: [], token: action.payload, loading: false , authenticated: true };
        case 'signin':
            return { errors: [], token: action.payload, loading: false, authenticated: true };
        case 'signout':
            return { token: null, errors: [], loading: false, authenticated : false };
        case 'SET_USER_DETAILS':
            return { userDetails: action.payload.user , authenticated : true };
        case 'clear_error_messages':
            return { ...state, errors: [], loading: false };
        case 'loading_UI':
            return { ...state, loading: true }
        case 'stop_loading_UI':
            return { ...state, loading: false }
        case 'signup_error':
            return { ...state, errors: action.payload, loading: false };
        case 'signin_error':
            return { ...state, errors: action.payload, loading: false };
        case 'set_authenticated':
            return { ...state, authenticated: true }
        case 'set_user':
            return { ...state ,  notifications: action.payload.notifications , authenticated: true , ...action.payload }
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

        // console.log('newUserData: ', newUserData);
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

        dispatch({
            type: 'signin',
            payload: response.data.token
        });

        console.log('getting user data in signin ()');
        // getUserData(response.data.token);
        try {
            const res = await historyCardsApi.get('/user', {
                headers: {
                    'Authorization': `Bearer ${response.data.token}`
                }
            });

            await AsyncStorage.setItem('handle', res.data.credentials.handle);

            dispatch({
                type: 'set_user',
                payload: res.data
            });

        } catch (err) {
            //todo: handle error
            console.log('err get user data in sign in ', err);
        }

        navigate('mainFlow');

    } catch (err) {
        console.log('err: ', err.response.data);
        dispatch({
            type: 'signin_error',
            payload: err.response.data
        });
    }
};

const updateUserDetails = (dispatch) => async ({ facebook, twitter, website, location, bio }) => {

    Keyboard.dismiss();

    dispatch({ type: 'loading_UI' });

    const token = await AsyncStorage.getItem('token');

    const newUserData = {
        "facebook": facebook ? facebook : '',
        "twitter": twitter ? twitter : '',
        "website": website ? website : '',
        "location": location ? location : '',
        "bio": bio ? bio : '',
    };

    console.log('upading user details with ', JSON.stringify(newUserData));

    try {
        await historyCardsApi.post('/user', newUserData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        getUserData(token);
        dispatch({ type: 'stop_loading_UI' });
        navigate('Profile');

    } catch (err) {
        console.log('err: ', err);
        if (err === 'Error: Request failed with status code 403') {
            console.log('error 403');
        }
        dispatch({ type: 'stop_loading_UI' });
    }
};

const signout = dispatch => async () => {
    console.log('signout() started');
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
    navigate('Splash');
};

const tryLocalSignin = (dispatch) => async () => {
    console.log('tryLocalSignin() started');
    const token = await AsyncStorage.getItem('token');
    if (token) {
        // copied  getUserData() here because couldn't get getUserData() to be called with dispatch 
       
        try {
            const res = await historyCardsApi.get('/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

           console.log('tryLocalSignin user data' , res.data);

            await AsyncStorage.setItem('handle', res.data.credentials.handle);

            dispatch({
                type: 'set_user',
                payload: res.data
            });

        } catch (err) {
            //todo: handle error
            console.log('err get user data in tryLocalSign()', err);
            await AsyncStorage.removeItem('token');
            dispatch({ type: 'signout' });
            navigate('Splash');
        }
   
        dispatch({ type: 'set_authenticated' });
        navigate('TimelinesHome');
    } else {
        navigate('Splash');
    }
};

// get user data when he first signs in or signs up or enters app
// likes, notifications..

// const getUserData = (dispatch) => async (token) =>  { // doesn't work with dispatch(getUserData()) or getUserData()
const getUserData = async (token) => {
    console.log('getUserData() started');
    try {
        const res = await historyCardsApi.get('/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('getUserData() data: ', res.data);

        await AsyncStorage.setItem('handle', res.data.credentials.handle);

        dispatch({
            type: 'set_user',
            payload: res.data
        })
    } catch (err) {
        //todo: handle error
        console.log('getUserData() err ', err);
    }
}

const tryLocalProfile = (dispatch) => async () => {
    console.log('tryLocalProfile() started');
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
    { signin, signout, signup, clearErrorMessage, tryLocalSignin, tryLocalProfile, updateUserDetails },
    {
        errors: [],
        token: null,
        loading: false,
        userDetails: {},
        authenticated: false,
        likes: [],
        notifications: []
    }
);