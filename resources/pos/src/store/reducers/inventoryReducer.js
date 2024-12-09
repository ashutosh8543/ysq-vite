import { inventoryActionType } from "../../constants";


export default (state = [], action) => {
    switch (action.type) {
        case inventoryActionType.UPDATE_PRODUCT_QUANTITY:
            return action.payload;
        default:
            return state;
    }
};
