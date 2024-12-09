import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MasterLayout from "../MasterLayout";
import axiosApi from "../../config/apiConfig";
import { useParams } from "react-router-dom";
import { Tokens } from "../../constants";
import { addToast } from "../../store/action/toastAction";
import { useNavigate } from "react-router-dom";

const EditQuestion = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [questionData, setQuestionData] = useState({
        question: "",
        status: "Active",
        options: [],
    });
    const [newOption, setNewOption] = useState("");
    const token = localStorage.getItem(Tokens.ADMIN);

    useEffect(() => {
        const fetchQuestionData = async () => {
            try {
                const response = await axiosApi.get(`questions/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                setQuestionData({
                    ...response.data.data,
                    options: response.data.data.options || [],
                });
            } catch (error) {
                console.error("Error fetching question data:", error);
            }
        };

        fetchQuestionData();
    }, [id, token]);

    const handleInputChange = (index, value) => {
        const updatedOptions = [...questionData.options];
        updatedOptions[index].option = value;
        setQuestionData({ ...questionData, options: updatedOptions });
    };

    const handleAddOption = (e) => {
        e.preventDefault();
        if (newOption.trim()) {
            const existingIds = questionData.options.map(option => option.id);
            const newId = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;

            setQuestionData((prev) => ({
                ...prev,
                options: [
                    ...prev.options,
                    { option: newOption, id: newId },
                ],
            }));
            setNewOption("");
        }
    };


    const handleRemoveOption = (index) => {
        const updatedOptions = questionData.options.filter(
            (_, i) => i !== index
        );
        setQuestionData({ ...questionData, options: updatedOptions });
    };

    const handleUpdateQuestion = async (e) => {
        e.preventDefault();
        const updatedData = {
            question: questionData.question,
            status: questionData.status,
            option: questionData.options.map((opt) => ({
                id: opt.id || null,
                option: opt.option,
            })),
        };


        try {
            await axiosApi.post(`questions/update/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            dispatch(
                addToast({
                    text: "Question updated successfully!",
                    type: "success",
                })
            );
            navigate("/app/question");
        } catch (error) {
            console.error("Error updating question:", error);
            dispatch(
                addToast({
                    text: error.response?.data?.message || "An error occurred.",
                    type: "error",
                })
            );
        }
    };

    if (!questionData) return <div>Loading...</div>;

    return (
        <MasterLayout>
             <div className="d-flex justify-content-between">
                <h2>Question Details</h2>
                <button
                    className="btn"
                    onClick={() => (window.location.href = "#/app/question")}
                    style={{ backgroundColor: "#ff5722", color: "white" }}
                >
                    Back
                </button>
            </div>
            <div className="container mt-5">
                <h2>Edit Question</h2>
                <form onSubmit={handleUpdateQuestion}>
                    <div className="mb-3">
                        <label className="form-label">Question</label>
                        <input
                            type="text"
                            className="form-control"
                            value={questionData.question}
                            onChange={(e) =>
                                setQuestionData({
                                    ...questionData,
                                    question: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select
                            className="form-select"
                            value={questionData.status}
                            onChange={(e) =>
                                setQuestionData({
                                    ...questionData,
                                    status: e.target.value,
                                })
                            }
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <h4>Options:</h4>
                    {questionData.options.map((option, index) => (
                        <div
                            className="mb-3 d-flex align-items-center"
                            key={option.id}
                        >
                            <label className="form-label me-2">
                                Option {index + 1}
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={option.option}
                                onChange={(e) =>
                                    handleInputChange(index, e.target.value)
                                }
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-danger ms-2"
                                onClick={() => handleRemoveOption(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="mb-3">
                        <label className="form-label">Add New Option</label>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                value={newOption}
                                onChange={(e) => setNewOption(e.target.value)}
                            />
                            <button
                                className="btn btn-outline-secondary"
                                onClick={handleAddOption}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Update Question
                    </button>
                </form>
            </div>
        </MasterLayout>
    );
};

export default EditQuestion;
