import React, { useState, createRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import {
    getFormattedMessage,
    placeholderText,
    decimalValidate,
} from "../../shared/sharedMethod";
import { editCurrency } from "../../store/action/currencyAction";
import MasterLayout from "../MasterLayout";
import HeaderTitle from "../header/HeaderTitle";
import ModelFooter from "../../shared/components/modelFooter";
import { fetchAllSalesman } from "../../store/action/salesmanAction";
import { addCashAmount } from "../../store/action/cashAction";
import Select from "react-select";

const AsignCash = (props) => {
    const { salesmans, fetchAllSalesman, addCashAmount } = props;

    const innerRef = createRef();
    const [formValue, setFormValue] = useState({
        cash: "",
        type: "",
        country: "", // Add country field to the formValue state
    });
    const [selectedSalesmanId, setSelectedSalesmanId] = useState();

    const setSelectedSalesman = (obj) => {
        setSelectedSalesmanId(obj.value);

        const selectedSalesman = salesmans.find(
            (s) => s.salesman_id === obj.value
        );
        if (selectedSalesman) {
            setFormValue((prev) => ({
                ...prev,
                country: selectedSalesman.sales_man_details.country,
            }));
        }
    };

    const [errors, setErrors] = useState({
        cash: "",
        type: "",
        country: "",
    });

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if (!selectedSalesmanId) {
            errorss["sales_man_id"] = "Please select sales man";
        } else if (!formValue["cash"].trim()) {
            errorss["cash"] = "Please Enter cash amount";
        } else if (!formValue["type"].trim()) {
            errorss["type"] = "Please select cash type";
        } else {
            isValid = true;
        }
        setErrors(errorss);
        return isValid;
    };

    useEffect(() => {
        fetchAllSalesman();
    }, []);

    const onChangeInput = (e) => {
        e.preventDefault();
        setFormValue((inputs) => ({
            ...inputs,
            [e.target.name]: e.target.value,
        }));
        setErrors("");
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (valid) {
            formValue["sales_man_id"] = selectedSalesmanId;
            addCashAmount(formValue);
            clearField(false);
        }
    };

    const clearField = () => {
        setFormValue({
            sales_man_id: "",
            cash: "",
            type: "",
            country: "",
        });
        setErrors("");
    };

    const salesmens =
        salesmans &&
        salesmans.map((item) => {
            return {
                value: item.salesman_id,
                label:
                    item.sales_man_details?.first_name +
                    " " +
                    item.sales_man_details?.last_name,
            };
        });

    return (
        <MasterLayout>
            <HeaderTitle title="Asign Cash" to="/app/all-cash-list" />
            <Form>
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <Select
                            placeholder="Choose Salesman"
                            onChange={setSelectedSalesman}
                            options={salesmens}
                            noOptionsMessage={() =>
                                getFormattedMessage("no-option.label")
                            }
                        />
                        <span className="text-danger d-block fw-400 fs-small mt-2">
                            {errors["sales_man_id"]
                                ? errors["sales_man_id"]
                                : null}
                        </span>
                    </div>
                    <div className="col-md-12 mb-3">
                        <label className="form-label">Select Cash Type</label>
                        <span className="required" />
                        <select
                            name="type"
                            className="form-control"
                            value={formValue.type}
                            onChange={onChangeInput}
                        >
                            <option value="">Please select cash type</option>
                            <option value="opening">Opening</option>
                            <option value="closing">Closing</option>
                        </select>
                        <span className="text-danger d-block fw-400 fs-small mt-2">
                            {errors["type"] ? errors["type"] : null}
                        </span>
                    </div>

                    <div className="col-md-12 mb-3">
                        <label className="form-label">
                            Enter Amount(In Rp)
                        </label>
                        <span className="required" />
                        <input
                            type="text"
                            name="cash"
                            className="form-control"
                            placeholder="Enter Cash Amount"
                            onKeyPress={(event) => decimalValidate(event)}
                            onChange={onChangeInput}
                            value={formValue.cash}
                        />
                        <span className="text-danger d-block fw-400 fs-small mt-2">
                            {errors["cash"] ? errors["cash"] : null}
                        </span>
                    </div>
                    <div className="col-md-12 mb-3" style={{ display: "none" }}>
                        <label className="form-label">Country</label>
                        <input
                            type="text"
                            name="country"
                            className="form-control"
                            placeholder="Country Code"
                            value={formValue.country}
                            readOnly
                        />
                    </div>
                    <ModelFooter
                        onSubmit={onSubmit}
                        addDisabled={!formValue.cash}
                        link="/app/all-cash-list"
                    />
                </div>
            </Form>
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { salesmans } = state;
    return { salesmans };
};

export default connect(mapStateToProps, { addCashAmount, fetchAllSalesman })(
    AsignCash
);
