import {mileageActionType} from '../../constants';

export default (state = [], action) => {
    switch (action.type) {
        case mileageActionType.FETCH_ALL_MILEAGE_LIST:
            return action.payload;
        case mileageActionType.FETCH_MILEAGE:
                return action.payload;            
        default:
            return state;
    }
};