import { giftActionType } from "../../constants";

export default (state = [], action) => {
    switch (action.type) {
        case giftActionType.FETCH_SUBMITTED_GIFT_HISTORY:
            return action.payload;
        case giftActionType.FETCH_GIFTS:
            return action.payload;
        case giftActionType.FETCH_SINGLE_GIFT_DETAILS:
            return action.payload;
        case giftActionType.FETCH_SUBMITTED_GIFT_DETAILS:
            return action.payload;
        case giftActionType.UPDATE_GIFT_QUANTITY:
            return action.payload;
        case giftActionType.UPDATE_PRODUCT_QUANTITY:
            return action.payload;
        case giftActionType.DELETE_GIFT:
            return state.filter((item) => item.id !== action.payload);
        default:
            return state;
    }
};
