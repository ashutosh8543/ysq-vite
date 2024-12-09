import { distributorActionType } from "../../constants";

const initialState = {
    data: [],
};

const distributorReducer = (state = initialState, action) => {
    switch (action.type) {
        case distributorActionType.FETCH_DISTRIBUTORS:
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
};

export default distributorReducer;
