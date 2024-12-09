import React, { useState, useEffect } from "react";
import MasterLayout from "../MasterLayout";
import axiosApi from "../../config/apiConfig";
import { Tokens } from "../../constants";
import { useParams } from "react-router-dom";
import { Card, Image } from "react-bootstrap"; // Import Image from react-bootstrap

const CustomerDetails = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        credit_limit: "",
        unique_code: "",
        distributor: {},
        warehouse: {},
        areaDetails:{},
    });

    const fetchCustomerDetails = async (id) => {
        const token = localStorage.getItem(Tokens.ADMIN);
        try {
            const response = await axiosApi.get(`customers/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = response.data.data.attributes;
            console.log("data",data);
            
            setCustomer({
                name: data.name,
                email: data.email,
                image:data?.image,
                phone: data.phone,
                country: data?.countryDetails?.name,
                city: data.city,
                credit_limit: data.credit_limit,
                region: customer.attributes?.areaDetails?.region?.name,
                unique_code: data.unique_code,
                distributor: data.distributor || {},
                warehouse: data.warehouse || {},
                areaDetails:data.areaDetails || {}
            });
        } catch (error) {
            console.error("Error fetching customer details:", error);
        }
    };

    useEffect(() => {
        fetchCustomerDetails(id);
    }, [id]);

    const getAvatarName = (name) => {
        return name.charAt(0).toUpperCase();
    };

    return (
        <MasterLayout>
            <div className="d-flex justify-content-between">
                <h2>Customer Details</h2>
                <button
                    className="btn"
                    onClick={() => (window.location.href = "#/app/customers")}
                    style={{ backgroundColor: "#ff5722", color: "white" }}
                >
                    Back
                </button>
            </div>

            <div className="container mt-4">
                {/* Customer Card */}
                <div>
                    <Card>
                        <Card.Body>
                            <div className="row">
                                <div className="col-xxl-5 col-12">
                                    <div className="d-sm-flex align-items-center mb-5 mb-xxl-0 flex-row text-sm-start">
                                        <div className="image image-circle image-lg-small w-100px">
                                        {customer.image ? (
                                                <img
                                                    src={customer.image}
                                                    height="50"
                                                    width="50"
                                                    alt="User Image"
                                                    className="image image-circle image-mini"
                                                />
                                            ) : (
                                                <span className="custom-user-avatar fs-5">
                                                    {getAvatarName(customer.name)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="ms-0 ms-md-10 mt-5 mt-sm-0">
                                            <h2>{customer.name}</h2>
                                            <span className="badge bg-light-success mb-2">
                                                Active
                                            </span>
                                            <h5>{customer.email}</h5>
                                            <h5>{customer.phone}</h5>
                                            <h5 className="text-warning"><strong>{customer.unique_code}</strong></h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                {/* Customer Details Table */}
                <table className="table table-bordered mt-4">
                    <tbody>
                        <tr>
                            <td>
                                <strong>Country</strong>
                            </td>
                            <td>{customer.country}</td>
                        </tr>
                        {/* <tr>
                            <td>
                                <strong>Region</strong>
                            </td>
                            <td>{customer.region}</td>
                        </tr> */}
                        <tr>
                            <td>
                                <strong>Area Name</strong>
                            </td>
                            <td>{customer.areaDetails.name}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>City</strong>
                            </td>
                            <td>{customer.city}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Credit Limit</strong>
                            </td>
                            <td>{customer.credit_limit}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Unique Code</strong>
                            </td>
                            <td>{customer.unique_code}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Distributor</strong>
                            </td>
                            <td>
                                {customer.distributor.first_name}{" "}
                                {customer.distributor.last_name} ({customer.distributor.email} | {customer.distributor.phone}
                                )
                            </td>
                        </tr>
                        {/* <tr>
                            <td>
                                <strong>Warehouse</strong>
                            </td>
                            <td>
                                {customer.warehouse.name} (
                                {customer.warehouse.email} | {customer.warehouse.phone})
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </MasterLayout>
    );
};

export default CustomerDetails;
