import {
    posProductActionType,
    productActionType,
    toastType,
} from "../../../constants";
import apiConfig from "../../../config/apiConfig";
import { addToast } from "../toastAction";
import { setLoading } from "../loadingAction";

export const posAllProductAction = () => async (dispatch) => {
    apiConfig
        .get(`products?page[size]=0`)
        .then((response) => {
            dispatch({
                type: posProductActionType.POS_ALL_PRODUCT,
                payload: response.data.data,
            });
        })
        .catch(({ response }) => {
            dispatch(
                addToast({ text: response.data.message, type: toastType.ERROR })
            );
        });
};

export const posAllProduct =
    (warehouse, isLoading = true) =>
    async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        apiConfig
            .get(`products?page[size]=0&warehouse_id=${warehouse}`)
            .then((response) => {
                console.log("response from api :", response);
                dispatch({
                    type: posProductActionType.POS_ALL_PRODUCTS,
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

export const fetchBrandClickable =
    (brandId, categoryId, warehouse,isLoading = true) => async (dispatch) => {
        if (isLoading) {
            dispatch(setLoading(true));
        }
        await apiConfig
            .get(
                `products?filter[brand_id]=${
                    brandId ? brandId : ""
                }&filter[product_category_id]=${
                    categoryId ? categoryId : ""
                }&page[size]=0&warehouse_id=${warehouse ? warehouse : ""}`
            )
            .then((response) => {
                dispatch({
                    type: productActionType.FETCH_BRAND_CLICKABLE,
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
