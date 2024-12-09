import { apiBaseURL, countryActionType, toastType } from "../../constants";
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
import { Tokens } from "../../constants";

// export const fetchCountry =
//     (filter = {}, isLoading = true) =>
//     async (dispatch) => {
//         if (isLoading) {
//             dispatch(setLoading(true));
//         }
//         const admin = true;
//         let url = apiBaseURL.FETCH_COUNTRY;
//         if (
//             !_.isEmpty(filter) &&
//             (filter.page ||
//                 filter.pageSize ||
//                 filter.search ||
//                 filter.order_By ||
//                 filter.created_at)
//         ) {
//             url += requestParam(filter, admin, null, null, url);
//         }
//         apiConfig
//             .get(url)
//             .then((response) => {
//                 dispatch({
//                     type: countryActionType.FETCH_COUNTRY,
//                     payload: response.data?.data,
//                 });
//                 dispatch(
//                     setTotalRecord(
//                         response.data.meta.total !== undefined &&
//                             response.data.meta.total >= 0
//                             ? response.data.meta.total
//                             : response.data.data.total
//                     )
//                 );
//                 if (isLoading) {
//                     dispatch(setLoading(false));
//                 }
//             })
//             .catch(({ response }) => {
//                 dispatch(
//                     addToast({
//                         text: response.data.message,
//                         type: toastType.ERROR,
//                     })
//                 );
//             });
//     };

export const fetchCountry =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        const admin = true;
        let url = apiBaseURL.FETCH_COUNTRY;
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
                    type: countryActionType.FETCH_COUNTRY,
                    payload: response.data?.data,
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


    export const updateCountry = (countryId) => async (dispatch) => {
        dispatch(setLoading(true));

        const token = localStorage.getItem(Tokens.ADMIN);
        try {
            const response = await apiConfig.post(
                apiBaseURL.UPDATE_COUNTRY,
                { country_id: countryId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Response from backend:", response);

            dispatch(addToast({
                text: "Country updated successfully!",
                type: toastType.SUCCESS,
            }));

            dispatch(fetchCountry());

            setTimeout(() => {
                window.location.reload();
            }, 1500);


        } catch (error) {
            console.error("Error updating country:", error);

            dispatch(addToast({
                text: "Error updating country! Please try again.",
                type: toastType.ERROR,
            }));
        } finally {
            dispatch(setLoading(false));
        }
    };


