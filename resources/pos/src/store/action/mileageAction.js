import { apiBaseURL, toastType,mileageActionType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import {
    setTotalRecord,
    addInToTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import { addToast } from "./toastAction";
import requestParam from "../../shared/requestParam";
import { setLoading } from "./loadingAction";


      export const fetchAllMileageHistory =(filter = {}, isLoading = true) =>
        async (dispatch) => {
            if (isLoading) {
                dispatch(setLoading(true));
            }
            const admin = true;
            let url = apiBaseURL.FETCH_ALL_MILEAGE_LIST;
            if(
                !_.isEmpty(filter) &&
                (filter.page ||
                    filter.pageSize ||
                    filter.search ||
                    filter.order_By ||
                    filter.created_at)
            ){
                url += requestParam(filter, admin, null, null, url);
            }
            apiConfig
                .get(url)
                .then((response) => {
                    dispatch({
                        type: mileageActionType.FETCH_ALL_MILEAGE_LIST,
                        payload: response.data.data.data,
                    });
                    dispatch(
                        setTotalRecord(
                            response.data.meta?.total !== undefined &&
                                response.data.meta?.total >= 0
                                ? response.data.meta?.total
                                : response.data.data?.total
                        )
                    );
                    if (isLoading) {
                        dispatch(setLoading(false));
                    }
                })
                .catch(({ response }) => {
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                });
        };

        export const fetchMileage =
        (userId, isLoading = true) =>
        async (dispatch) => {
            if (isLoading) {
                dispatch(setLoading(true));
            }
            apiConfig
                .get(apiBaseURL.FETCH_MILEAGE + "/" + userId)
                .then((response) => {
                    dispatch({
                        type: mileageActionType.FETCH_MILEAGE,
                        payload: response.data.data,
                    });
                    if (isLoading) {
                        dispatch(setLoading(false));
                    }
                })
                .catch(({ response }) => {
                    dispatch(
                        addToast({
                            text: response.data.message,
                            type: toastType.ERROR,
                        })
                    );
                });
        };
