import React, { useEffect, useState } from "react";
import MasterLayout from "../MasterLayout";
import { Tokens } from "../../constants";
import { useParams } from "react-router";
import axiosApi from "../../config/apiConfig";
import {
    decimalValidate,
    getFormattedMessage,
    getFormattedOptions,
    placeholderText,
} from "../../shared/sharedMethod";

const UpdateInventoryPrice = () => {
    const [channels, setChannels] = useState([]);
    const [prices, setPrices] = useState({});
    const [productPrice, setProductPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [productName, setProductName] = useState("");
    const [distributors, setDistributors] = useState([]);
    const [selectedDistributor, setSelectedDistributor] = useState("");
    const [notification, setNotification] = useState({
        show: false,
        message: "",
        type: "",
    });
    const { id } = useParams();

    const handleBack = () => {
        window.location.href = "#/app/inventory/";
    };

    const fetchProductPrice = async () => {
        try {
            const token = localStorage.getItem(Tokens.ADMIN);
            const response = await axiosApi.get(`get-products-details/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log(response.data);
            setProductPrice(response.data.data.price);
            setProductName(response.data.data.name);
            const initialPrices = {};
            const productDefaultPrice = response.data.data.price;

            response.data.data.chanel.forEach((channel) => {
                initialPrices[channel.chanel_id] =
                    channel.price || productDefaultPrice;
            });

            setPrices(initialPrices);
        } catch (error) {
            // showNotification("Failed to fetch product prices.", "danger");
        }
    };

    const fetchChannels = async () => {
        try {
            const token = localStorage.getItem(Tokens.ADMIN);
            const response = await axiosApi.get("chanels", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setChannels(response.data.data.data);
        } catch (error) {
            showNotification("Failed to fetch channels.", "danger");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchDistributors = async () => {
        try {
            const token = localStorage.getItem(Tokens.ADMIN);
            const response = await axiosApi.get("distributors", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const distributorList = response.data.data.map((distributor) => {
                return {
                    id: distributor.id,
                    name: `${distributor.attributes.first_name} ${distributor.attributes.last_name}`,
                };
            });
            setDistributors(distributorList);
        } catch (error) {
            showNotification("Failed to fetch distributors!", "danger");
        }
    };

    const fetchDistributorPrices = async (distributorId) => {
        if (!distributorId) {
            const resetPrices = {};
            channels.forEach((channel) => {
                resetPrices[channel.id] = productPrice;
            });
            setPrices(resetPrices);
            return;
        }

        try {
            const token = localStorage.getItem(Tokens.ADMIN);
            const response = await axiosApi.get(
                `distributor-prices/${distributorId}/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log(response.data);

            const distributorPrices = {};
            response.data.data.forEach((item) => {
                distributorPrices[item.channel_id] = item.price;
            });

            const updatedPrices = {};
            channels.forEach((channel) => {
                updatedPrices[channel.id] =
                    distributorPrices[channel.id] || productPrice;
            });
            setPrices(updatedPrices);
        } catch (error) {
            showNotification("Failed to fetch distributor prices.", "danger");
        }
    };

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ ...notification, show: false });
        }, 3000);
    };

    const updateAllPrices = async () => {
        try {
            const token = localStorage.getItem(Tokens.ADMIN);
            const productId = id;

            for (const channel of channels) {
                const price = prices[channel.id];
                await axiosApi.post(
                    "price-inventories",
                    {
                        price,
                        chanel_id: channel.id,
                        product_id: productId,
                        distributor_id: selectedDistributor,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
            }
            showNotification("Price updated successfully!", "success");
        } catch (error) {
            showNotification(
                "Error updating prices. Please try again.",
                "danger"
            );
        }
    };

    useEffect(() => {
        fetchDistributors();
        fetchProductPrice();
        fetchChannels();
    }, [id]);

    useEffect(() => {
        fetchDistributorPrices(selectedDistributor);
    }, [selectedDistributor]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <MasterLayout>
            <div className="container mt-4">
                {notification.show && (
                    <div
                        className={`alert alert-${notification.type} alert-dismissible fade show text-white`}
                        role="alert"
                    >
                        {notification.message}
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() =>
                                setNotification({
                                    ...notification,
                                    show: false,
                                })
                            }
                        ></button>
                    </div>
                )}

                <div className="d-flex justify-content-between align-items-center   mb-2">
                    <i
                        className="bi bi-arrow-left-square mx-2"
                        onClick={handleBack}
                        style={{
                            fontSize: "2.5rem",
                            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                            color: "#007bff",
                            cursor:"pointer"
                        }}
                    ></i>
                    <select
                        className="form-select w-auto ms-3"
                        value={selectedDistributor}
                        onChange={(e) => setSelectedDistributor(e.target.value)}
                    >
                        <option value="">Select Distributor</option>
                        {distributors.map((distributor) => (
                            <option key={distributor.id} value={distributor.id}>
                                {distributor.name}
                            </option>
                        ))}
                    </select>
                </div>
                <h2>Product: {productName}</h2>
                {selectedDistributor && (
                <div className="table-container">
                            <table className="table table-striped table-bordered mt-5">
                              <thead>
                                <tr>
                                <th className="text-dark">Id</th>
                                <th className="text-dark">Channel Name</th>
                                <th className="text-dark">Set Product Price</th>
                                <th className="text-dark">Action</th>
                            </tr>
                        </thead>
                            <tbody>
                                {channels.map((item) => (
                                    <tr key={item.id}>
                                        <td className="text-dark">{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={
                                                    prices[item.id] !==
                                                    undefined
                                                        ? prices[item.id]
                                                        : productPrice
                                                }
                                                onChange={(e) =>
                                                    setPrices((prevPrices) => ({
                                                        ...prevPrices,
                                                        [item.id]:
                                                            e.target.value,
                                                    }))
                                                }
                                                placeholder="Enter price"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                    <div className="d-flex justify-content-end">
                        <button
                        className="btn btn-primary mx-2"
                        onClick={handleBack}
                        >
                        Cancel
                       </button>
                        <button
                        className="btn btn-success"
                        onClick={updateAllPrices}
                        >
                        Apply All Prices
                        </button>
                    </div>
            </div>
        </MasterLayout>
    );
};

export default UpdateInventoryPrice;
