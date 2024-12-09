import {chanelsActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case chanelsActionType.FETCH_CHANELS:
            return action.payload;
        case chanelsActionType.CHANEL_LIST:
            return action.payload;
        case chanelsActionType.FETCH_CHANEL:
            return [action.payload];
        case chanelsActionType.ADD_CHANEL:
            return action.payload;        
        case chanelsActionType.DELETE_CHANEL:
                return state.filter(item => item.id !== action.payload);   
        default:
            return state;
    }
};