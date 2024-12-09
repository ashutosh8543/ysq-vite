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

export const fetchUsers =
    (filter = {}, isLoading = true, allUser) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        let url = apiBaseURL.USERS;
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
                    type: userActionType.FETCH_USERS,
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

// export const fetchDistributors =
// (filter = {}, isLoading = true, allUser) =>
// async (dispatch) => {
//     if (isLoading) {
//         dispatch(setLoading(true));
//     }
//     let url = apiBaseURL.DISTRIBUTORS;
//     if (
//         !_.isEmpty(filter) &&
//         (filter.page ||
//             filter.pageSize ||
//             filter.search ||
//             filter.order_By ||
//             filter.created_at)
//     ) {
//         url += requestParam(filter, null, null, null, url);
//     }
//     url += allUser ? allUser : "";
//     apiConfig
//         .get(url)
//         .then((response) => {
//             console.log("api response:", response);
//             dispatch({
//                 type: userActionType.DISTRIBUTORS,
//                 payload: response.data.data,
//             });
//             !allUser &&
//                 dispatch(
//                     setTotalRecord(
//                         response.data.meta.total !== undefined &&
//                             response.data.meta.total >= 0
//                             ? response.data.meta.total
//                             : response.data.data.total
//                     )
//                 );
//             if (isLoading) {
//                 dispatch(setLoading(false));
//             }
//         })
//         .catch(({ response }) => {
//             if (isLoading) {
//                 dispatch(setLoading(false));
//             }
//             dispatch(
//                 addToast({
//                     text: response.data.message,
//                     type: toastType.ERROR,
//                 })
//             );
//         });
// };

