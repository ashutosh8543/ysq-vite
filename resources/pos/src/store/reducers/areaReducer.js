import {areaActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case areaActionType.FETCH_AREAS:
            return action.payload;
        case areaActionType.AREA_LIST:
            return action.payload;
        case areaActionType.FETCH_AREA:
            return [action.payload];
        case areaActionType.ADD_AREA:
            return action.payload;        
        case areaActionType.DELETE_AREA:
                return state.filter(item => item.id !== action.payload);   
        default:
            return state;
    }
};