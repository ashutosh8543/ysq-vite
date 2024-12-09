import {couponActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type){
        case couponActionType.FETCH_COUPONS:
            return action.payload;
        case couponActionType.FETCH_COUPON:
            return [action.payload];
        case couponActionType.ADD_COUPON:
            return action.payload;
        case couponActionType.EDIT_COUPON:
                return state.map(item => item.id === +action.payload.id ? action.payload : item);           
        case couponActionType.DELETE_COUPON:
                return state.filter(item => item.id !== action.payload);   
        default:
            return state;
    }
};