import createDataContext from '../context/createDataContext';
import historyCardsApi from '../api/historyCardsApi';
import { AsyncStorage } from 'react-native';
import { navigate } from '../navigation/navigationRef';

const timelineReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING_DATA_UI':
            return { ...state, loading: true }

        case 'SET_TIMELINES':
            if (action.payload !== null) {
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
            } else {
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
                console.log('final state in reducuer timeline', state);
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
        case 'ADD_TIMELINE_ERROR':
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

            case 'EDIT_TIMELINE': {
                let indexUpdate = state.timelines.findIndex((timeline) => timeline.timelineId === action.payload.resTimeline.timelineId);
                state.timelines[indexUpdate].title = action.payload.resTimeline.title
                state.timelines[indexUpdate].description = action.payload.resTimeline.description;
    
                return {
                    ...state,
                    loading: false 
                }
            }
        case 'SET_ACTIVITIES':
            return {
                ...state,
                activities: action.payload,
                loading: false
            }

        case 'LIKE_TIMELINE': {

            let index = state.timelines.findIndex((timeline) => timeline.timelineId === action.payload.timelineId);
            console.log('index reducer ', index)
           
            console.log('payload ', action.payload)

            console.log('state timeline', state.timeline)
            if (state.timelines[index].timelineId === action.payload.timelineId) {
                console.log('inside if')
                state.timelines[index] = action.payload;
            }

            return {
                ...state
            };
        }

        case 'UNLIKE_TIMELINE': {
            let index = state.timelines.findIndex(
                timeline => timeline.timelineId === action.payload.timelineId
            );
            state.timelines[index].likeCount = action.payload.likeCount;
            if (state.timeline.timelineId === action.payload.timelineId)
                state.timeline = { ...state.timeline, ...action.payload };
        }

        case 'FAVORITE_TIMELINE': {
            let index = state.timelines.findIndex((timeline) => timeline.timelineId === action.payload.timelineId);
            state.timelines[index] = action.payload;
            if (state.timeline.timelineId === action.payload.timelineId) {
                state.timeline = action.payload;
            }

            return {
                ...state
            };
        }

        case 'DELETE_TIMELINE': {
            let indexDelete = state.timelines.findIndex((timeline) => timeline.timelineId === action.payload);
            state.timelines.splice(indexDelete, 1);
            return {
                ...state
            };
        }

        case 'POST_CARD' : {
            if (!state.timeline.cards) {

                return {
                    ...state,
                    timeline: {
                        ...state.timeline,
                        cards: [action.payload]
                    },
                    errorLikeCards: '',
                    loading: false
                };
            } else {

                state.timeline.cards.unshift(action.payload);

                return {
                    ...state,
                    timeline: {
                        ...state.timeline,
                        cards: [...state.timeline.cards]
                    },
                    errorLikeCards: '',
                    loading: false
                };
        }
    };

    case 'ADD_CARD_ERROR':{
        return {
            ...state,
            loading: false
        }
    }

        default:
            return state;
    }
};

/*============================
    TIMELINES DATA ACTIONS
==============================*/

const getTimelines = (dispatch) => async (page) => {
    dispatch({ type: 'LOADING_DATA_UI' })
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

const getTimelineCards = dispatch => async (id, page) => {
    // console.log('page in context cards' , page);
    dispatch({ type: 'LOADING_DATA_UI' })
    try {
        const response = await historyCardsApi.get(`/timelinep/${id}/${page}`);
        dispatch({
            type: 'SET_TIMELINE',
            payload: response.data
        })
        console.log('getTimelineCards response ', response.data)
        dispatch({ type: 'STOP_LOADING_DATA_UI' })
    } catch (err) {
        dispatch({
            type: 'SET_TIMELINE',
            payload: null
        })
    }
};

// Add New Timeline
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
        dispatch({
            type: 'ADD_TIMELINE_ERROR',
            payload: null
        })
    }
};

// Upload timeline image
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

// Like a timeline
const likeTimeline = dispatch => async ({ timelineId }) => {
    console.log('timelineid in context', timelineId)
    try {
        const token = await AsyncStorage.getItem('token');
        const res = await historyCardsApi.get(`/timeline/${timelineId}/like`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: 'LIKE_TIMELINE',
            payload: res.data
        })

    } catch (err) {
        console.log('err like timeline ', err)
    }
};

// Unlike a timeline
// const unlikeTimeline = dispatch => async ({ timelineId }) => {
//     try {
//         const token = await AsyncStorage.getItem('token');
//         const res = await historyCardsApi.get(`/timeline/${timelineId}/unlike`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });

//         dispatch({
//             type: 'UNLIKE_TIMELINE',
//             payload: res.data
//         })

//     } catch (err) {
//         console.log('err unlike timeline ', err)
//     }
// };

// Favorite a timeline
const favoriteTimeline = dispatch => async ({ timelineId }) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const res = await historyCardsApi.post(`/timeline/${timelineId}/favorite`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: 'FAVORITE_TIMELINE',
            payload: res.data
        })

    } catch (err) {
        console.log('err favorite timeline ', err)
    }
};

// Unfavorite a timeline
const unfavoriteTimeline = dispatch => async ({ timelineId }) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const res = await historyCardsApi.post(`/timeline/${timelineId}/unfavorite`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: 'UNFAVORITE_TIMELINE',
            payload: res.data
        })

    } catch (err) {
        console.log('err unfavorite timeline ', err)
    }
};

// Edit a timeline
const editTimeline = dispatch => async ({timelineId, title, description}) => {
    dispatch({ type: 'LOADING_DATA_UI' })
    try {

        const editedTimeline = {
            "title": title,
            "description": description,
        };

        const token = await AsyncStorage.getItem('token');
        const res = await historyCardsApi.post(`/timeline/${timelineId}/edit`, editedTimeline , {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: 'EDIT_TIMELINE',
            payload: res.data
        });

        navigate('TimelineListAll');

    } catch (err) {
        console.log('err edit timeline ', err)
    }
};


// Delete a timeline
const deleteTimeline = dispatch => async ({ timelineId }) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const res = await historyCardsApi.delete(`/timeline/${timelineId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: 'DELETE_TIMELINE',
            payload: timelineId
        });

        navigate('TimelineListAll');

    } catch (err) {
        console.log('err unfavorite timeline ', err)
    }
};

/*============================
    CARDS DATA ACTIONS
==============================*/

const addTimelineCard = dispatch => async ({title, description, date , source , id}) => {
    console.log('add card id  ' , id);
    console.log('add card date  ' , date);
    dispatch({ type: 'LOADING_DATA_UI' })
    const token = await AsyncStorage.getItem('token');

    const newTimeline = {
        "title": title,
        "body": description,
        "cardDate": date,
        "source" : source
    };

    console.log('new Timeline' , newTimeline);

    try {
        const res = await historyCardsApi.post(`/timeline/${id}/comment`, newTimeline, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        dispatch({
            type: 'POST_CARD',
            payload: res.data
        })

        navigate('TimelineDetailScreenByID',
        {
            id: res.data.timelineId
        })

    } catch (err) {
        console.log('err add card' , err);
        dispatch({
            type: 'ADD_CARD_ERROR',
            payload: null
        })
    }

};


export const { Provider, Context } = createDataContext(
    timelineReducer,
    {
        getTimelines, getTimelineCards, getTimelineFavorites,
        addNewTimeline, uploadImageTimeline, getRecentActivities, getTimelineById,
        likeTimeline, favoriteTimeline, unfavoriteTimeline, deleteTimeline , editTimeline,
        addTimelineCard
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
        errorsPaginateTimeline: '',
        errorLikeCards: ''
    }
);