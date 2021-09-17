import { combineReducers } from "redux";
import products from './Products';
import news from './News'

const myReducer = combineReducers({
    products,
    news
});

export default myReducer;