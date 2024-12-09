import React from "react";
import { Button } from "react-bootstrap-v5";
import { connect, useDispatch } from "react-redux";
import {
    currencySymbolHandling,
    decimalValidate,
    getFormattedMessage,
} from "../../../shared/sharedMethod";
import { calculateProductCost } from "../../shared/SharedMethod";
import { addToast } from "../../../store/action/toastAction";
import { toastType } from "../../../constants";
import { posAllProduct } from "../../../store/action/pos/posAllProductAction";

const ProductCartList = (props) => {
    const {
        singleProduct,
        index,
        onClickUpdateItemInCart,
        onDeleteCartItem,
        frontSetting,
        setUpdateProducts,
        posAllProducts,
        wareHouseId,
        allConfigData,
    } = props;
    const dispatch = useDispatch();
    const totalQty =
        posAllProducts
            .filter((product) => product.id === singleProduct.id)
            .flatMap((product) => product.attributes.productInventoriesDetails)
            .find((inventory) => inventory.warehouse_id === wareHouseId)
            ?.warehouse_quantities || 0;

    const handleIncrement = () => {
        setUpdateProducts((updateProducts) =>
            updateProducts.map((item) => {
                if (item.id === singleProduct.id) {
                    const warehouseInventory = posAllProducts
                        .filter((product) => product.id === singleProduct.id)
                        .flatMap(
                            (product) =>
                                product.attributes.productInventoriesDetails
                        )
                        .find(
                            (inventory) =>
                                inventory.warehouse_id === wareHouseId
                        );

                    if (warehouseInventory) {
                        const cartQuantity = item.quantity;
                        let warehouseQuantity =
                            warehouseInventory.warehouse_quantities;

                        if (warehouseQuantity > 0) {
                            warehouseInventory.warehouse_quantities -= 1;
                            return { ...item, quantity: cartQuantity + 1 };
                        } else {
                            dispatch(
                                addToast({
                                    text: getFormattedMessage(
                                        "Qunatity are out of stock"
                                    ),
                                    type: toastType.ERROR,
                                })
                            );
                            return item;
                        }
                    } else {
                        dispatch(
                            addToast({
                                text: getFormattedMessage(
                                    "no more quantity available in stock"
                                ),
                                type: toastType.ERROR,
                            })
                        );
                        return item;
                    }
                } else {
                    return item;
                }
            })
        );
    };

    const handleDecrement = () => {
        if (singleProduct.quantity - 1 > 0) {
            setUpdateProducts((updateProducts) =>
                updateProducts.map((item) => {
                    if (item.id === singleProduct.id) {
                        const warehouseInventory = posAllProducts
                            .filter(
                                (product) => product.id === singleProduct.id
                            )
                            .flatMap(
                                (product) =>
                                    product.attributes.productInventoriesDetails
                            )
                            .find(
                                (inventory) =>
                                    inventory.warehouse_id === wareHouseId
                            );

                        if (warehouseInventory) {
                            warehouseInventory.warehouse_quantities += 1;
                            return { ...item, quantity: item.quantity - 1 };
                        } else {
                            return item;
                        }
                    } else {
                        return item;
                    }
                })
            );
        } else {
            dispatch(
                addToast({
                    text: getFormattedMessage(
                        "Minimum quantity at least 1"
                    ),
                    type: toastType.ERROR,
                })
            );
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        const { value } = e.target;

        if (value.match(/\./g)) {
            const [, decimal] = value.split(".");
            if (decimal?.length > 2) {
                return;
            }
        }

        const typedQuantity = Number(value);
        const warehouseInventory = posAllProducts
            .filter((product) => product.id === singleProduct.id)
            .flatMap((product) => product.attributes.productInventoriesDetails)
            .find((inventory) => inventory.warehouse_id === wareHouseId);

        if (warehouseInventory) {
            if (!warehouseInventory.hasOwnProperty("initialStock")) {
                warehouseInventory.initialStock =
                    warehouseInventory.warehouse_quantities;
            }

            const availableStock = warehouseInventory.warehouse_quantities;
            const initialStock = warehouseInventory.initialStock;

            if (typedQuantity > availableStock) {
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "pos.product-quantity-error.message"
                        ),
                        type: toastType.ERROR,
                    })
                );

                warehouseInventory.warehouse_quantities = initialStock;

                setUpdateProducts((updateProducts) =>
                    updateProducts.map((item) =>
                        item.id === singleProduct.id
                            ? { ...item, quantity: 0 }
                            : item
                    )
                );
            } else if (typedQuantity === 0) {
                warehouseInventory.warehouse_quantities = initialStock;

                setUpdateProducts((updateProducts) =>
                    updateProducts.map((item) =>
                        item.id === singleProduct.id
                            ? { ...item, quantity: 0 }
                            : item
                    )
                );
            } else {
                const currentCartQuantity = singleProduct.quantity;
                const difference = typedQuantity - currentCartQuantity;

                warehouseInventory.warehouse_quantities -= difference;

                setUpdateProducts((updateProducts) =>
                    updateProducts.map((item) =>
                        item.id === singleProduct.id
                            ? { ...item, quantity: typedQuantity }
                            : item
                    )
                );
            }
        } else {
            dispatch(
                addToast({
                    text: getFormattedMessage(
                        "pos.no-warehouse-inventory.message"
                    ),
                    type: toastType.ERROR,
                })
            );
            setUpdateProducts((updateProducts) =>
                updateProducts.map((item) =>
                    item.id === singleProduct.id
                        ? { ...item, quantity: 0 }
                        : item
                )
            );
        }
    };

    return (
        <tr key={index} className="align-middle">
            <td className="text-nowrap text-nowrap ps-0">
                <h4 className="product-name text-gray-900 mb-1 text-capitalize text-truncate">
                    {singleProduct.name}
                </h4>
            </td>
            <td>
                <div className="counter d-flex align-items-center pos-custom-qty">
                    <Button
                        type="button"
                        variant="primary"
                        onClick={() => handleDecrement()}
                        className="counter__down d-flex align-items-center justify-content-center"
                    >
                        -
                    </Button>
                    <input
                        type="number"
                        value={singleProduct.quantity}
                        className="hide-arrow"
                        onKeyPress={(event) => decimalValidate(event)}
                        onChange={(e) => handleChange(e)}
                    />
                    <Button
                        type="button"
                        variant="primary"
                        onClick={() => handleIncrement()}
                        className="counter__up d-flex align-items-center justify-content-center"
                    >
                        +
                    </Button>
                </div>
            </td>
            <td className="text-end remove-button pe-0">
                <Button
                    className="p-0 bg-transparent border-0"
                    onClick={() => onDeleteCartItem(singleProduct.id)}
                >
                    <i className="bi bi-trash3 text-danger" />
                </Button>
            </td>
        </tr>
    );
};

export default connect(null, null)(ProductCartList);
