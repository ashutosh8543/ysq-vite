import { apiBaseURL, creditActionType, toastType } from "../../constants";
import apiConfig from "../../config/apiConfig";
import {
    setTotalRecord,
    addInToTotalRecord,
    removeFromTotalRecord,
} from "./totalRecordAction";
import { addToast } from "./toastAction";
import requestParam from "../../shared/requestParam";
import { setLoading } from "./loadingAction";
import { assignCustomersActionType } from "../../constants";
import { getFormattedMessage } from "../../shared/sharedMethod";


// export const  AddQuestionAndOption = (data) => async (dispatch) => {

//     try {
//         const response = await apiConfig.post(apiBaseURL.ADD_QUESTION_OPTION, data);
//         dispatch(addToast({
//             text: "Question added Successfully",
//         }));
//         dispatch(addInToTotalRecord(1));
//         setTimeout(() => {
//             window.location.href = "#/app/survey";
//         }, 1000);

//     } catch (error) {
//         const errorMessage = error.response?.data?.message || "An error occurred";
//         dispatch(addToast({
//             text: errorMessage,
//             type: toastType.ERROR,
//         }));
//     }
// };


// export const fetchSurveyDetalis = (unitId, singleUnit) => async (dispatch) => {
//     apiConfig
//         .get(apiBaseURL.FETCH_SURVEY_DETAILS + "/" + unitId, singleUnit)
//         .then((response) => {

//             dispatch({
//                 type: surveyActionType.FETCH_SURVEY_DETAILS,
//                 payload: response.data?.data,
//             });
//         })
//         .catch(({ response }) => {
//             dispatch(
//                 addToast({ text: response.data?.message, type: toastType.ERROR })
//             );
//         });
// };

export const CollectionList =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        const admin = true;
        let url = apiBaseURL.FETCH_COLLECTION_LIST;
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
                    type: creditActionType.FETCH_COLLECTION_LIST,
                    payload: response.data.data.data,
                });
                dispatch(
                    setTotalRecord(
                            response.data?.data?.total >= 0
                            ? response.data?.data?.total
                            : response.data?.data?.total
                    )
                );
                if (isLoading) {
                    dispatch(setLoading(false));
                }
            })

            .catch(({response}) => {
                dispatch(
                    addToast({
                        text: response?.data?.data?.message,
                        type: toastType.ERROR,
                    })
                );
            });
    };


// export const QuestionList =
//     (filter = {}, isLoading = true) =>
//     async (dispatch) => {
//         if (isLoading) {
//             dispatch(setLoading(true));
//         }
//         const admin = true;
//         let url = apiBaseURL.FETCH_QUESTION_LIST;
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
//                     type: surveyActionType.FETCH_QUESTION_LIST,
//                     payload: response.data.data.data,
//                 });
//                 dispatch(
//                     setTotalRecord(
//                         response.data?.data?.total >= 0
//                         ? response.data?.data?.total
//                         : response.data?.data?.total
//                     )
//                 );
//                 if (isLoading) {
//                     dispatch(setLoading(false));
//                 }
//             })

//             .catch(({response}) => {
//                 dispatch(
//                     addToast({
//                         text: response.data.data.message,
//                         type: toastType.ERROR,
//                     })
//                 );
//             });
//     };



//     export const CheckInLists =
//     (filter = {}, isLoading = true) =>
//     async (dispatch) => {
//         if (isLoading) {
//             dispatch(setLoading(true));
//         }
//         const admin = true;
//         let url = apiBaseURL.FETCH_ALL_CHECKIN;
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
//                     type: surveyActionType.FETCH_ALL_CHECKIN,
//                     payload: response.data.data.data,
//                 });
//                 dispatch(
//                     setTotalRecord(
//                             response.data?.data?.total >= 0
//                             ? response.data?.data?.total
//                             : response.data?.data?.total
//                     )
//                 );
//                 if (isLoading) {
//                     dispatch(setLoading(false));
//                 }
//             })

//             .catch(({response}) => {
//                 dispatch(
//                     addToast({
//                         text: response?.data?.data?.message,
//                         type: toastType.ERROR,
//                     })
//                 );
//             });
//     };

//     export const CheckOutLists =
//     (filter = {}, isLoading = true) =>
//     async (dispatch) => {
//         if (isLoading) {
//             dispatch(setLoading(true));
//         }
//         const admin = true;
//         let url = apiBaseURL.FETCH_ALL_CHECKOUT;
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
//                     type: surveyActionType.FETCH_ALL_CHECKOUT,
//                     payload: response.data.data.data,
//                 });
//                 dispatch(
//                     setTotalRecord(
//                             response.data?.data?.total >= 0
//                             ? response.data?.data?.total
//                             : response.data?.data?.total
//                     )
//                 );
//                 if (isLoading) {
//                     dispatch(setLoading(false));
//                 }
//             })

//             .catch(({response}) => {
//                 dispatch(
//                     addToast({
//                         text: response?.data?.data?.message,
//                         type: toastType.ERROR,
//                     })
//                 );
//             });
//     };


//     export const deleteQuestion = (id) => async (dispatch) => {
//         try {
//             const response = await apiConfig.delete(
//                 apiBaseURL.DELETE_QUESTION + "/" + id
//             );
//             console.log("Delete response:", response);
//             dispatch({
//                 type: surveyActionType.DELETE_QUESTION,
//                 payload:id,
//             });
//             dispatch(
//                 addToast({
//                     text:" Question deleted succesfully",
//                 })
//             );
//         } catch (error) {
//             console.error("Delete error:", error);
//             const errorMessage = error.response
//                 ? error.response.data.message
//                 : "An error occurred";
//             dispatch(addToast({ text: errorMessage, type: toastType.ERROR }));
//         }
//     };









