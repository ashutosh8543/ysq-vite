import {cashActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case cashActionType.FETCH_ALL_CASH_LIST:
            return action.payload;
         case cashActionType.ADD_CASH_AMOUNT:
                return action.payload;
        default:
            return state;
    }
};
