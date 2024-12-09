import React, { useState, useEffect } from "react";
import MasterLayout from "../MasterLayout";
import axiosApi from "../../config/apiConfig";
import { Tokens } from "../../constants";
import { useParams, useNavigate } from "react-router-dom";

const UserNotificationEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [notificationData, setNotificationData] = useState({
        title: "",
        type: "",
        cn_title: "",
        bn_title: "",
        content: "",
        cn_content: "",
        bn_content: "",
    });

    const [errors, setErrors] = useState({});

    const fetchNotificationDetails = async (id) => {
        const token = localStorage.getItem(Tokens.ADMIN);
        try {
            const response = await axiosApi.get(
                `user-notification-templates/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("notification data:", response.data);
            setNotificationData(response.data?.data);
        } catch (error) {
            console.error("Error fetching notification details:", error);
        }
    };

    useEffect(() => {
        fetchNotificationDetails(id);
    }, [id]);

    const onChangeInput = (e) => {
        setNotificationData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "",
        }));
    };

    const handleValidation = () => {
        const validationErrors = {};
        let isValid = true;

        for (const [key, value] of Object.entries(notificationData)) {
            if (typeof value === "string" && !value.trim()) {
                validationErrors[key] = `${key.replace("_", " ")} is required.`;
                isValid = false;
            }
        }

        setErrors(validationErrors);
        return isValid;
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        if (handleValidation()) {
            const token = localStorage.getItem(Tokens.ADMIN);

            try {
                const response = await axiosApi.put(
                    `user-notification-templates-update/${id}`,
                    notificationData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                setErrors({});
                navigate("/app/user-notification-templates-list");
            } catch (error) {
                console.error("Error updating notification template:", error);

                if (error.response) {
                    setErrors(error.response.data.errors || {});
                } else {
                    console.error("Unexpected error:", error.message);
                }
            }
        }
    };

    return (
        <MasterLayout>
            <div className="d-flex justify-content-end">
                <button
                    className="btn mb-2"
                    onClick={() =>
                        (window.location.href =
                            "#/app/user-notification-templates-list")
                    }
                    style={{ backgroundColor: "#ff5722", color: "white" }}
                >
                    Back
                </button>
            </div>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <div className="row">
                            {/* Title */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Title</label>
                                <span className="required">*</span>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    placeholder="Enter title"
                                    value={notificationData.title}
                                    onChange={onChangeInput}
                                />
                                {errors.title && (
                                    <span className="text-danger">
                                        {errors.title}
                                    </span>
                                )}
                            </div>

                            {/* Type */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Type</label>
                                <span className="required">*</span>
                                <input
                                    type="text"
                                    name="type"
                                    className="form-control"
                                    placeholder="Enter type"
                                    value={notificationData.type}
                                    onChange={onChangeInput}
                                />
                                {errors.type && (
                                    <span className="text-danger">
                                        {errors.type}
                                    </span>
                                )}
                            </div>

                            {/* CN Title */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">CN Title</label>
                                <span className="required">*</span>
                                <input
                                    type="text"
                                    name="cn_title"
                                    className="form-control"
                                    placeholder="Enter CN title"
                                    value={notificationData.cn_title}
                                    onChange={onChangeInput}
                                />
                                {errors.cn_title && (
                                    <span className="text-danger">
                                        {errors.cn_title}
                                    </span>
                                )}
                            </div>

                            {/* BN Title */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">BN Title</label>
                                <span className="required">*</span>
                                <input
                                    type="text"
                                    name="bn_title"
                                    className="form-control"
                                    placeholder="Enter BN title"
                                    value={notificationData.bn_title}
                                    onChange={onChangeInput}
                                />
                                {errors.bn_title && (
                                    <span className="text-danger">
                                        {errors.bn_title}
                                    </span>
                                )}
                            </div>

                            {/* Content */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">Content</label>
                                <span className="required">*</span>
                                <textarea
                                    name="content"
                                    className="form-control"
                                    placeholder="Enter content"
                                    value={notificationData.content}
                                    onChange={onChangeInput}
                                />
                                {errors.content && (
                                    <span className="text-danger">
                                        {errors.content}
                                    </span>
                                )}
                            </div>

                            {/* CN Content */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">CN Content</label>
                                <span className="required">*</span>
                                <textarea
                                    name="cn_content"
                                    className="form-control"
                                    placeholder="Enter CN content"
                                    value={notificationData.cn_content}
                                    onChange={onChangeInput}
                                />
                                {errors.cn_content && (
                                    <span className="text-danger">
                                        {errors.cn_content}
                                    </span>
                                )}
                            </div>

                            {/* BN Content */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">BN Content</label>
                                <span className="required">*</span>
                                <textarea
                                    name="bn_content"
                                    className="form-control"
                                    placeholder="Enter BN content"
                                    value={notificationData.bn_content}
                                    onChange={onChangeInput}
                                />
                                {errors.bn_content && (
                                    <span className="text-danger">
                                        {errors.bn_content}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Footer buttons */}
                        <div className="row mt-3">
                            <div className="col-12 text-end">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={
                                        !Object.values(notificationData).every(
                                            (value) =>
                                                typeof value === "string"
                                                    ? value.trim()
                                                    : true
                                        )
                                    }
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary ms-2"
                                    onClick={() =>
                                        navigate(
                                            "/app/user-notification-templates-list"
                                        )
                                    }
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </MasterLayout>
    );
};

export default UserNotificationEdit;
