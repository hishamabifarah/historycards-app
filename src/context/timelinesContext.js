import createDataContext from '../context/createDataContext';
import historyCardsApi from '../api/historyCardsApi';

const timelineReducer = (state, action) => {
    switch (action.type) {
        // case 'LOADING_DATA':
        //     return { ...state, loading: true }
        case 'SET_TIMELINES':
            return { ...state, timelines: action.payload, loading: false }
        case 'SET_TIMELINE':
            return { ...state, cards: action.payload, loading: false }
        default:
            return state;
    }
};

const getTimelines = (dispatch) => async () => {
    // dispatch({ type: 'LOADING_DATA' });
    try {
        const response = await historyCardsApi.get('/timelinesp/1')
        dispatch({
            type: 'SET_TIMELINES',
            payload: response.data.timelines
        })
    } catch (err) {
        // handle state with errors
        console.log('error getting timelines: ', err)
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
}

export const { Provider, Context } = createDataContext(
    timelineReducer,
    { getTimelines, getTimelineCards },
    {
        errors: [],
        loading: true,
        timelines: []
    }
);