import apiConfig from "../../config/apiConfig";
import { apiBaseURL, userActionType, toastType } from "../../constants";
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

export const fetchSalesmans =
    (filter = {}, isLoading = true, allUser) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        let url = apiBaseURL.FETCH_SALESMANS;
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
                const salesman = response.data.data;
                
                dispatch({
                    type: userActionType.FETCH_SALESMANS,
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

export const addSalesman = (users, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    await apiConfig
        .post(apiBaseURL.USERS, users)
        .then((response) => {
            dispatch({
                type: userActionType.ADD_SALESMAN,
                payload: response.data.data,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage("user.success.create.message"),
                })
            );
            navigate("/app/salesman");
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

export const editSalesman = (userId, users, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    apiConfig
        .post(apiBaseURL.USERS + "/" + userId, users)
        .then((response) => {
            dispatch({
                type: userActionType.EDIT_SALESMAN,
                payload: response.data.data,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage("user.success.edit.message"),
                })
            );
            navigate("/app/salesman");
            dispatch(setSavingButton(false));
        })
        .catch(({ response }) => {
            dispatch(setSavingButton(false));
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const deleteUser = (userId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.USERS + "/" + userId)
        .then((response) => {
            dispatch(removeFromTotalRecord(1));
            dispatch({ type: userActionType.DELETE_USER, payload: userId });
            dispatch(
                addToast({
                    text: getFormattedMessage("user.success.delete.message"),
                })
            );
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};
export const fetchSingleSalesman =
    (userId, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .get(apiBaseURL.USERS + "/" + userId)
            .then((response) => {
                dispatch({
                    type: userActionType.FETCH_SALESMAN,
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



    export const fetchAllSalesman =() =>
    async (dispatch) => {
        let url = apiBaseURL.FETCH_ALL_SALESMANS;      
        apiConfig
            .get(url)
            .then((response) => {
                dispatch({
                    type: userActionType.FETCH_ALL_SALESMANS,
                    payload: response.data,
                });              
            })
            .catch(({ response }) => {               
                // dispatch(
                //     addToast({
                //         text: response?.data?.message,
                //         type: toastType.ERROR,
                //     })
                // );
            });
    };
