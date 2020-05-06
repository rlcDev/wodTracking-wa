
import { OPEN_MODAL, CLOSE_MODAL, UPDATE_TYPE, UPDATE_TIME, UPDATE_DATE, UPDATE_METCON, UPDATE_RESULT, UPDATE_COMMENT, RESET_ALL } from '../actions/modal';

const initialState = {
    show: false,
    date: new Date(),
    wodType: 'Select',
    time: '',
    metcon: '',
    result: '',
    comment: ''
}

const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            if (action.item.edition) {
                return {
                    ...state, wodType: action.item.wodType, date: action.item.date, time: action.item.time,
                    metcon: action.item.metcon, result: action.item.result, comment: action.item.comment, id: action.item.id, show: true
                }
            } else {
                return { ...state, show: true }
            }
        case CLOSE_MODAL:
            return { ...state, show: false }
        case UPDATE_TYPE:
            return { ...state, wodType: action.wodType }
        case UPDATE_DATE:
            return { ...state, date: action.date }
        case UPDATE_TIME:
            return { ...state, time: action.time }
        case UPDATE_METCON:
            return { ...state, metcon: action.metcon }
        case UPDATE_RESULT:
            return { ...state, result: action.result }
        case UPDATE_COMMENT:
            return { ...state, comment: action.comment }
        case RESET_ALL:
            return initialState
        default:
            return state
    }
}

export default modalReducer
