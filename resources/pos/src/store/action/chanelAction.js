import { apiBaseURL, toastType,chanelsActionType } from "../../constants";
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

export const fetchChanels =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        const admin = true;
        let url = apiBaseURL.CHANELS;
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
                    type: chanelsActionType.FETCH_CHANELS,
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

    export const addChanel = (addChanel,navigate) => async (dispatch) => {
        await apiConfig
            .post(apiBaseURL.ADD_CHANEL, addChanel)
            .then((response) => {               
                dispatch(
                    addToast({
                        text: "Channel Added Successfully",
                    })
                );
                dispatch(addInToTotalRecord(1));
                navigate("/app/chanels");            
            })
            .catch(({response}) => {                                  
                dispatch(
                    addToast({ text: response?.data.message, type: toastType.ERROR })
                );
            });
    };


    

    export const fetchChanel=
    (userId, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .get(apiBaseURL.FETCH_CHANEL + "/" + userId)
            .then((response) => {                
                dispatch({
                    type: chanelsActionType.FETCH_CHANEL,
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

    export const editChanel = (data,navigate) => async (dispatch) => {        
        dispatch(setSavingButton(true));
        apiConfig
            .post(apiBaseURL.EDIT_CHANEL, data)
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
                navigate("/app/chanels");
                dispatch(setSavingButton(false));
            })
            .catch(({ response }) => {
                dispatch(setSavingButton(false));
                dispatch(
                    addToast({ text: response.data.message, type: toastType.ERROR })
                );
            });
    };


    
    export const deleteChanel = (userId) => async (dispatch) => {
        apiConfig
            .get(apiBaseURL.DELETE_CHANEL + "/" + userId)
            .then((response) => {
                dispatch(removeFromTotalRecord(1));
                dispatch({ type: chanelsActionType.DELETE_CHANEL, payload: userId });
                dispatch(
                    addToast({
                        text: getFormattedMessage("user.success.delete.message"),
                    })
                );
            })
            .catch(({ response }) =>{
                dispatch(
                    addToast({ text: response.data.message, type: toastType.ERROR })
                );
            });
    };


    
    export const ChannelList=
    (isLoading=true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .get(apiBaseURL.CHANEL_LIST)
            .then((response) => {                
                dispatch({
                    type: chanelsActionType.CHANEL_LIST,
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
