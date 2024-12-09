import React, { useEffect, useState } from "react";
import MasterLayout from "../MasterLayout";
import { connect } from "react-redux";
import TabTitle from "../../shared/tab-title/TabTitle";
import { fetchLanguageContentDetails } from "../../store/action/languageAction";
import { updateLanguageContents } from "../../store/action/languageAction";
import { useNavigate, useParams } from "react-router-dom";

const EditLanguageContent = (props) => {
    const {
        fetchLanguageContentDetails,
        updateLanguageContents,
        languageContentsDetail,
    } = props;
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        string: "",
        en: "",
        bn: "",
        cn: "",
        active: "active",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) {
            fetchLanguageContentDetails(id);
        }
    }, [id, fetchLanguageContentDetails]);

    useEffect(() => {
        if (languageContentsDetail && languageContentsDetail.id) {
            setFormData({
                string: languageContentsDetail.string || "",
                en: languageContentsDetail.en || "",
                bn: languageContentsDetail.bn || "",
                cn: languageContentsDetail.cn || "",
                active: languageContentsDetail.active ? "active" : "inactive", // Convert boolean to string for dropdown
            });
        }
    }, [languageContentsDetail]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const finalFormData = {
            ...formData,
            active: formData.active === "active",
        };

        try {
            await updateLanguageContents(id, finalFormData, navigate);
            setLoading(false);
            navigate("/app/language-contents");
        } catch (err) {
            setError("Failed to update language content, please try again.");
            setLoading(false);
        }
    };

    return (
        <MasterLayout>
            <TabTitle title="Edit Language Content" />
            <div className="d-flex justify-content-end">
                <button
                    className="btn"
                    onClick={() => navigate("/app/language-contents")}
                    style={{ backgroundColor: "#ff5722", color: "white" }}
                >
                    Back
                </button>
            </div>
            <h1>Edit Language Content</h1>

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
                        disabled
                    />
                </div>

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

                {/* Status Dropdown for Active/Inactive */}
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

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>
                </div>
            </form>
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { languageContentsDetail } = state;
    return { languageContentsDetail };
};

const mapDispatchToProps = {
    fetchLanguageContentDetails,
    updateLanguageContents,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditLanguageContent);
