import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import MasterLayout from "../MasterLayout";
import {
    fetchSingleNotificationTemplate,
    updateAdminNotificationTemplate,
} from "../../store/action/notificationTemplateAction";

const EditAdminNotificationTemplate = (props) => {
    const {
        fetchSingleNotificationTemplate,
        updateAdminNotificationTemplate,
        adminNotificationsDetail,
    } = props;
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchSingleNotificationTemplate(id);
    }, [id, fetchSingleNotificationTemplate]);

    const [smsTemplateValue, setsmsTemplateValue] = useState({
        title: "",
        type: "",
        content: "",
    });

    const [errors, setErrors] = useState({
        title: "",
        type: "",
        content: "",
    });

    useEffect(() => {
        if (
            adminNotificationsDetail &&
            adminNotificationsDetail.id === parseInt(id)
        ) {
            setsmsTemplateValue({
                title: adminNotificationsDetail.title || "",
                type: adminNotificationsDetail.type || "",
                content: adminNotificationsDetail.content || "",
            });
        }
    }, [adminNotificationsDetail, id]);

    const onChangeInput = (e) => {
        e.preventDefault();
        setsmsTemplateValue((inputs) => ({
            ...inputs,
            [e.target.name]: e.target.value,
        }));
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleValidation = () => {
        let errorss = {};
        let isValid = true;

        for (const [key, value] of Object.entries(smsTemplateValue)) {
            if (!value) {
                errorss[key] = `${key.replace("_", " ")} is required.`;
                isValid = false;
            }
        }

        setErrors(errorss);
        return isValid;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (valid) {
            updateAdminNotificationTemplate(id, smsTemplateValue, navigate);
        }
    };

    if (
        !adminNotificationsDetail ||
        adminNotificationsDetail.id !== parseInt(id)
    ) {
        return <div>Loading...</div>;
    }

    return (
        <MasterLayout>
            <div className="d-flex justify-content-end">
                <button
                    className="btn mb-2"
                    onClick={() =>
                        navigate("/app/admin-notification-templates-list")
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
                                    placeholder="Enter title"
                                    className="form-control"
                                    onChange={onChangeInput}
                                    value={smsTemplateValue.title}
                                />
                                {errors.title && (
                                    <span className="text-danger mt-2 d-block">
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
                                    placeholder="Enter type"
                                    className="form-control"
                                    onChange={onChangeInput}
                                    value={smsTemplateValue.type}
                                />
                                {errors.type && (
                                    <span className="text-danger mt-2 d-block">
                                        {errors.type}
                                    </span>
                                )}
                            </div>

                            {/* Content */}
                            <div className="col-md-12 mb-3">
                                <label className="form-label">Content</label>
                                <span className="required">*</span>
                                <textarea
                                    name="content"
                                    rows="5"
                                    placeholder="Enter content"
                                    className="form-control"
                                    onChange={onChangeInput}
                                    value={smsTemplateValue.content}
                                />
                                {errors.content && (
                                    <span className="text-danger mt-2 d-block">
                                        {errors.content}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="row mt-3">
                            <div className="col-12 text-end">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={
                                        !Object.values(smsTemplateValue).every(
                                            (value) => value.trim()
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
                                            "/app/admin-notification-templates-list"
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

const mapStateToProps = (state) => {
    const { adminNotificationsDetail } = state;
    return { adminNotificationsDetail };
};

export default connect(mapStateToProps, {
    fetchSingleNotificationTemplate,
    updateAdminNotificationTemplate,
})(EditAdminNotificationTemplate);