export const fetchDistributors =
    (filter = {}, isLoading = true, allUser = null, country = null) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }

        let url = apiBaseURL.DISTRIBUTORS;

        // Add the country filter to the request if provided
        if (country) {
            filter.country = country;
        }

        // If any filter is provided, append it to the URL
        if (
            !_.isEmpty(filter) &&
            (filter.page ||
                filter.pageSize ||
                filter.search ||
                filter.order_By ||
                filter.created_at ||
                filter.country) // Ensure country is included in the filters
        ) {
            url += requestParam(filter, null, null, null, url);
        }

        // If 'allUser' is provided, append it to the URL
        url += allUser ? allUser : "";

        // Make the API call to fetch distributors
        apiConfig
            .get(url)
            .then((response) => {
                dispatch({
                    type: userActionType.DISTRIBUTORS,
                    payload: response.data.data,
                });

                // Optionally set total records if required
                if (!allUser) {
                    dispatch(
                        setTotalRecord(
                            response.data.meta.total !== undefined &&
                                response.data.meta.total >= 0
                                ? response.data.meta.total
                                : response.data.data.total
                        )
                    );
                }

                // Set loading state to false once the data is fetched
                if (isLoading) {
                    dispatch(setLoading(false));
                }
            })
            .catch(({ response }) => {
                // Handle error scenario
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

export const fetchUser =
    (userId, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .get(apiBaseURL.USERS + "/" + userId)
            .then((response) => {
                dispatch({
                    type: userActionType.FETCH_USER,
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

export const addUser = (users, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    await apiConfig
        .post(apiBaseURL.USERS, users)
        .then((response) => {
            dispatch({
                type: userActionType.ADD_USER,
                payload: response.data.data,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage("user.success.create.message"),
                })
            );
            navigate("/app/users");
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

export const addDistributer = (users, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    await apiConfig
        .post(apiBaseURL.USERS, users)
        .then((response) => {
            dispatch({
                type: userActionType.ADD_USER,
                payload: response.data.data,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage("user.success.create.message"),
                })
            );
            navigate("/app/distributor");
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

export const addWarehouse = (users, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    await apiConfig
        .post(apiBaseURL.USERS, users)
        .then((response) => {
            console.log("result", response);
            // dispatch({
            //     type: userActionType.ADD_USER,
            //     payload: response?.data?.data?.data,
            // });
            dispatch(
                addToast({
                    text: getFormattedMessage("user.success.create.message"),
                })
            );
            navigate("/app/warehouse");
            dispatch(addInToTotalRecord(1));
            dispatch(setSavingButton(false));
        })
        .catch(({ response }) => {
            dispatch(setSavingButton(false));
            dispatch(
                addToast({
                    text: response?.data?.message,
                    type: toastType.ERROR,
                })
            );
        });
};

export const editWarehouse = (userId, users, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    apiConfig
        .post(apiBaseURL.USERS + "/" + userId, users)
        .then((response) => {
            // dispatch({
            //     type: userActionType.EDIT_USER,
            //     payload: response.data.data,
            // });
            dispatch(
                addToast({
                    text: getFormattedMessage("user.success.edit.message"),
                })
            );
            navigate("/app/warehouse");
            dispatch(setSavingButton(false));
        })
        .catch(({ response }) => {
            dispatch(setSavingButton(false));
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const editUser = (userId, users, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    apiConfig
        .post(apiBaseURL.USERS + "/" + userId, users)
        .then((response) => {
            dispatch({
                type: userActionType.EDIT_USER,
                payload: response.data.data,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage("user.success.edit.message"),
                })
            );
            navigate("/app/users");
            dispatch(setSavingButton(false));
        })
        .catch(({ response }) => {
            dispatch(setSavingButton(false));
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const editDistributor =
    (userId, users, navigate) => async (dispatch) => {
        dispatch(setSavingButton(true));
        apiConfig
            .post(apiBaseURL.USERS + "/" + userId, users)
            .then((response) => {
                // dispatch({
                //     type: userActionType.EDIT_USER,
                //     payload: response.data?.data?.data,
                // });
                dispatch(
                    addToast({
                        text: getFormattedMessage("user.success.edit.message"),
                    })
                );
                navigate("/app/distributor");
                dispatch(setSavingButton(false));
            })
            .catch(({ response }) => {
                dispatch(setSavingButton(false));
                dispatch(
                    addToast({
                        text: response?.data?.message,
                        type: toastType.ERROR,
                    })
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

//  supervisor
export const fetchSupervisor =
    (filter = {}, isLoading = true, allUser) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        let url = apiBaseURL.SUPERVISOR;
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
                    type: userActionType.SUPERVISOR,
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

export const addSuppervisor = (users, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    await apiConfig
        .post(apiBaseURL.USERS, users)
        .then((response) => {
            // dispatch({
            //     type: userActionType.ADD_USER,
            //     payload: response.data?.data,
            // });
            dispatch(
                addToast({
                    text: getFormattedMessage("user.success.create.message"),
                })
            );
            navigate("/app/supervisor");
            dispatch(addInToTotalRecord(1));
            dispatch(setSavingButton(false));
        })
        .catch(({ response }) => {
            dispatch(setSavingButton(false));
            dispatch(
                addToast({
                    text: response?.data?.message,
                    type: toastType.ERROR,
                })
            );
        });
};

export const editSupervisor = (userId, users, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    apiConfig
        .post(apiBaseURL.USERS + "/" + userId, users)
        .then((response) => {
            dispatch({
                type: userActionType.EDIT_USER,
                payload: response.data.data,
            });
            dispatch(
                addToast({
                    text: getFormattedMessage("user.success.edit.message"),
                })
            );
            navigate("/app/supervisor");
            dispatch(setSavingButton(false));
        })
        .catch(({ response }) => {
            dispatch(setSavingButton(false));
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const fetchSingleSupervisor =
    (userId, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .get(apiBaseURL.USERS + "/" + userId)
            .then((response) => {
                dispatch({
                    type: userActionType.FETCH_SUPERVISOR,
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

export const fetchSingleWarehouse =
    (userId, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .get(apiBaseURL.USERS + "/" + userId)
            .then((response) => {
                dispatch({
                    type: userActionType.FETCH_WAREHOUSE,
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
