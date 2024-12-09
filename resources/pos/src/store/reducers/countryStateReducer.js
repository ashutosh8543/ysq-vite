import { countryActionType } from "../../constants";

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case countryActionType.FETCH_COUNTRY:
            return action.payload;

        case countryActionType.UPDATE_COUNTRY:
            return state.map(country =>
                country.id === action.payload.id ? { ...country, ...action.payload } : country
            );

        default:
            return state;
    }
};
