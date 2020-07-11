import createDataContext from '../context/createDataContext';
import historyCardsApi from '../api/historyCardsApi';

const timelineReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TIMELINES':
            console.log('context timelines' , action.payload.timelines);
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
                    timelines: [ ...action.payload.timelines , ...state.timelines ],
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

        case 'SET_FAVORITES':
            return {
                ...state,
                favorites: action.payload,
                loading: false
            };

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
}

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
}

const clearCards = (dispatch) => () => {
    dispatch({ type: 'CLEAR_TIMELINE_CARDS' })
}

export const { Provider, Context } = createDataContext(
    timelineReducer,
    { getTimelines, getTimelineCards, getTimelineFavorites, clearCards },
    {
        errors: [],
        loading: true,
        timelines: [],
        favorites: [],
        cards: []
    }
);