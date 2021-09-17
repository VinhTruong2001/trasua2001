import * as types from '../constants/ActionType'

export const actfetchProducts = (products) => {
    return {
        type: types.FETCH_PRODUCTS,
        products
    }
}

export const actfetchNews = (news) => {
    return {
        type: types.FETCH_NEWS,
        news
    }
}