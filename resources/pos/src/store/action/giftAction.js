import { apiBaseURL, giftActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import {
    setTotalRecord,
    addInToTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import { addToast } from "./toastAction";
import requestParam from "../../shared/requestParam";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";

export const fetchAllSubmitedGiftsHistory =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        const admin = true;
        let url = apiBaseURL.FETCH_SUBMITTED_GIFT_HISTORY;
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
                // console.log("vdvd",response.data);
                dispatch({
                    type: giftActionType.FETCH_SUBMITTED_GIFT_HISTORY,
                    payload: response.data.data.data,
                });
                dispatch(
                    setTotalRecord(
                        response.data.data.total >= 0
                            ? response.data.data.total
                            : response.data.data.total
                    )
                );
                if (isLoading) {
                    dispatch(setLoading(false));
                }
            })
            .catch(({ response }) => {
                dispatch(
                    addToast({
                        text: response?.data?.message,
                        type: toastType.ERROR,
                    })
                );
            });
    };

export const allGift =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        const admin = true;
        let url = apiBaseURL.FETCH_GIFTS;
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
                    type: giftActionType.FETCH_GIFTS,
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
                        text: response.data?.message,
                        type: toastType.ERROR,
                    })
                );
            });
    };

export const deleteGift = (id) => async (dispatch) => {
    try {
        const response = await apiConfig.delete(
            apiBaseURL.DELETE_GIFT + "/" + id
        );
        console.log("Delete response:", response);
        dispatch({
            type: giftActionType.DELETE_GIFT,
            payload: id,
        });
        dispatch(
            addToast({
                text: "gift deleted succesfully",
            })
        );
    } catch (error) {
        console.error("Delete error:", error);
        const errorMessage = error.response
            ? error.response.data.message
            : "An error occurred";
        dispatch(addToast({ text: errorMessage, type: toastType.ERROR }));
    }
};

export const fetchSubmittedDetails =
    (subid, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .get(apiBaseURL.FETCH_SUBMITTED_GIFT_DETAILS + "/" + subid)
            .then((response) => {
                dispatch({
                    type: giftActionType.FETCH_SUBMITTED_GIFT_DETAILS,
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

export const fetchSingleGiftDetails =
    (id, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .get(apiBaseURL.FETCH_SINGLE_GIFT_DETAILS + "/" + id)
            .then((response) => {
                // console.log("api response:", response.data);
                dispatch({
                    type: giftActionType.FETCH_SINGLE_GIFT_DETAILS,
                    payload: response.data?.gift,
                });

                if (isLoading) {
                    dispatch(setLoading(false));
                }
            })
            .catch(({ response }) => {
                dispatch(
                    addToast({
                        text:
                            response?.data?.message ||
                            "Failed to fetch gift details.",
                        type: toastType.ERROR,
                    })
                );
            });
    };

export const updateGiftInventoryQuantity =
    (payload, navigate) => async (dispatch) => {
        try {
            const response = await apiConfig.post(
                apiBaseURL.UPDATE_GIFT_QUANTITY,
                payload
            );
            console.log("api response:", response.data);

            dispatch({
                type: giftActionType.UPDATE_GIFT_QUANTITY,
                payload: response.data,
            });

            dispatch(fetchSingleGiftDetails(payload.gift_id));

            dispatch(
                addToast({
                    text: "Quantity updated successfully!",
                })
            );
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "Failed to update quantity";
            dispatch(
                addToast({
                    text: errorMessage,
                    type: toastType.ERROR,
                })
            );
        }
    };


    export const updateProductInventoryQuantity = (payload, navigate) => async (dispatch) => {
        try {
            const response = await apiConfig.post(apiBaseURL.UPDATE_PRODUCT_QUANTITY, payload);
            console.log("API response:", response.data);

            dispatch({
                type: giftActionType.UPDATE_PRODUCT_QUANTITY,
                payload: response.data,
            });

            dispatch(
                addToast({
                    text: "Quantity updated successfully!",
                })
            );

        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to update quantity";
            dispatch(
                addToast({
                    text: errorMessage,
                    type: toastType.ERROR,
                })
            );
        }
    };


