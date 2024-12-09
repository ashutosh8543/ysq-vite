import React, { useEffect, useState } from 'react';
import MasterLayout from '../MasterLayout';
import { useParams } from 'react-router';
import { Tokens } from "../../constants";
import axiosApi from "../../config/apiConfig";
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";

const CheckInDetails = () => {
    const { id } = useParams();
    const [checkInData, setCheckInData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const checkInDetails = async (id) => {
        const token = localStorage.getItem(Tokens.ADMIN);
        try {
            const response = await axiosApi.get(`checkin-details/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log("checkin details:", response.data.data);
            setCheckInData(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching checkIn details:", error);
            setError('Error fetching check-in details');
            setLoading(false);
        }
    };

    useEffect(() => {
        checkInDetails(id);
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
                    onClick={() => (window.location.href = "#/app/checkin")}
                    style={{ backgroundColor: "#ff5722", color: "white" }}
                >
                    Back
                </button>
            </div>
            <div className="container mt-4">
                <h1 className="mb-4 text-center">Check-In Details</h1>
                {checkInData ? (
                    <>
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="card mb-4">
                                    <div className="card-header bg-primary text-white">
                                        <h5 className="card-title">Customer Details</h5>
                                    </div>
                                    <div className="card-body">
                                        <p><strong>Name:</strong> {checkInData.customer.name}</p>
                                        <p><strong>Email:</strong> {checkInData.customer.email}</p>
                                        <p><strong>Phone:</strong> {checkInData.customer.phone}</p>
                                        <p><strong>Address:</strong> {checkInData.customer.address}, {checkInData.customer.city}</p>
                                        <p><strong>Location:</strong> {checkInData.location}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="card mb-4">
                                    <div className="card-header bg-success text-white">
                                        <h5 className="card-title">Salesman Details</h5>
                                    </div>
                                    <div className="card-body">
                                        <p><strong>Name:</strong> {checkInData.salesman.first_name} {checkInData.salesman.last_name}</p>
                                        <p><strong>Image:</strong> <img src={checkInData.salesman.image_url} alt="Salesman" className="img-fluid rounded" style={{ width: '100px' }} /></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-header bg-info text-white">
                                <h5 className="card-title">Check-in Details</h5>
                            </div>
                            <div className="card-body">
                                <p><strong>Check-in Location:</strong> {checkInData.location}</p>
                                <p><strong>Check-in Date:</strong> {moment(checkInData.created_at).format("DD-MM-yyyy")}</p>
                                {checkInData.image && (
                                    <div>
                                        <strong>Check-in Image:</strong>
                                        <img
                                            src={checkInData.image}
                                            alt="Check-in"
                                            className="img-fluid rounded"
                                            style={{ width: '100%' }}
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

export default CheckInDetails;
