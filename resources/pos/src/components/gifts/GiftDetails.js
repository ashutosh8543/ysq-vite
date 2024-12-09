import React, { useState, useEffect } from "react";
import MasterLayout from "../MasterLayout";
import axiosApi from "../../config/apiConfig";
import { Tokens } from "../../constants";
import { useParams } from "react-router-dom";

const GiftDetails = () => {
    const { id } = useParams();
    const [gift, setGift] = useState({
        title: "",
        cn_name: "",
        bn_name: "",
        discription: "",
        desc_in_china: "",
        desc_in_indonesia: "",
        quantity: "",
        image: "",
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

    return (
        <MasterLayout>
            <div className="d-flex justify-content-between">
                <h2>Gift Details</h2>
                <button
                    className="btn"
                    onClick={() => (window.location.href = "#/app/gifts")}
                    style={{ backgroundColor: "#ff5722", color: "white" }}
                >
                    Back
                </button>
            </div>
            <div className="container mt-4">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Gift Details</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Title</strong></td>
                            <td>{gift.title}</td>
                        </tr>
                        <tr>
                            <td><strong>Chinese Name</strong></td>
                            <td>{gift.cn_name}</td>
                        </tr>
                        <tr>
                            <td><strong>Indonesian Name</strong></td>
                            <td>{gift.bn_name}</td>
                        </tr>
                        <tr>
                            <td><strong>Description</strong></td>
                            <td>{gift.discription}</td>
                        </tr>
                        <tr>
                            <td><strong>Description in Chinese</strong></td>
                            <td>{gift.desc_in_china}</td>
                        </tr>
                        <tr>
                            <td><strong>Description in Indonesian</strong></td>
                            <td>{gift.desc_in_indonesia}</td>
                        </tr>
                        <tr>
                            <td><strong>Quantity</strong></td>
                            <td>{gift.quantity}</td>
                        </tr>
                        <tr>
                            <td><strong>Gift Image</strong></td>
                            <td>
                                <img
                                    src={gift.image}
                                    alt={gift.title}
                                    className="img-fluid"
                                    style={{ height: '100px', width: 'auto' }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </MasterLayout>
    );
};

export default GiftDetails;
