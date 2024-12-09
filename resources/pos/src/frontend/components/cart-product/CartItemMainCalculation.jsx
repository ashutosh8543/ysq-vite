import React from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap-v5";
import { Row } from "react-bootstrap";
import {
    currencySymbolHandling,
    decimalValidate,
    getFormattedMessage,
    numValidate,
    placeholderText,
} from "../../../shared/sharedMethod";
import { discountType } from "../../../constants";

const CartItemMainCalculation = (props) => {
    const {
        totalQty,
        subTotal,
        cartItemValue,
        onChangeCart,
        grandTotal,
        frontSetting,
        allConfigData,
        onChangeTaxCart,
    } = props;

    return (
        <div className="calculation mt-5">
            <Row className="total-price">
                <div className="col-6 mb-2">
                </div>
                <div className="col-6 d-flex flex-column justify-content-center text-end align-items-end mb-2">
                    <h4 className="fs-3 mb-2 custom-big-content text-gray-600">
                        {getFormattedMessage("pos-total-qty.title")} :{" "}
                        {totalQty ? totalQty : "0"}
                    </h4>
                </div>
            </Row>
        </div>
    );
};
export default CartItemMainCalculation;
