import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import MasterLayout from "../MasterLayout";
import { addNotificationTemplate } from "../../store/action/notificationTemplateAction";

const CreateNotificationTemplate = (props) => {
    const { id, singleSMSTemplate, addNotificationTemplate } = props;
    const navigate = useNavigate();

    const [smsTemplateValue, setsmsTemplateValue] = useState({
        title: singleSMSTemplate ? singleSMSTemplate[0].title : "",
        type: singleSMSTemplate ? singleSMSTemplate[0].type : "",
        cn_title: singleSMSTemplate ? singleSMSTemplate[0].cn_title : "",
        bn_title: singleSMSTemplate ? singleSMSTemplate[0].bn_title : "",
        content: singleSMSTemplate ? singleSMSTemplate[0].content : "",
        cn_content: singleSMSTemplate ? singleSMSTemplate[0].cn_content : "",
        bn_content: singleSMSTemplate ? singleSMSTemplate[0].bn_content : "",
    });

    const [errors, setErrors] = useState({
        title: "",
        type: "",
        cn_title: "",
        bn_title: "",
        content: "",
        cn_content: "",
        bn_content: "",
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
            addNotificationTemplate(smsTemplateValue, navigate);

            setsmsTemplateValue({
                title: "",
                type: "",
                cn_title: "",
                bn_title: "",
                content: "",
                cn_content: "",
                bn_content: "",
            });
        }
    };


    return (
        <MasterLayout>
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

                            {/* CN Title */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">CN Title</label>
                                <span className="required">*</span>
                                <input
                                    type="text"
                                    name="cn_title"
                                    placeholder="Enter CN title"
                                    className="form-control"
                                    onChange={onChangeInput}
                                    value={smsTemplateValue.cn_title}
                                />
                                {errors.cn_title && (
                                    <span className="text-danger mt-2 d-block">
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
                                    placeholder="Enter BN title"
                                    className="form-control"
                                    onChange={onChangeInput}
                                    value={smsTemplateValue.bn_title}
                                />
                                {errors.bn_title && (
                                    <span className="text-danger mt-2 d-block">
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

                            {/* CN Content */}
                            <div className="col-md-6 mb-3">
                                <label className="form-label">CN Content</label>
                                <span className="required">*</span>
                                <textarea
                                    name="cn_content"
                                    rows="5"
                                    placeholder="Enter CN content"
                                    className="form-control"
                                    onChange={onChangeInput}
                                    value={smsTemplateValue.cn_content}
                                />
                                {errors.cn_content && (
                                    <span className="text-danger mt-2 d-block">
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
                                    rows="5"
                                    placeholder="Enter BN content"
                                    className="form-control"
                                    onChange={onChangeInput}
                                    value={smsTemplateValue.bn_content}
                                />
                                {errors.bn_content && (
                                    <span className="text-danger mt-2 d-block">
                                        {errors.bn_content}
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
                                        (window.location.href = "#/app/user-notification-templates-list")
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

export default connect(null, { addNotificationTemplate })(
    CreateNotificationTemplate
);
