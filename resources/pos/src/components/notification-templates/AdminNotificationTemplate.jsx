import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import MasterLayout from "../MasterLayout";
import { addAdminNotificationTemplate } from "../../store/action/notificationTemplateAction";

const AdminNotificationTemplate = (props) => {
    const { addAdminNotificationTemplate , singleSMSTemplate } = props;
    const navigate = useNavigate();

    const [smsTemplateValue, setsmsTemplateValue] = useState({
        title: singleSMSTemplate ? singleSMSTemplate[0].title : "",
        type: singleSMSTemplate ? singleSMSTemplate[0].type : "",
        content: singleSMSTemplate ? singleSMSTemplate[0].content : "",
    });

    const [errors, setErrors] = useState({
        title: "",
        type: "",
        content: "",
    });

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

    const onChangeInput = (e) => {
        e.preventDefault();
        setsmsTemplateValue((inputs) => ({
            ...inputs,
            [e.target.name]: e.target.value,
        }));
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (valid) {
            addAdminNotificationTemplate(smsTemplateValue, navigate);
            setsmsTemplateValue({
                title: "",
                type: "",
                content: "",
            });
        }
    };

    return (
        <MasterLayout>
             <div className="d-flex justify-content-end">
                <button
                    className="btn mb-2"
                    onClick={() =>
                        (window.location.href =
                            "#/app/admin-notification-templates/create")
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
                            <div className="col-md-6 mb-3">
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
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary ms-2"
                                    onClick={() =>
                                        (window.location.href =
                                            "#/app/user-notification-templates-list")
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

export default connect(null, { addAdminNotificationTemplate })(
    AdminNotificationTemplate
);

