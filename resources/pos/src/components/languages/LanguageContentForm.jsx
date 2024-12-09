import React, { useState } from "react";
import MasterLayout from "../MasterLayout";
import { connect } from "react-redux";
import TabTitle from "../../shared/tab-title/TabTitle";
import { addLanguageContents } from "../../store/action/languageAction";
import { useNavigate } from "react-router-dom";

const LanguageContentForm = (props) => {
    const { addLanguageContents } = props;
    const [formData, setFormData] = useState({
        string: "",
        en: "",
        bn: "",
        cn: "",
        active: "active",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const finalFormData = {
            ...formData,
            active: formData.active === "active",
        };

        try {
            await addLanguageContents(finalFormData, navigate);
            setFormData({
                string: "",
                en: "",
                bn: "",
                cn: "",
                active: "active",
            });
            setLoading(false);
        } catch (err) {
            setError("Failed to create language content, please try again.");
            setLoading(false);
        }
    };

    return (
        <MasterLayout>
            <TabTitle title="Language Content Form" />
            <div className="d-flex justify-content-end">
               <button
                    className="btn"
                    onClick={() => navigate("/app/language-contents")}
                    style={{ backgroundColor: "#ff5722", color: "white" }}
                >
                    Back
                </button>
            </div>
            <h1>Create Language Content</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="string" className="form-label">
                        String (Key)
                    </label>
                    <input
                        type="text"
                        id="string"
                        name="string"
                        className="form-control"
                        value={formData.string}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* English Translation Input */}
                <div className="mb-3">
                    <label htmlFor="en" className="form-label">
                        English Translation
                    </label>
                    <input
                        type="text"
                        id="en"
                        name="en"
                        className="form-control"
                        value={formData.en}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Bahasa Indonesia Input */}
                <div className="mb-3">
                    <label htmlFor="bn" className="form-label">
                        Bahasa Indonesia
                    </label>
                    <input
                        type="text"
                        id="bn"
                        name="bn"
                        className="form-control"
                        value={formData.bn}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Chinese Translation Input */}
                <div className="mb-3">
                    <label htmlFor="cn" className="form-label">
                        Chinese Translation
                    </label>
                    <input
                        type="text"
                        id="cn"
                        name="cn"
                        className="form-control"
                        value={formData.cn}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {/* Status Dropdown */}
                <div className="mb-3">
                    <label htmlFor="active" className="form-label">
                        Status
                    </label>
                    <select
                        id="active"
                        name="active"
                        className="form-select"
                        value={formData.active}
                        onChange={handleInputChange}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {/* Submit Button */}
                <div className="mb-3">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
        </MasterLayout>
    );
};

const mapDispatchToProps = {
    addLanguageContents,
};

export default connect(null, mapDispatchToProps)(LanguageContentForm);
