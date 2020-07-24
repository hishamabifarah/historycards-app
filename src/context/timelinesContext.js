import createDataContext from '../context/createDataContext';
import historyCardsApi from '../api/historyCardsApi';
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigation/navigationRef';

const timelineReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING_DATA_UI':
            return { ...state, loading: true }
        case 'SET_TIMELINES':
            //  console.log('context timelines' , action.payload.timelines);
            if (action.payload.page === 1) {
                return {
                    ...state,
                    timelines: action.payload.timelines,
                    pageCount: action.payload.pageCount,
                    page: action.payload.page,
                    loading: false
                };
            } else {
                return {
                    ...state,
                    timelines: [...action.payload.timelines, ...state.timelines],
                    pageCount: action.payload.pageCount,
                    page: action.payload.page,
                    loading: false
                }
            }

        case 'SET_TIMELINE':
            return {
                ...state,
                cards: action.payload,
                loading: false
            };

        case 'SET_TIMELINE_DETAILS':
            return {
                ...state,
                timeline: action.payload.timeline,
                cards: action.payload,
                loading: false
            };

        case 'POST_TIMELINE': {
            return {
                ...state,
                timelines: [action.payload, ...state.timelines],
                loading: false
            };
        }

        case 'SET_FAVORITES':
            return {
                ...state,
                favorites: action.payload,
                loading: false
            };

        case 'UPLOAD_IMAGE_TIMELINE':
            let indexUpdateImage = state.timelines.findIndex((timeline) => timeline.timelineId === action.payload.timelineId);

            state.timelines[indexUpdateImage].imageUrl = action.payload.image

            return {
                ...state
            };
        case 'SET_ACTIVITIES':
                return {
                    ...state,
                    activities: action.payload,
                    loading: false
                }

        case 'CLEAR_TIMELINE_CARDS':
            return { cards: [] };
        // case 'LOADING_DATA':
        //     return { ...state, loading: true }
        default:
            return state;
    }
};

const getTimelines = (dispatch) => async (page) => {
    // dispatch({ type: 'LOADING_DATA' });
    console.log('page in context: ', page);
    try {
        const response = await historyCardsApi.get(`/timelinesp/${page}`)
        dispatch({
            type: 'SET_TIMELINES',
            payload: response.data
        })
    } catch (err) {
        // handle state with errors
        console.log('error getting timelines: ', err)
    }
};

const getRecentActivities = (dispatch) => async () => {
    try {
        const response = await historyCardsApi.get('/activity');
        dispatch({
            type: 'SET_ACTIVITIES',
            payload: response.data
        })
    } catch (err) {
        // handle state with errors
        console.log('error getting activity: ', err)
    }
};

const getTimelineFavorites = dispatch => async (handle) => {
    try {
        const response = await historyCardsApi.get(`/user/favorites/${'hisham'}`);
        console.log('res data', response.data);
        dispatch({
            type: 'SET_FAVORITES',
            payload: response.data.timelines
        })
    } catch (err) {
        console.log('err favorites', err);
    }
};

const getTimelineById = dispatch => async (id) => {
    try {
        const response = await historyCardsApi.get(`/timelinep/${id}/1`);
        dispatch({
            type: 'SET_TIMELINE_DETAILS',
            payload: response.data
        })
    } catch (err) {
        // handle state with errors
        console.log('error getting timeline cards: ', err)
    }
};

const getTimelineCards = dispatch => async (id) => {
    try {
        const response = await historyCardsApi.get(`/timelinep/${id}/1`);
        dispatch({
            type: 'SET_TIMELINE',
            payload: response.data.timeline.cards
        })
    } catch (err) {
        // handle state with errors
        console.log('error getting timeline cards: ', err)
    }
};

const addNewTimeline = dispatch => async ({ title, description }) => {
    dispatch({ type: 'LOADING_DATA_UI' })
    const token = await AsyncStorage.getItem('token');

    const newTimeline = {
        "title": title,
        "description": description,
        "imageUrl": ''
    };

    try {
        const response = await historyCardsApi.post('/timeline', newTimeline, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: 'POST_TIMELINE',
            payload: response.data.resTimeline
        })

        navigate('TimelineAddImage', {
            title: response.data.resTimeline.title,
            description: response.data.resTimeline.description,
            id: response.data.resTimeline.id
        });

    } catch (err) {
        console.log('err adding new timeline ', err);
    }
};

const uploadImageTimeline = dispatch => async ({ timelineId, image }) => {
    dispatch({ type: 'LOADING_DATA_UI' })
    const token = await AsyncStorage.getItem('token');

    const formData = new FormData();
    formData.append("detectImg", {
        uri: image.uri,
        name: "image",
        type: "image/jpg",
    });


    formData.append('image', image, 'name');

    try {
        // const response = await historyCardsApi.post(`/timeline/${timelineId}/image`, formData, {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     }
        // });

        const response = await fetch(`/timeline/${timelineId}/image`, {
            method: "POST",
            headers: {
                 "Content-Type": "multipart/form-data",
            },
            body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    

        dispatch({
            type: 'UPLOAD_IMAGE_TIMELINE',
            payload: response.data.resTimeline
        })

        navigate('TimelinesHome')

    } catch (err) {
        console.log('err adding new timeline ', err);
    }
}

const clearCards = (dispatch) => () => {
    dispatch({ type: 'CLEAR_TIMELINE_CARDS' })
}

export const { Provider, Context } = createDataContext(
    timelineReducer,
    { 
        getTimelines, getTimelineCards, getTimelineFavorites, clearCards, 
        addNewTimeline, uploadImageTimeline, getRecentActivities , getTimelineById
    },
    {
        errors: [],
        loading: true,
        timelines: [],
        favorites: [],
        cards: [],
        activities : [],
        timeline : {}
    }
);