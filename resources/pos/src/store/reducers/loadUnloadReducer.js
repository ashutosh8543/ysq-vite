import {assignedProductActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case assignedProductActionType.FETCH_ASSIGNED_PRODUCT:
            return action.payload;
        case assignedProductActionType.FETCH_STOCK_OUT_PRODUCT:
                return action.payload;    
        default:
            return state;

    }
};
