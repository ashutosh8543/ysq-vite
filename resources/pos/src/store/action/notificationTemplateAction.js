import apiConfig from "../../config/apiConfig";
import { apiBaseURL, smsTemplatesActionType, toastType } from "../../constants";
import requestParam from "../../shared/requestParam";
import { addToast } from "./toastAction";
import { setTotalRecord } from "./totalRecordAction";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";

export const fetchSmsTemplates =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        let url = apiBaseURL.SMS_TEMPLATES;
        if (
            !_.isEmpty(filter) &&
            (filter.page || filter.pageSize || filter.search || filter.order_By)
        ) {
            url += requestParam(filter, false, false, true, url);
        }
        apiConfig
            .get(url)
            .then((response) => {
                dispatch({
                    type: smsTemplatesActionType.FETCH_SMS_TEMPLATES,
                    payload: response.data.data,
                });
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
                dispatch(
                    addToast({
                        text: response.data.message,
                        type: toastType.ERROR,
                    })
                );
            });
    };

export const fetchSmsTemplate = (Id) => async (dispatch) => {
    apiConfig
        .get(apiBaseURL.SMS_TEMPLATES + "/" + Id + "/edit")
        .then((response) => {
            dispatch({
                type: smsTemplatesActionType.FETCH_SMS_TEMPLATE,
                payload: response.data.data,
            });
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const UpdateNotificationTemplate =
    (Id, smsTemplate, navigate) => async (dispatch) => {
        apiConfig
            .put(apiBaseURL.SMS_TEMPLATES + "/" + Id, smsTemplate)
            .then((response) => {
                dispatch({
                    type: smsTemplatesActionType.EDIT_SMS_TEMPLATE,
                    payload: response.data.data,
                });
                dispatch(
                    addToast({
                        text: "Notification Template Updated Successfully",
                    })
                );
                navigate("/app/notification-templates");
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

export const activeInactiveSms = (Id) => async (dispatch) => {
    apiConfig
        .post(apiBaseURL.SMS_TEMPLATES_STATUS + "/" + Id)
        .then((response) => {
            dispatch({
                type: smsTemplatesActionType.SET_ACTIVE_DE_ACTIVE,
                payload: response.data.data,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage(
                        "sms.status.edit.success.message"
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


export const addNotificationTemplate = (templateData, navigate) => async (dispatch) => {

    try {
        const response = await apiConfig.post(apiBaseURL.ADD_NOTIFICATION_TEMPLATE, templateData);

        dispatch({
            type: smsTemplatesActionType.ADD_NOTIFICATION_TEMPLATE,
            payload: response.data?.data,
        });

        dispatch(
            addToast({
                text: "Notification Template created successfully!",
            })
        );

        navigate("/app/notification-templates");
    } catch (error) {
        dispatch(
            addToast({
                text: error.response?.data?.message || "Error creating Notification Template.",
                type: toastType.ERROR,
            })
        );
    }
};


export const fetchUserNotificationTemplates =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        let url = apiBaseURL.USER_NOTIFICATION_TEMPLATE_LIST;
        if (
            !_.isEmpty(filter) &&
            (filter.page || filter.pageSize || filter.search || filter.order_By)
        ) {
            url += requestParam(filter, false, false, true, url);
        }
        apiConfig
            .get(url)
            .then((response) => {
                dispatch({
                    type: smsTemplatesActionType.USER_NOTIFICATION_TEMPLATE_LIST,
                    payload: response.data?.data?.data,
                });
                dispatch(
                    setTotalRecord(
                        response?.data?.data.total !== undefined &&
                            response?.data?.data?.total >= 0
                            ? response?.data?.data?.total
                            : response?.data?.data?.total
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

    export const updateUserNotificationTemplate = (id, data, navigate) => async (dispatch) => {
        try {
            const response = await apiConfig.post(
                `${apiBaseURL.UPDATE_NOTIFICATION_TEMPLATE}/${id}`,
                data
            );

            dispatch({
                type:  smsTemplatesActionType.UPDATE_NOTIFICATION_TEMPLATE,
                payload: response.data,
            });

            dispatch(
                addToast({
                    text: "Templates contents updated successfully!",
                })
            );

            setTimeout(() => {
                navigate("/app/user-notification-templates-list");
            }, 2000);
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update template contents";

            dispatch(
                addToast({
                    text: errorMessage,
                    type: toastType.ERROR,
                })
            );
        }
    };


    export const addAdminNotificationTemplate = (templateData, navigate) => async (dispatch) => {

        try {
            const response = await apiConfig.post(apiBaseURL.ADD_ADMIN_NOTIFICATION_TEMPLATE, templateData);

            dispatch({
                type: smsTemplatesActionType.ADD_ADMIN_NOTIFICATION_TEMPLATE,
                payload: response.data?.data,
            });

            dispatch(
                addToast({
                    text: "Admin Notification Template created successfully!",
                })
            );

            navigate("/app/admin-notification-templates-list");
        } catch (error) {
            dispatch(
                addToast({
                    text: error.response?.data?.message || "Error creating Admin Notification Template.",
                    type: toastType.ERROR,
                })
            );
        }
    };


    export const fetchAdminNotificationTemplates =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        let url = apiBaseURL.ADMIN_NOTIFICATION_TEMPLATE_LIST;
        if (
            !_.isEmpty(filter) &&
            (filter.page || filter.pageSize || filter.search || filter.order_By)
        ) {
            url += requestParam(filter, false, false, true, url);
        }
        apiConfig
            .get(url)
            .then((response) => {
                dispatch({
                    type: smsTemplatesActionType.ADMIN_NOTIFICATION_TEMPLATE_LIST,
                    payload: response.data?.data?.data,
                });
                dispatch(
                    setTotalRecord(
                        response?.data?.data.total !== undefined &&
                            response?.data?.data?.total >= 0
                            ? response?.data?.data?.total
                            : response?.data?.data?.total
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


    export const fetchSingleNotificationTemplate =
    (id, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .get(apiBaseURL.ADMIN_NOTIFICATION_DETAIL + "/" + id)
            .then((response) => {
                console.log("response from api:", response.data.data.title);
                dispatch({
                    type: smsTemplatesActionType.ADMIN_NOTIFICATION_DETAIL,
                    payload: response.data?.data,
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
                            "Failed to fetch admin notification details.",
                        type: toastType.ERROR,
                    })
                );
            });
    };


    export const updateAdminNotificationTemplate = (id, templateData, navigate) => async (dispatch) => {
        try {
            const response = await apiConfig.put(
                `${apiBaseURL.UPDATE_ADMIN_NOTIFICATION_DETAIL}/${id}`,
                templateData
            );

            dispatch({
                type: smsTemplatesActionType.UPDATE_ADMIN_NOTIFICATION_DETAIL,
                payload: response.data?.data,
            });

            dispatch(
                addToast({
                    text: "Admin Notification Template updated successfully!",
                })
            );

            navigate("/app/admin-notification-templates-list");
        } catch (error) {
            dispatch(
                addToast({
                    text: error.response?.data?.message || "Error updating Admin Notification Template.",
                    type: toastType.ERROR,
                })
            );
        }
    };




