import { apiBaseURL, cashActionType, toastType} from "../../constants";
import apiConfig from "../../config/apiConfig";
import {
    setTotalRecord,
    addInToTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import { addToast } from "./toastAction";
import requestParam from "../../shared/requestParam";
import { setLoading } from "./loadingAction";

export const fetchAllCashHistory =(filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        const admin = true;
        let url = apiBaseURL.FETCH_ALL_CASH_LIST;
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
                    type: cashActionType.FETCH_ALL_CASH_LIST,
                    payload: response.data?.data?.data,
                });
                dispatch(
                    setTotalRecord(
                        response.data.meta?.total !== undefined &&
                            response.data?.meta?.total >= 0
                            ? response.data?.meta?.total
                            : response.data?.data?.total
                    )
                );
                if (isLoading) {
                    dispatch(setLoading(false));
                }
            })
            .catch((error) => {
                console.log("err",error);
                // dispatch(
                //     addToast({
                //         text: response.data.message,
                //         type: toastType.ERROR,
                //     })
                // );
            });
    };


    export const addCashAmount = (cashAmount) => async (dispatch) => {
        await apiConfig
            .post(apiBaseURL.ADD_CASH_AMOUNT, cashAmount)
            .then((response) => {
                // dispatch({
                //     type: cashActionType.ADD_CASH_AMOUNT,
                //     payload: response.data?.data,
                // });
                dispatch(
                    addToast({
                        text: "Cash Asigned Successfully",
                    })
                );
                dispatch(addInToTotalRecord(1));
                setTimeout(() => {
                    window.location.href="#/app/all-cash-list";
                }, 1000);
            })
            .catch(({response}) => {
                dispatch(
                    addToast({ text: response?.data.message, type: toastType.ERROR })
                );
            });
    };
