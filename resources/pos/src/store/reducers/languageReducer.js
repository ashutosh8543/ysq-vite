import { languagesActionType } from "../../constants";

export default (state = [], action) => {
    switch (action.type) {
        case languagesActionType.FETCH_LANGUAGES:
            return action.payload;
        case languagesActionType.FETCH_LANGUAGE:
            return [action.payload];
        case languagesActionType.ADD_LANGUAGE:
            return action.payload;
        case languagesActionType.EDIT_LANGUAGE:
            return state.map((item) =>
                item.id === +action.payload.id ? action.payload : item
            );
        case languagesActionType.DELETE_LANGUAGE:
            return state.filter((item) => item.id !== action.payload);
        case languagesActionType.FETCH_ALL_LANGUAGES:
            return action.payload;
        case languagesActionType.FETCH_LANGUAGE_CONTENTS:
            return action.payload;
        case languagesActionType.ADD_LANGUAGE_CONTENTS:
            return action.payload;
        case languagesActionType.FETCH_LANGUAGE_CONTENTS_DETAIL:
            return action.payload;
        case languagesActionType.GIFT_INVENTORY_DATA:
            return action.payload;
        case languagesActionType.UPDATE_LANGUAGE_CONTENTS:
            return Array.isArray(state)
                ? state.map((item) =>
                      item.id === action.payload.id
                          ? { ...item, ...action.payload }
                          : item
                  )
                : [];
        default:
            return state;
    }
};
