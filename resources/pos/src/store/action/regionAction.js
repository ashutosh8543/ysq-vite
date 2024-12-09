import apiConfig from "../../config/apiConfig";
import { apiBaseURL, currencyActionType, toastType,regionActionType} from "../../constants";
import requestParam from "../../shared/requestParam";
import { addToast } from "./toastAction";
import {
    addInToTotalRecord,
    removeFromTotalRecord,
    setTotalRecord,
} from "./totalRecordAction";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
export const fetchRegions =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        let url = apiBaseURL.FETCH_REGIONS;
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
        apiConfig
            .get(url)
            .then((response) => {
                dispatch({
                    type: regionActionType.FETCH_REGIONS,
                    payload: response.data.data.data,
                });
                dispatch(
                    setTotalRecord(
                        response.data.meta?.total !== undefined &&
                            response.data?.meta.total >= 0
                            ? response.data?.meta.total
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
                        text: response.data.message,
                        type: toastType.ERROR,
                    })
                );
            });
    };




export const addRegion = (region) => async (dispatch) => {
    await apiConfig
        .post(apiBaseURL.REGION, region)
        .then((response) => {
            dispatch({
                type: regionActionType.ADD_REGION,
                payload: response.data?.data,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage(
                        "region.success.create.message"
                    ),
                })
            );
            dispatch(addInToTotalRecord(1));
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const fetchRegion = (currencyId) => async (dispatch) => {
    apiConfig
        .get(apiBaseURL.FETCH_REGION + "/" + currencyId)
        .then((response) => {
            dispatch({
                type: currencyActionType.FETCH_REGION,
                payload: response.data.data,
            });
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const deleteRegion = (regionId) => async (dispatch) => {
    apiConfig
        .get(apiBaseURL.DELETE_REGION + "/" + regionId)
        .then((response) => {
            dispatch(removeFromTotalRecord(1));
            dispatch({
                type: regionActionType.DELETE_REGION,
                payload: regionId,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage(
                        "region.success.delete.message"
                    ),
                })
            );
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const editRegion =
    (regionId, region, handleClose) => async (dispatch) => {
        apiConfig
            .post(apiBaseURL.EDIT_REGION + "/" + regionId, region)
            .then((response) => {
                // console.log("retirn data",response);
                dispatch({
                    type: regionActionType.EDIT_REGION,
                    payload: response.data.data?.data,
                });
                handleClose(false);
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "region.success.edit.message"
                        ),
                    })
                );
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
