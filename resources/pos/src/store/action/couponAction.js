import apiConfig from "../../config/apiConfig";
import { apiBaseURL, couponActionType, toastType } from "../../constants";
import requestParam from "../../shared/requestParam";
import { addToast } from "./toastAction";
import {
    setTotalRecord,
    addInToTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { setSavingButton } from "./saveButtonAction";

export const fetchCoupons=
    (filter = {}, isLoading = true, allUser) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        let url = apiBaseURL.COUPONS;
        if (
            !_.isEmpty(filter) &&
            (filter.page ||
                filter.pageSize ||
                filter.search ||
                filter.order_By ||
                filter.created_at)
        ) {
            url += requestParam(filter, null, null, null, url);
        }
        url += allUser ? allUser : "";
        apiConfig
            .get(url)
            .then((response) => {
                dispatch({
                    type: couponActionType.FETCH_COUPONS,
                    payload: response.data.data,
                });
                !allUser &&
                    dispatch(
                        setTotalRecord(
                            response.data.meta.total !== undefined &&
                                response.data.meta.total >= 0
                                ? response.data.meta.total
                                : response.data.data.total
                        )
                    );
                if (isLoading) {
                    dispatch(setLoading(false));
                }
            })
            .catch(({ response }) => {
                if (isLoading) {
                    dispatch(setLoading(false));
                }
                dispatch(
                    addToast({
                        text: response.data.message,
                        type: toastType.ERROR,
                    })
                );
            });
    };

export const fetchCoupon =
    (userId, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .get(apiBaseURL.COUPONS + "/" + userId)
            .then((response) => {
                dispatch({
                    type: couponActionType.FETCH_COUPON,
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

export const addCoupon = (users, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    await apiConfig
        .post(apiBaseURL.COUPONS, users)
        .then((response) => {
            dispatch({
                type: couponActionType.ADD_COUPON,
                payload: response.data.data,
            });
            dispatch(
                addToast({
                    text: "Coupn Added Successfully ",
                })
            );
            navigate("/app/coupons");
            dispatch(addInToTotalRecord(1));
            dispatch(setSavingButton(false));
        })
        .catch(({ response }) => {
            dispatch(setSavingButton(false));
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const editCoupon = (userId, users, navigate) => async (dispatch) => {

    dispatch(setSavingButton(true));
    apiConfig
        .put(apiBaseURL.COUPONS + "/" + userId, users)
        .then((response) => {
            dispatch({
                type: couponActionType.EDIT_COUPON,
                payload: response.data.data,
            });
            dispatch(
                addToast({
                    text:"Coupon Updated Successfully",
                })
            );
            navigate("/app/coupons");
            dispatch(setSavingButton(false));
        })
        .catch(({ response }) => {
            dispatch(setSavingButton(false));
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};



export const deleteCoupon = (userId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.COUPONS + "/" + userId)
        .then((response) => {
            dispatch(removeFromTotalRecord(1));
            dispatch({ type: couponActionType.DELETE_COUPON, payload: userId });
            dispatch(
                addToast({
                    text:"Coupon Deleted Successfully",
                })
            );
        })
        .catch(({ response }) =>{
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};








  