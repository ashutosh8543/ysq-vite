import React, { useState, useEffect } from "react";
import MasterLayout from "../MasterLayout";
import axiosApi from "../../config/apiConfig";
import { connect } from "react-redux";
import { Tokens } from "../../constants";
import { useNavigate } from "react-router-dom";
import { fetchCountry } from "../../store/action/countryAction";

const Add = (props) => {
    const { fetchCountry, countries } = props;
    const loginUserArray = JSON.parse(localStorage.getItem("loginUserArray"));
    const [formData, setFormData] = useState({
        title: "",
        discription: "",
        image: null,
        quantity: "",
        cn_name: "",
        bn_name: "",
        desc_in_china: "",
        desc_in_indonesia: "",
        country: "",
    });

    const navigate = useNavigate();

    const [notification, setNotification] = useState({
        show: false,
        message: "",
        type: "",
    });

    useEffect(() => {
        fetchCountry();
    }, [fetchCountry]);

    const isAdmin =
        loginUserArray &&
        (loginUserArray.role_id === 1 || loginUserArray.role_id === 2);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: "", type: "" });
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSubmit.append(key, formData[key]);
        });

        try {
            const token = localStorage.getItem(Tokens.ADMIN);
            const response = await axiosApi.post(
                "store-gift",
                formDataToSubmit,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(response.data);
            showNotification("Gift added successfully!", "success");

            setTimeout(() => {
                navigate("/app/gifts");
            }, 2000);
        } catch (error) {
            console.error("Error:", error);
            showNotification("Failed to add gift!", "danger");
        }
    };

    return (
        <MasterLayout>
            <div className="d-flex justify-content-between">
                <h2>Add Gift</h2>
                <button
                    className="btn"
                    onClick={() => (window.location.href = "#/app/gifts")}
                    style={{ backgroundColor: "#ff5722", color: "#fff" }}
                >
                    Back
                </button>
            </div>
            {notification.show && (
                <div
                    className={`alert alert-${notification.type} alert-dismissible fade show text-white`}
                    role="alert"
                    style={{ color: "#fff" }}
                >
                    {notification.message}
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() =>
                            setNotification({
                                show: false,
                                message: "",
                                type: "",
                            })
                        }
                    ></button>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter Name Here"
                            className="form-control"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label>Name in Chinese:</label>
                        <input
                            type="text"
                            name="cn_name"
                            placeholder="Enter Name in china Here"
                            className="form-control"
                            value={formData.cn_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label>Name in Indonesia:</label>
                        <input
                            type="text"
                            name="bn_name"
                            placeholder="Enter Name in Indonesia Here"
                            className="form-control"
                            value={formData.bn_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-4">
                        <label>Description:</label>
                        <textarea
                            name="discription"
                            className="form-control"
                            placeholder="Enter Description Here"
                            value={formData.discription}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label>Description In Chinese:</label>
                        <textarea
                            name="desc_in_china"
                            className="form-control"
                            value={formData.desc_in_china}
                            onChange={handleChange}
                            placeholder="Enter Description in china"
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label>Description In Indonesia:</label>
                        <textarea
                            name="desc_in_indonesia"
                            className="form-control"
                            placeholder="Enter Description in Indonesia"
                            value={formData.desc_in_indonesia}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-4">
                        <label>Quantity:</label>
                        <input
                            type="number"
                            className="form-control"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            placeholder="Enter Qunatity"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label>Image:</label>
                        <input
                            type="file"
                            className="form-control"
                            name="image"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                </div>

                {/* Country Dropdown */}
                {isAdmin && (
                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label>Country:</label>
                            <select
                                name="country"
                                className="form-control"
                                value={formData.country}
                                onChange={handleChange}
                                required
                            >
                                {countries.map((country) => (
                                    <option key={country.id} value={country.id}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                <div className="d-flex justify-content-end mt-2">
                    <button
                        className="btn"
                        style={{ backgroundColor: "#ff5722", color: "#fff" }}
                        type="submit"
                    >
                        Add Gift
                    </button>
                </div>
            </form>
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { countries } = state;
    return { countries };
};

export default connect(mapStateToProps, { fetchCountry })(Add);
