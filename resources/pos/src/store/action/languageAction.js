import apiConfig from "../../config/apiConfig";
import { apiBaseURL, toastType, languagesActionType } from "../../constants";
import { addToast } from "./toastAction";
import requestParam from "../../shared/requestParam";
import { setTotalRecord } from "./totalRecordAction";
import { setLoading } from "./loadingAction";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { fetchSelectedLanguageData } from "./updateLanguageAction";

export const fetchLanguages =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        let url = apiBaseURL.LANGUAGES;
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
                    type: languagesActionType.FETCH_LANGUAGES,
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
                        text: response?.data?.message,
                        type: toastType.ERROR,
                    })
                );
            });
    };

export const fetchLanguage = (unitId, singleUnit) => async (dispatch) => {
    apiConfig
        .get(apiBaseURL.LANGUAGES + "/" + unitId, singleUnit)
        .then((response) => {
            dispatch({
                type: languagesActionType.FETCH_LANGUAGE,
                payload: response.data.data,
            });
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

export const addLanguage = (base_units) => async (dispatch) => {
    await apiConfig
        .post(apiBaseURL.LANGUAGES, base_units)
        .then((response) => {
            dispatch({
                type: languagesActionType.ADD_LANGUAGE,
                payload: response.data.data,
            });
            dispatch(fetchLanguages());
            dispatch(
                addToast({
                    text: getFormattedMessage("language.save.success.message"),
                })
            );
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const editLanguage =
    (unitId, units, handleClose) => async (dispatch) => {
        apiConfig
            .patch(apiBaseURL.LANGUAGES + "/" + unitId, units)
            .then((response) => {
                dispatch({
                    type: languagesActionType.EDIT_LANGUAGE,
                    payload: response.data.data,
                });
                handleClose(false);
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "language.edit.success.message"
                        ),
                    })
                );
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

export const deleteLanguage = (unitId) => async (dispatch) => {
    apiConfig
        .delete(apiBaseURL.LANGUAGES + "/" + unitId)
        .then((response) => {
            dispatch({
                type: languagesActionType.DELETE_LANGUAGE,
                payload: unitId,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage(
                        "language.deleted.success.message"
                    ),
                })
            );
            dispatch(fetchLanguages());
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

export const fetchLanguageData = (languageId) => async (dispatch) => {
    apiConfig
        .get(apiBaseURL.LANGUAGES + "/translation/" + languageId)
        .then((response) => {
            dispatch({
                type: languagesActionType.FETCH_LANGUAGE_DATA,
                payload: response.data.data,
            });
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

export const editLanguageData =
    (languageId, languageData) => async (dispatch) => {
        apiConfig
            .post(
                apiBaseURL.LANGUAGES + "/translation/" + languageId + "/update",
                languageData
            )
            .then((response) => {
                const selectedLanguage =
                    localStorage.getItem("updated_language");
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "language.updated.success.message"
                        ),
                    })
                );
                // dispatch({type: languagesActionType.EDIT_LANGUAGE_DATA, payload: response.data.data})
                dispatch(fetchLanguageData(languageId));
                if (selectedLanguage === languageData.iso_code) {
                    dispatch(fetchSelectedLanguageData(languageId));
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

export const fetchAllLanguage = () => async (dispatch) => {
    apiConfig
        .get(`languages?page[size]=0`)
        .then((response) => {
            dispatch({
                type: languagesActionType.FETCH_LANGUAGES,
                payload: response.data.data,
            });
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const fetchLanguageContents =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        let url = apiBaseURL.FETCH_LANGUAGE_CONTENTS;
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
                    type: languagesActionType.FETCH_LANGUAGE_CONTENTS,
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
                // dispatch(
                //     addToast({
                //         text: response?.data?.message,
                //         type: toastType.ERROR,
                //     })
                // );
            });
    };

export const addLanguageContents = (data, navigate) => async (dispatch) => {
    try {
        const response = await apiConfig.post(
            apiBaseURL.ADD_LANGUAGE_CONTENTS,
            data
        );

        dispatch({
            type: languagesActionType.ADD_LANGUAGE_CONTENTS,
            payload: response.data,
        });

        dispatch(
            addToast({
                text: "Language contents created successfully!",
            })
        );

        setTimeout(() => {
            navigate("/app/language-contents");
        }, 2000);

    } catch (error) {
        const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "Failed to create language contents";

        dispatch(
            addToast({
                text: errorMessage,
                type: toastType.ERROR,
            })
        );
    }
};


export const fetchLanguageContentDetails =
    (id, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .get(apiBaseURL.FETCH_LANGUAGE_CONTENTS_DETAIL + "/" + id)
            .then((response) => {
                // console.log("api response:", response.data);
                dispatch({
                    type: languagesActionType.FETCH_LANGUAGE_CONTENTS_DETAIL,
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
                            "Failed to fetch gift details.",
                        type: toastType.ERROR,
                    })
                );
            });
    };


    export const updateLanguageContents = (id, data, navigate) => async (dispatch) => {
        try {
            const response = await apiConfig.post(
                `${apiBaseURL.UPDATE_LANGUAGE_CONTENTS}/${id}`,
                data
            );

            dispatch({
                type: languagesActionType.UPDATE_LANGUAGE_CONTENTS,
                payload: response.data,
            });

            dispatch(
                addToast({
                    text: "Language contents updated successfully!",
                })
            );

            setTimeout(() => {
                navigate("/app/language-contents");
            }, 2000);
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update language contents";

            dispatch(
                // addToast({
                //     text: errorMessage,
                //     type: toastType.ERROR,
                // })
            );
        }
    };



    export const fetchUpdatedGiftQuantity =
    (isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .get(apiBaseURL.GIFT_INVENTORY_DATA)
            .then((response) => {
                console.log("api response:", response);
                dispatch({
                    type: giftInventoryActionType.GIFT_INVENTORY_DATA,
                    payload:response.data?.data?.data,
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
                            "Failed to fetch gift inventory.",
                        type: toastType.ERROR,
                    })
                );
            });
    };

