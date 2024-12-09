import {assignedGiftActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case assignedGiftActionType.FETCH_ASSIGNED_GIFT:
            return action.payload;
        default:
            return state;

    }
};
