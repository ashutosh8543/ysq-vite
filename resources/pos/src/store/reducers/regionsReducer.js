import {regionActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case regionActionType.FETCH_REGIONS:
            return action.payload;
        case regionActionType.FETCH_REGION:
            return [action.payload];
        case regionActionType.ADD_REGION:
            return [...state, action.payload];
        case regionActionType.EDIT_REGION:
            return state.map(item => item.id === +action.payload.id ? action.payload : item);
        case regionActionType.DELETE_REGION:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
};
