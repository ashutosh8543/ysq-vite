import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tokens } from "../../constants";
import MasterLayout from "../MasterLayout";
import { connect } from "react-redux";
import {
    fetchSingleGiftDetails,
    updateGiftInventoryQuantity,
} from "../../store/action/giftAction";
import { fetchWarehouses } from "../../store/action/warehouseAction";
import { fetchDistributors } from "../../store/action/userAction";
import axiosApi from "../../config/apiConfig";

const GiftInventoryCheckout = (props) => {
    const {
        updateGiftInventoryQuantity,
        warehouses,
        distributors,
        fetchWarehouses,
        fetchDistributors,
    } = props;
    const { id } = useParams();
    const [quantities, setQuantities] = useState({});
    const [previousQuantities, setPreviousQuantities] = useState({});
    const [selectedOption, setSelectedOption] = useState(null);

    const handleBack = () => {
        window.location.href = "#/app/inventory/";
    };

    const fetchInventroy = async (id) => {
        try {
            const token = localStorage.getItem(Tokens.ADMIN);
            const response = await axiosApi.get("gift-inventory", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                params: { gift_id: id },
            });

            const updatedQuantities = { ...quantities };
            const warehouseList = [];

            const distributorQuantitiesMap = {};

            response.data.forEach((item, index) => {
                if (item.distributor_id) {
                    if (!distributorQuantitiesMap[item.distributor_id]) {
                        updatedQuantities[`distributor_${item.distributor_id}`] =
                            item.distributor_quantities || 0;
                        setPreviousQuantities((prev) => ({
                            ...prev,
                            [`distributor_${item.distributor_id}`]:
                                item.distributor_quantities || 0,
                        }));

                        distributorQuantitiesMap[item.distributor_id] = true;
                    }
                }
                if (item.warehouse_id) {
                    updatedQuantities[`warehouse_${item.warehouse_id}`] =
                        item.warehouse_quantities || 0;
                    warehouseList.push(item);
                }
            });

            setQuantities(updatedQuantities);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchInventroy(id);
        }
    }, [id]);

    const handleQuantityChange = (id, event) => {
        const value = event.target.value;
        if (!isNaN(value) && value >= 0) {
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [id]: parseInt(value),
            }));
        }
    };

    useEffect(() => {
        fetchWarehouses();
        fetchDistributors();
    }, [fetchWarehouses, fetchDistributors]);

    const updateDistributorQuantity = async (distributorId) => {
        const quantity = quantities[`distributor_${distributorId}`];
        const previousQuantity =
            previousQuantities[`distributor_${distributorId}`];

        let quantityDifference = 0;
        if (previousQuantity !== undefined) {
            quantityDifference = quantity - previousQuantity;
        } else {
            quantityDifference = quantity;
        }

        const payload = {
            distributor_id: distributorId,
            distributor_quantities: quantityDifference,
            gift_id: id,
        };

        await updateGiftInventoryQuantity(payload);

        setPreviousQuantities((prev) => ({
            ...prev,
            [`distributor_${distributorId}`]: quantity,
        }));
    };

    const updateWarehouseQuantity = async (warehouseId) => {
        const quantity = quantities[`warehouse_${warehouseId}`];
        const previousQuantity = previousQuantities[`warehouse_${warehouseId}`];

        const payload = {
            warehouse_id: warehouseId,
            warehouse_quantities: quantity,
            gift_id: id,
        };

        await updateGiftInventoryQuantity(payload);

        setPreviousQuantities((prev) => ({
            ...prev,
            [`warehouse_${warehouseId}`]: quantity,
        }));
    };


    useEffect((id) => {
        if (selectedOption === "distributor" || selectedOption === "warehouse") {
            fetchInventroy(id);
        }
    }, [selectedOption, id]);

    const renderList = () => {
        if (selectedOption === "distributor") {
            return (
                <div>
                    <h4>Distributor List</h4>
                    <ul>
                        {distributors.length > 0 ? (
                            distributors.map((distributor) => (
                                <li
                                    key={distributor.id}
                                    className="mt-2"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <div style={{ flex: 1 }}>
                                        <strong>
                                            {
                                                distributor?.attributes
                                                    ?.first_name
                                            }{" "}
                                            {distributor?.attributes?.last_name}
                                        </strong>
                                        <br />
                                        <small>
                                            Email:{" "}
                                            {distributor?.attributes?.email}
                                        </small>
                                        <br />
                                        <small>
                                            Phone:{" "}
                                            {distributor?.attributes?.phone}
                                        </small>
                                    </div>
                                    <div
                                        style={{
                                            marginLeft: "20px",
                                            textAlign: "right",
                                        }}
                                    >
                                        <input
                                            type="number"
                                            value={
                                                quantities[
                                                    `distributor_${distributor.id}`
                                                ] || 0
                                            }
                                            onChange={(e) =>
                                                handleQuantityChange(
                                                    `distributor_${distributor.id}`,
                                                    e
                                                )
                                            }
                                            placeholder="Enter quantity"
                                            min="0"
                                            style={{
                                                padding: "5px",
                                                width: "130px",
                                            }}
                                        />
                                        <button
                                            onClick={() =>
                                                updateDistributorQuantity(
                                                    distributor.id
                                                )
                                            }
                                            style={{
                                                marginLeft: "10px",
                                                padding: "5px 10px",
                                                backgroundColor: "#4CAF50",
                                                color: "white",
                                                border: "none",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No distributors found.</p>
                        )}
                    </ul>
                </div>
            );
        }

        if (selectedOption === "warehouse") {
            return (
                <div>
                    <h4>Warehouse List</h4>
                    <ul>
                        {warehouses.length > 0 ? (
                            warehouses.map((warehouse) => (
                                <li
                                    key={warehouse.id}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <div style={{ flex: 1 }}>
                                        <strong>
                                            {warehouse.attributes.name}
                                        </strong>
                                        <br />
                                        <small>
                                            Email: {warehouse.attributes.email}
                                        </small>
                                        <br />
                                        <small>
                                            Phone: {warehouse.attributes.phone}
                                        </small>
                                    </div>
                                    <div
                                        style={{
                                            marginLeft: "20px",
                                            textAlign: "right",
                                        }}
                                    >
                                        <input
                                            type="number"
                                            value={
                                                quantities[
                                                    `warehouse_${warehouse.id}`
                                                ] || 0
                                            }
                                            onChange={(e) =>
                                                handleQuantityChange(
                                                    `warehouse_${warehouse.id}`,
                                                    e
                                                )
                                            }
                                            placeholder="Enter quantity"
                                            min="0"
                                            style={{
                                                padding: "5px",
                                                width: "130px",
                                            }}
                                        />
                                        <button
                                            onClick={() =>
                                                updateWarehouseQuantity(
                                                    warehouse.id
                                                )
                                            }
                                            style={{
                                                marginLeft: "10px",
                                                padding: "5px 10px",
                                                backgroundColor: "#4CAF50",
                                                color: "white",
                                                border: "none",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Apply
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No warehouses found.</p>
                        )}
                    </ul>
                </div>
            );
        }

        return <p>Please select an option to view the list.</p>;
    };

    return (
        <MasterLayout>
            <div className="d-flex justify-content-end">
                <button className="btn btn-danger" onClick={handleBack}>
                    Back
                </button>
            </div>
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card shadow-lg">
                            <div className="card-header bg-primary text-white">
                                <h4>Gift Inventory Checkout</h4>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title mb-4">
                                    Choose an Option
                                </h5>
                                <p className="card-text mb-4">
                                    Select either Distributor or Warehouse to
                                    proceed with the checkout process.
                                </p>

                                <div className="d-flex justify-content-end mb-3">
                                    <button
                                        className="btn btn-success me-2"
                                        onClick={() =>
                                            setSelectedOption("distributor")
                                        }
                                    >
                                        Distributor
                                    </button>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() =>
                                            setSelectedOption("warehouse")
                                        }
                                    >
                                        Warehouse
                                    </button>
                                </div>

                                <div className="mt-4">{renderList()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { warehouses, distributors } = state;
    return { warehouses, distributors };
};

export default connect(mapStateToProps, {
    fetchWarehouses,
    fetchDistributors,
    updateGiftInventoryQuantity,
})(GiftInventoryCheckout);
