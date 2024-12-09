import {surveyActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case surveyActionType.FETCH_QUESTION_LIST:
            return action.payload;
        case surveyActionType.FETCH_SURVEY_LIST:
                return action.payload;
        case surveyActionType.FETCH_SURVEY_DETAILS:
                return action.payload;
        case surveyActionType.FETCH_ALL_CHECKIN:
                return action.payload;
        case surveyActionType.FETCH_ALL_CHECKOUT:
                return action.payload;
        case surveyActionType.DELETE_QUESTION:
            return state.filter(item => item.id !== action.payload);
        default:
            return state;

    }
};
