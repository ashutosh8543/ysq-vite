import React, { useState, useEffect } from "react";
import MasterLayout from "../MasterLayout";
import axiosApi from "../../config/apiConfig";
import { Tokens } from "../../constants";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditGift = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [gift, setGift] = useState({
        title: "",
        cn_name: "",
        bn_name: "",
        discription: "",
        desc_in_china: "",
        desc_in_indonesia: "",
        quantity: "",
        image: null,
    });

    const [notification, setNotification] = useState({
        show: false,
        message: "",
        type: "",
    });

    const fetchGiftDetails = async (id) => {
        const token = localStorage.getItem(Tokens.ADMIN);
        try {
            const response = await axiosApi.get(`gift/detail/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setGift(response.data.gift);
        } catch (error) {
            console.error("Error fetching gift details:", error);
        }
    };

    useEffect(() => {
        fetchGiftDetails(id);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGift((prevGift) => ({
            ...prevGift,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setGift((prevGift) => ({
                ...prevGift,
                image: e.target.files[0],
            }));
        }
    };

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: "", type: "" });
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("title", gift.title);
            formData.append("discription", gift.discription);
            formData.append("desc_in_china", gift.desc_in_china);
            formData.append("desc_in_indonesia", gift.desc_in_indonesia);
            formData.append("quantity", gift.quantity);
            formData.append("cn_name", gift.cn_name);
            formData.append("bn_name", gift.bn_name);
            if (gift.image) {
                formData.append("image", gift.image);
            }

            const token = localStorage.getItem(Tokens.ADMIN);
            const response = await axiosApi.post(
                `gifts/update/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            showNotification("Gift updated successfully!", "success");
            setTimeout(() => {
                navigate("/app/gifts");
            }, 2000);
        } catch (error) {
            console.error(
                "Error updating gift:",
                error.response ? error.response.data : error.message
            );
            showNotification("Failed to update gift!", "danger");
        }
    };

    return (
        <MasterLayout>
            <div className="d-flex justify-content-between">
                <h2>Edit Gift</h2>
                <button
                    className="btn"
                    onClick={() => (window.location.href = "#/app/gifts")}
                    style={{ backgroundColor: "#ff5722", color: "white" }}
                >
                    Back
                </button>
            </div>
            {notification.show && (
                <div
                    className={`alert alert-${notification.type} alert-dismissible fade show`}
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
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            value={gift.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label>Name in Chinese:</label>
                        <input
                            type="text"
                            name="cn_name"
                            className="form-control"
                            value={gift.cn_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label>Name in Indonesian:</label>
                        <input
                            type="text"
                            name="bn_name"
                            className="form-control"
                            value={gift.bn_name}
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
                            value={gift.discription}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label>Description In Chinese:</label>
                        <textarea
                            name="desc_in_china"
                            className="form-control"
                            value={gift.desc_in_china}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-4">
                        <label>Description In Indonesian:</label>
                        <textarea
                            name="desc_in_indonesia"
                            className="form-control"
                            value={gift.desc_in_indonesia}
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
                            value={gift.quantity}
                            onChange={handleChange}
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
                        />
                        {gift.image && typeof gift.image === "object" ? (
                            <div className="mt-2">
                                <img
                                    src={URL.createObjectURL(gift.image)}
                                    alt="Preview"
                                    style={{
                                        height: "200px",
                                        width: "auto",
                                        objectFit: "cover",
                                    }}
                                    className="img-fluid mt-2"
                                />
                                <p className="mt-1">
                                    Selected Image: {gift.image.name}
                                </p>
                            </div>
                        ) : (
                            gift.image && (
                                <div className="mt-2">
                                    <img
                                        src={gift.image}
                                        alt="Current Gift"
                                        style={{
                                            height: "100px",
                                            width: "auto",
                                            objectFit: "cover",
                                        }}
                                        className="img-fluid mt-2"
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-2">
                    <button
                        className="btn"
                        style={{ backgroundColor: "#ff5722", color: "white" }}
                        type="submit"
                    >
                        Update
                    </button>
                </div>
            </form>
        </MasterLayout>
    );
};

export default EditGift;
