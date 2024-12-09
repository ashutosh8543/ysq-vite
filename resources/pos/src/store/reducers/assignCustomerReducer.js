import { assignCustomersActionType } from '../../constants';

const initialState = [];

export default (state = [], action) => {
    switch (action.type) {
        case assignCustomersActionType.ASSIGN_CUSTOMER:
            return [...state, action.payload];
        case assignCustomersActionType.FETCH_ASSIGNED_CUSTOMER:
                return action.payload;
        case assignCustomersActionType.FETCH_SIGNLE_ASSIGNED_CUSTOMER:
                    return action.payload;
        case assignCustomersActionType.FETCH_SIGNLE_ASSIGNED_CUSTOMER_AND_SALESMAN:
                    return action.payload;
        default:
            return state;
    }
};
