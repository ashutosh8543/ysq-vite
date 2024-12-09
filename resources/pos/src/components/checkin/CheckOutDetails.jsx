import React, { useEffect, useState } from "react";
import MasterLayout from "../MasterLayout";
import { useParams } from "react-router";
import { Tokens } from "../../constants";
import axiosApi from "../../config/apiConfig";
import moment from "moment";

const CheckOutDetails = () => {
    const { id } = useParams();
    const [checkOutData, setCheckOutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const checkOutDetails = async (id) => {
        const token = localStorage.getItem(Tokens.ADMIN);
        try {
            const response = await axiosApi.get(`checkout-details/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setCheckOutData(response.data.data);
            setLoading(false);
        } catch (error) {
            setError("Error fetching check-out details");
            setLoading(false);
        }
    };

    useEffect(() => {
        checkOutDetails(id);
    }, [id]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-danger">{error}</div>;
    }

    return (
        <MasterLayout>
            <div className="d-flex justify-content-end">
                <button
                    className="btn"
                    onClick={() => (window.location.href = "#/app/checkout")}
                    style={{ backgroundColor: "#ff5722", color: "white" }}
                >
                    Back
                </button>
            </div>
            <div className="container mt-4">
                <h1 className="mb-4 text-center">Check-Out Details</h1>
                {checkOutData ? (
                    <>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="card mb-4">
                                    <div className="card-header bg-primary text-white">
                                        <h5 className="card-title">
                                            Customer Details
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <p>
                                            <strong>Name:</strong>{" "}
                                            {checkOutData.customer.name}
                                        </p>
                                        <p>
                                            <strong>Email:</strong>{" "}
                                            {checkOutData.customer.email}
                                        </p>
                                        <p>
                                            <strong>Phone:</strong>{" "}
                                            {checkOutData.customer.phone}
                                        </p>
                                        <p>
                                            <strong>Address:</strong>{" "}
                                            {checkOutData.customer.address},{" "}
                                            {checkOutData.customer.city}
                                        </p>
                                        <p>
                                            <strong>Location:</strong>{" "}
                                            {checkOutData.location}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="card mb-4">
                                    <div className="card-header bg-success text-white">
                                        <h5 className="card-title">
                                            Salesman Details
                                        </h5>
                                    </div>
                                    <div className="card-body">
                                        <p>
                                            <strong>Name:</strong>{" "}
                                            {checkOutData.salesman.first_name}{" "}
                                            {checkOutData.salesman.last_name}
                                        </p>
                                        <p>
                                            <strong>Image:</strong>{" "}
                                            <img
                                                src={
                                                    checkOutData.salesman
                                                        .image_url
                                                }
                                                alt="Salesman"
                                                className="img-fluid rounded"
                                                style={{ width: "100px" }}
                                            />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header bg-info text-white">
                                <h5 className="card-title">Check-Out Details</h5>
                            </div>
                            <div className="card-body">
                                <p>
                                    <strong>Check-Out Location:</strong>{" "}
                                    {checkOutData.location}
                                </p>
                                <p><strong>Check-Out Date:</strong> {moment(checkOutData.created_at).format("DD-MM-yyyy")}</p>
                                {checkOutData.image && (
                                    <div>
                                        <strong>Check-Out Image:</strong>
                                        <img
                                            src={checkOutData.image}
                                            alt="Check-in"
                                            className="img-fluid rounded"
                                            style={{ width: "100%" }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <p>No details found.</p>
                )}
            </div>
        </MasterLayout>
    );
};

export default CheckOutDetails;
