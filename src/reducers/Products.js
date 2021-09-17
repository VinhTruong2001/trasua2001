import * as types from '../constants/ActionType'

const initState = [];

const products = (state = initState, action) => {
    switch (action.type) {
        case types.FETCH_PRODUCTS:
            state = action.products
            return [...state];
        default:
            return [...state];
    }
}

export default products;