import apiConfig from "../../config/apiConfig";
import { apiBaseURL, saleActionType, toastType } from "../../constants";
import { addToast } from "./toastAction";
import {
    addInToTotalRecord,
    removeFromTotalRecord,
    setTotalRecord,
} from "./totalRecordAction";
import { setLoading } from "./loadingAction";
import requestParam from "../../shared/requestParam";
import { getFormattedMessage } from "../../shared/sharedMethod";
import { callSaleApi } from "./saleApiAction";
import { setSavingButton } from "./saveButtonAction";
import { assignedProductActionType } from "../../constants";

export const loadProductstoSalesMan = (sale, navigate) => async (dispatch) => {
    dispatch(setSavingButton(true));
    await apiConfig
        .post(apiBaseURL.LOADPRODUCTS, sale)
        .then((response) => {
            // dispatch({
            //     type: saleActionType.ADD_SALE,
            //     payload: response.data.data,
            // });
            dispatch(
                addToast({
                    text: "Products Assigned Successfully",
                })
            );
            dispatch(addInToTotalRecord(1));
            dispatch(setSavingButton(false));
            setTimeout(() => {
                window.location.href="#/app/assign-product-list";
            }, 1000);

        })
        .catch(({ response }) => {
            dispatch(setSavingButton(false));
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};


export const assignedProduct =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        const admin = true;
        let url = apiBaseURL.FETCH_ASSIGNED_PRODUCT;
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
                    type: assignedProductActionType.FETCH_ASSIGNED_PRODUCT,
                    payload: response.data?.data?.data,
                });
                dispatch(
                    setTotalRecord(
                        response.data?.data?.meta?.total !== undefined &&
                            response.data?.data?.meta?.total >= 0
                            ? response.data.meta?.total
                            : response.data.data?.total
                    )
                );
                if (isLoading) {
                    dispatch(setLoading(false));
                }
            })

            .catch((error) => {
                console.log(error);
                // dispatch(
                //     addToast({
                //         text: response.data?.message,
                //         type: toastType.ERROR,
                //     })
                // );
            });
    };
export const StockOutProductList =
    (filter = {}, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        const admin = true;
        let url = apiBaseURL.FETCH_STOCK_OUT_PRODUCT;
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
                    type: assignedProductActionType.FETCH_STOCK_OUT_PRODUCT,
                    payload: response.data?.data?.data,
                });
                dispatch(
                    setTotalRecord(
                        response.data?.data?.meta?.total !== undefined &&
                            response.data?.data?.meta?.total >= 0
                            ? response.data.meta?.total
                            : response.data.data?.total
                    )
                );
                if (isLoading) {
                    dispatch(setLoading(false));
                }
            })

            .catch((error) => {
                console.log(error);
                // dispatch(
                //     addToast({
                //         text: response.data?.message,
                //         type: toastType.ERROR,
                //     })
                // );
            });
    };

    export const StockOutProduct = (data) => async (dispatch) => {
        try {
            const response = await apiConfig.post(apiBaseURL.STOCK_OUT_PRODUCT, data);

            dispatch(addToast({
                text: "Products StockOut Successfully",
            }));
            dispatch(addInToTotalRecord(1));

            setTimeout(() => {
                window.location.href = "#/app/stockout-product-list";
            }, 1000);

        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            dispatch(addToast({
                text: errorMessage,
                type: toastType.ERROR,
            }));
        }
    };







