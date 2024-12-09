import {creditActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case creditActionType.FETCH_COLLECTION_LIST:
            return action.payload;
        default:
            return state;
    }
};
