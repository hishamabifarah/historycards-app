import createDataContext from '../context/createDataContext';
import historyCardsApi from '../api/historyCardsApi';
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigation/navigationRef';

const timelineReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING_DATA_UI':
            return { ...state, loading: true }

        case 'SET_TIMELINES':
            if(action.payload !== null){
            if (action.payload.page === 1) {
                return {
                    ...state,
                    timelines: action.payload.timelines,
                    pageCount: action.payload.pageCount,
                    page: action.payload.page,
                    loading: false,
                    errors: []
                };
            } else {
                return {
                    ...state,
                    timelines: [...state.timelines, ...action.payload.timelines],
                    pageCount: action.payload.pageCount,
                    page: action.payload.page,
                    loading: false,
                    errors: []
                }
            }
        }else{
            return {
                ...state,
                errors: "Error retrieving timelines, please try again",
                loading: false
            }
        }
        
        case 'SET_TIMELINE':
            if (action.payload === 'paginateError' || action.payload === null) {
                return {
                    ...state,
                    errorsPaginateTimeline: 'Error retrieving timeline cards, please try again',
                    loading: false
                }
            }

            if (action.payload !== null) {
                if (action.payload.page === 1) {
                    return {
                        ...state,
                        loading: false,
                        hasMoreCards: action.payload.page === action.payload.pageCount ? false : true,
                        totalRecordsCards: action.payload.totalRecords,
                        pageCards: action.payload.page,
                        pageCountCards: action.payload.pageCount,
                        status: action.payload.status,
                        timeline: action.payload.timeline,
                        errorsMainTimeline: '',
                        errorsPaginateTimeline: '',
                        cards: action.payload.timeline.cards
                    };
                } else {
                    state.timeline.cards.filter((card, index) => {
                        for (let i = 0; i < action.payload.timeline.cards.length; i++) {
                            if (card.cardId === action.payload.timeline.cards[i].cardId) {
                                action.payload.timeline.cards.splice(i, 1);
                            } else {

                            }
                        }
                    })
                    return {
                        ...state,
                        loading: false,
                        hasMoreCards: action.payload.page === action.payload.pageCount ? false : true,
                        totalRecordsCards: action.payload.totalRecords,
                        pageCards: action.payload.page,
                        pageCountCards: action.payload.pageCount,
                        status: action.payload.status,
                        errorsMainTimeline: '',
                        errorsPaginateTimeline: '',
                        cards: [...state.timeline.cards, ...action.payload.timeline.cards],
                        timeline:
                            Object.assign(
                                state.timeline,
                                {},
                                {
                                    cards: [...state.timeline.cards, ...action.payload.timeline.cards]
                                })
                    }
                }
            }
            else {
                return {
                    ...state,
                    errorsMainTimeline: 'Retrieving timeline, please try again',
                    errorsPaginateTimeline: '',
                    loading: false
                }
            }


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
                loading: false,
                errors: []
            };
        }
        case 'ADD_TIMELINE_ERROR' :
                return {
                    ...state,
                    loading: false,
                    errors: "Error adding timeline, plz try again"
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
        default:
            return state;
    }
};

const getTimelines = (dispatch) => async (page) => {
    try {
        const response = await historyCardsApi.get(`/timelinesp/${page}`)
        dispatch({
            type: 'SET_TIMELINES',
            payload: response.data
        })
    } catch (err) {
        dispatch({
            type: 'SET_TIMELINES',
            payload: null
        })
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
        // console.log('res data', response.data);
        dispatch({
            type: 'SET_FAVORITES',
            payload: response.data.timelines
        })
    } catch (err) {
        console.log('err favorites', err);
    }
};

const getTimelineById = dispatch => async (id, page) => {
    dispatch({ type: 'LOADING_DATA_UI' })
    try {
        const response = await historyCardsApi.get(`/timelinep/${id}/${page}`);
        dispatch({
            type: 'SET_TIMELINE_DETAILS',
            payload: response.data
        })
        dispatch({ type: 'STOP_LOADING_DATA_UI' })
    } catch (err) {
        // handle state with errors
        console.log('error getting timeline cards: ', err)
    }
};

const getTimelineCards = dispatch => async (id , page) => {
    // console.log('page in context cards' , page);
    dispatch({ type: 'LOADING_DATA_UI' })
    try {
        const response = await historyCardsApi.get(`/timelinep/${id}/${page}`);
        dispatch({
            type: 'SET_TIMELINE',
            payload: response.data
        })
        // console.log('getTimelineCards response ' , response.data)
        dispatch({ type: 'STOP_LOADING_DATA_UI' })
    } catch (err) {
        dispatch({
            type: 'SET_TIMELINE',
            payload: null
        })
    }
};

const addNewTimeline = dispatch => async ({ title, description }) => {
    console.log('adding new timeline');
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
        dispatch({
            type : 'ADD_TIMELINE_ERROR',
            payload: null
        })
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


export const { Provider, Context } = createDataContext(
    timelineReducer,
    {
        getTimelines, getTimelineCards, getTimelineFavorites,
        addNewTimeline, uploadImageTimeline, getRecentActivities, getTimelineById
    },
    {
        errors: [],
        loading: true,
        timelines: [],
        favorites: [],
        cards: [],
        activities: [],
        timeline: {},
        errorsMainTimeline: '',
        errorsPaginateTimeline: ''
    }
);