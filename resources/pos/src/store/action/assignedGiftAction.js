import { apiBaseURL, assignedGiftActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import {
    setTotalRecord,
    addInToTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import { addToast } from "./toastAction";
import requestParam from "../../shared/requestParam";
import { setLoading } from "./loadingAction";

export const assignedGift =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        const admin = true;
        let url = apiBaseURL.FETCH_ASSIGNED_GIFT;
        if (
            !_.isEmpty(filter) &&
            (filter.page ||
                filter.pageSize ||
                filter.search ||
                filter.order_By ||
                filter.created_at)
        ) {
            url += requestParam(filter, admin, null, null, url);
        }
        apiConfig
            .get(url)
            .then((response) => {
                dispatch({
                    type: assignedGiftActionType.FETCH_ASSIGNED_GIFT,
                    payload: response.data?.data?.data,
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
                        text: response.data?.message,
                        type: toastType.ERROR,
                    })
                );
            });
    };
