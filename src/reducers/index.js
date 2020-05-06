import {combineReducers} from 'redux';
import wodReducer from './wodReducer';
import modalReducer from './modalReducer';


export default combineReducers({
    wodReducer,
    modalReducer
})