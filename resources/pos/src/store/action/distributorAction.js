import {
    apiBaseURL,
    distributorActionType,
    giftActionType,
    toastType,
} from "../../constants";
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

export const fetchAllDistributors = () => async (dispatch) => {
    try {
        const response = await apiConfig.get(apiBaseURL.FETCH_DISTRIBUTORS);

        console.log("distributor List:", response.data);

        dispatch({
            type: distributorActionType.FETCH_DISTRIBUTORS,
            payload:response.data.data,
        });

        dispatch(addToast({
            text: "Distributors fetched successfully",
        }));

    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred while fetching distributors";
        dispatch(addToast({
            text: errorMessage,
            type: toastType.ERROR,
        }));
    }
};

// export const fetchAllDistributors =
//     (filter = {}, isLoading = true) =>
//     async (dispatch) => {
//         if (isLoading) {
//             dispatch(setLoading(true));
//         }

//         let url = apiBaseURL.FETCH_DISTRIBUTORS;
//         if (
//             !_.isEmpty(filter) &&
//             (filter.page ||
//                 filter.pageSize ||
//                 filter.search ||
//                 filter.order_By ||
//                 filter.created_at)
//         ) {
//             url += requestParam(filter, null, null, null, url);
//         }

//         apiConfig
//             .get(url)
//             .then((response) => {
//                 dispatch({
//                     type: warehouseActionType.FETCH_DISTRIBUTORS,
//                     payload: response.data.data,
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
