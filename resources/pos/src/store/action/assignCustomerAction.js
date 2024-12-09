import { apiBaseURL, assignCustomersActionType, toastType } from "../../constants";
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
import { list } from "postcss";
import Customers from "../../components/customer/Customers";


// asign Customers
export const assignCustomer = (data) => async (dispatch) => {
    try {
        const response = await apiConfig.post(apiBaseURL.ASSIGN_CUSTOMER, data);

        dispatch(addToast({
            text: "Customer Assigned Successfully",
        }));
        dispatch(addInToTotalRecord(1));

        setTimeout(() => {
            window.location.href = "#/app/assign-customer-list";
        }, 1000);

    } catch (error) {
        const errorMessage = error.response?.data?.message || "An error occurred";
        dispatch(addToast({
            text: errorMessage,
            type: toastType.ERROR,
        }));
    }
};
    // fetch single 
    export const fetchSingleAssignedCustomer =
    (id , isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        let url = apiBaseURL.FETCH_SIGNLE_ASSIGNED_CUSTOMER+"/"+id;   
        apiConfig
            .get(url)
            .then((response) => {
                dispatch({
                    type: assignCustomersActionType.FETCH_SIGNLE_ASSIGNED_CUSTOMER,
                    payload: response.data,
                });
               
                if (isLoading) {
                    dispatch(setLoading(false));
                }
            })
            .catch(({response}) => {
                dispatch(
                    addToast({
                        text: response.data?.message,
                        type: toastType.ERROR,
                    })
                );
            });
    };

// fetch list
export const assignedCustomer =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        const admin = true;
        let url = apiBaseURL.FETCH_ASSIGNED_CUSTOMER;
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
                    type: assignCustomersActionType.FETCH_ASSIGNED_CUSTOMER,
                    payload: response?.data?.data,
                });
                dispatch(
                    setTotalRecord(
                        response.data?.total_count !== undefined &&
                            response.data?.total_count >= 0
                            ? response.data?.total_count
                            : response.data?.total_count
                    )
                );
                if (isLoading) {
                    dispatch(setLoading(false));
                }
            })
            .catch(({response}) => {
                dispatch(
                    addToast({
                        text: response.data?.message,
                        type: toastType.ERROR,
                    })
                );
            });
    };


       // fetch single 
       export const fetchSingleAssignedCustomerSalesMan =
       (id , isLoading = true) =>
       async (dispatch) => {
           if (isLoading) {
               dispatch(setLoading(true));
           }
           let url = apiBaseURL.FETCH_SIGNLE_ASSIGNED_CUSTOMER_AND_SALESMAN+"/"+id;   
           apiConfig
               .get(url)
               .then((response) => {
                   dispatch({
                       type: assignCustomersActionType.FETCH_SIGNLE_ASSIGNED_CUSTOMER_AND_SALESMAN,
                       payload: response.data,
                   });
                  
                   if (isLoading) {
                       dispatch(setLoading(false));
                   }
               })
               .catch(({response}) => {
                   dispatch(
                       addToast({
                           text: response.data?.message,
                           type: toastType.ERROR,
                       })
                   );
               });
       };










