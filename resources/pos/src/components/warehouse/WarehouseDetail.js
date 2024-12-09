import React, { useState, useEffect } from "react";
import MasterLayout from "../MasterLayout";
import axiosApi from "../../config/apiConfig";
import { Tokens } from "../../constants";
import { useParams } from "react-router-dom";
import { Card, Image } from "react-bootstrap"; // Import Image from react-bootstrap

const WarehouseDetails = () => {
    const { id } = useParams();
    const [warehouse, setWarehouse] = useState({
        name: "",
        email: "",
        phone: "",
        city: "",
        zip_code: "",
        unique_code: "",
        created_at: "",
        distributor: {},
        areaDetails: {},
        countryDetails: {},
        regionDetails: {},
    });

    const fetchWarehouseDetails = async (id) => {
        const token = localStorage.getItem(Tokens.ADMIN);
        try {
            const response = await axiosApi.get(`warehouses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const data = response.data.data.attributes;
            setWarehouse({
                name: data.name,
                email: data.email,
                phone: data.phone,
                city: data.city,
                zip_code: data.zip_code,
                unique_code: data.unique_code,
                created_at: data.created_at,
                distributor: data.user || {},
                areaDetails: data.areaDetails || {},
                countryDetails: data.countryDetails || {},
                regionDetails: data.regionDetails || {},
                warehouseDetails: data.warehouseDetails || {},
            });
        } catch (error) {
            console.error("Error fetching warehouse details:", error);
        }
    };

    useEffect(() => {
        fetchWarehouseDetails(id);
    }, [id]);

    const getAvatarName = (name) => {
        return name.charAt(0).toUpperCase();
    };

    return (
        <MasterLayout>
            <div className="d-flex justify-content-between">
                <h2>Warehouse Details</h2>
                <button
                    className="btn"
                    onClick={() => (window.location.href = "#/app/warehouse")}
                    style={{ backgroundColor: "#ff5722", color: "white" }}
                >
                    Back
                </button>
            </div>

            <div className="container mt-4">
                {/* Warehouse Card */}
                <div>
                    <Card>
                        <Card.Body>
                            <div className="row">
                                <div className="col-xxl-5 col-12">
                                    <div className="d-sm-flex align-items-center mb-5 mb-xxl-0 flex-row text-sm-start">
                                        <div className="image image-circle image-lg-small w-100px">
                                            <span className="user_avatar">
                                                {getAvatarName(warehouse.name)}
                                            </span>
                                        </div>
                                        <div className="ms-0 ms-md-10 mt-5 mt-sm-0">
                                            <h2>{warehouse.name}</h2>
                                            <span className="badge bg-light-success mb-2">
                                                Active
                                            </span>
                                            <h5>{warehouse.email}</h5>
                                            <h5>{warehouse.phone}</h5>
                                            <h5 className="text-warning">
                                                {
                                                    warehouse?.warehouseDetails
                                                        ?.unique_code
                                                }
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>

                {/* Warehouse Details Table */}
                <table className="table table-bordered mt-4">
                    <tbody>
                        <tr>
                            <td>
                                <strong>Country Name</strong>
                            </td>
                            <td>{warehouse.countryDetails.name}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Region Name</strong>
                            </td>
                            <td>{warehouse.regionDetails.name}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Area Name</strong>
                            </td>
                            <td>{warehouse.areaDetails.name}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Created At</strong>
                            </td>
                            <td>
                                {`${new Date(warehouse.created_at)
                                    .getDate()
                                    .toString()
                                    .padStart(2, "0")}-${(
                                    new Date(warehouse.created_at).getMonth() +
                                    1
                                )
                                    .toString()
                                    .padStart(2, "0")}-${new Date(
                                    warehouse.created_at
                                )
                                    .getFullYear()
                                    .toString()
                                    }`}
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <strong>Distributor</strong>
                            </td>
                            <td>
                                {warehouse.distributor.first_name}{" "}
                                {warehouse.distributor.last_name} (
                                {warehouse.distributor.email} |{" "}
                                {warehouse.distributor.phone} )
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </MasterLayout>
    );
};

export default WarehouseDetails;
