import React, { useState, useEffect } from "react";
import MasterLayout from "../MasterLayout";
import axiosApi from "../../config/apiConfig";
import { Tokens } from "../../constants";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

const QuestionDetail = () => {
    const { id } = useParams();
    const [questionDetails, setQuestionDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchQuestionDetails = async (id) => {
        const token = localStorage.getItem(Tokens.ADMIN);
        try {
            const response = await axiosApi.get(`questions/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            setQuestionDetails(response.data.data);
        } catch (error) {
            console.error("Error fetching question details:", error);
            setError("Failed to fetch question details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestionDetails(id);
    }, [id]);

    if (loading)
        return (
            <div className="text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    if (error) return <div className="alert alert-danger">{error}</div>;

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
            {questionDetails && (
                <div className="container mt-5">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="mb-0">{questionDetails.question}</h2>
                        </div>
                        <div className="card-body">
                            <p className="card-text">
                                <strong>Status:</strong>{" "}
                                {questionDetails.status}
                            </p>
                            <p className="card-text">
                                <strong>Created At:</strong>{" "}
                                {moment(
                                    questionDetails.created_at
                                ).format('DD-MM-yyyy')}
                            </p>
                            <h4>Options:</h4>
                            <ol className="list-group">
                                {questionDetails.options.map(
                                    (option, index) => (
                                        <li
                                            key={option.id}
                                            className="list-group-item"
                                        >{`${index + 1}. ${option.option}`}</li>
                                    )
                                )}
                            </ol>
                        </div>
                    </div>
                </div>
            )}
        </MasterLayout>
    );
};

export default QuestionDetail;
