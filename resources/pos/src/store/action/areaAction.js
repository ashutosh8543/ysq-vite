import { apiBaseURL, toastType,areaActionType } from "../../constants";
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
import { setSavingButton } from "./saveButtonAction";

export const fetchAreas =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        const admin = true;
        let url = apiBaseURL.FETCH_AREAS;
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
                    type: areaActionType.FETCH_AREAS,
                    payload: response?.data?.data?.data,
                });
                dispatch(
                    setTotalRecord(
                        response.data?.data?.meta?.total !== undefined &&
                        response.data?.data?.meta?.total >= 0
                        ? response.data?.data.meta?.total
                        : response.data?.data?.total
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

    export const addArea = (addChanel,navigate) => async (dispatch) => {
        await apiConfig
            .post(apiBaseURL.ADD_AREA, addChanel)
            .then((response) => {
                dispatch(
                    addToast({
                        text: "Area Added Successfully",
                    })
                );
                dispatch(addInToTotalRecord(1));
                navigate("/app/area");
            })
            .catch(({response}) => {
                dispatch(
                    addToast({ text: response?.data.message, type: toastType.ERROR })
                );
            });
    };




    export const fetchArea=
    (userId, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .get(apiBaseURL.FETCH_AREA + "/" + userId)
            .then((response) => {
                dispatch({
                    type: areaActionType.FETCH_AREA,
                    payload: response.data?.data,
                });
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

    export const editArea = (data,navigate) => async (dispatch) => {
        dispatch(setSavingButton(true));
        apiConfig
            .post(apiBaseURL.EDIT_AREA, data)
            .then((response) => {
                // dispatch({
                //     type: userActionType.EDIT_USER,
                //     payload: response.data.data,
                // });
                dispatch(
                    addToast({
                        text: "channel Updated Succcesfully",
                    })
                );
                navigate("/app/area");
                dispatch(setSavingButton(false));
            })
            .catch(({ response }) => {
                dispatch(setSavingButton(false));
                dispatch(
                    addToast({ text: response.data.message, type: toastType.ERROR })
                );
            });
    };



    export const deleteArea = (userId) => async (dispatch) => {
        apiConfig
            .get(apiBaseURL.DELETE_AREA + "/" + userId)
            .then((response) => {
                dispatch(removeFromTotalRecord(1));
                dispatch({ type: areaActionType.DELETE_AREA, payload: userId });
                dispatch(
                    addToast({
                        text: "Area deleted successfully",
                    })
                );
            })
            .catch(({ response }) =>{
                dispatch(
                    addToast({ text: response.data.message, type: toastType.ERROR })
                );
            });
    };




    export const AreaList=
    (isLoading=true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .get(apiBaseURL.AREA_LIST)
            .then((response) => {
                dispatch({
                    type: areaActionType.AREA_LIST,
                    payload: response.data?.data,
                });
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
