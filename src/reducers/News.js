import * as types from '../constants/ActionType'

const initState = [];

const news = (state = initState, action) => {
    switch (action.type) {
        case types.FETCH_NEWS:
            state = action.news
            return [...state];
        default:
            return [...state];
    }
}

export default news;