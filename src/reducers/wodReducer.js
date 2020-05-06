import { SAVE_OR_MODIFY, REMOVE_WOD } from '../actions/wod'

const initialState = {
    wods: [],
}

let id = 0;

const wodReducer = (state = initialState, action) => {
    let wods;
    switch (action.type) {
        case SAVE_OR_MODIFY:
            wods = state.wods.slice();
            if (action.item.hasOwnProperty('id')) {
                const modifyIndex = wods.findIndex(i => i.id === action.item.id);
                wods[modifyIndex] = action.item
                return { ...state, wods: wods }

            } else {
                const newItem = { ...action.item, id: id++ }
                wods.splice(newItem.id, 0, newItem)
                return { ...state, wods: wods }
            }

        case REMOVE_WOD:
            wods = state.wods.slice();
            const index = wods.findIndex(item => item.id === action.item.id)
            if (index === 0) {
                wods.shift()
            } else {
                wods.splice(index, 1)
            }
            return { ...state, wods: wods };
        default:
            return state
    }
}

export default wodReducer