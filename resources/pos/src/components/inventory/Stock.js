import React, { useEffect, useState } from "react";
import MasterLayout from "../MasterLayout";
import axiosApi from "../../config/apiConfig";
import { Tokens } from "../../constants";

const Stock = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    const handleUpdatePrice = (id) => {
        window.location.href = "#/app/update-inventory-price/" + id;
    };

    const handleUpdateQuantity = (id) => {
        window.location.href = "#/app/create-stock/" + id;
    };

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem(Tokens.ADMIN);
            const response = await axiosApi.get("main-products", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log(response.data);
            // setProductImage(barcodeUrl);

            const productsArray = response.data.data.map((item) => ({
                id: item.id,
                name: item.attributes.name,
                code: item.attributes.code,
                imageUrls: item.attributes.images.imageUrls,
            }));
            console.log(productsArray);
            setProducts(productsArray);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );
    const totalPages = Math.ceil(products.length / productsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const placeholderImage = "https://example.com/path/to/placeholder.png";

    return (
        <MasterLayout>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2>Inventory</h2>
                    </div>
                </div>
                <div className="table-container mt-5">
                    <table className="table table-striped table-bordered mt-5">
                        <thead>
                            <tr>
                                <th className="text-dark">Product</th>
                                <th className="text-dark">Product Code</th>
                                <th className="text-dark">Product Name</th>
                                <th className="text-dark text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        {product.imageUrls &&
                                        product.imageUrls.length > 0 ? (
                                            <img
                                               className="image image-circle image-mini"
                                                src={product.imageUrls[0]}
                                                alt={`Image for ${product.name}`}
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                }}
                                            />
                                        ) : (
                                            <img
                                                className="image image-circle image-mini"
                                                src={placeholderImage}
                                                alt="No image available"
                                                style={{
                                                    width: "100px",
                                                    height: "auto",
                                                }}
                                            />
                                        )}
                                    </td>
                                    <td>{product.code}</td>
                                    <td>{product.name}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary mx-1"
                                            onClick={() =>
                                                handleUpdatePrice(product.id)
                                            }
                                        >
                                            Update Price
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleUpdateQuantity(product.id)
                                            }
                                            className="btn btn-success mx-1"
                                        >
                                            Update Quantity
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    {[...Array(totalPages).keys()].map((number) => (
                        <button
                            className="mx-2"
                            key={number + 1}
                            onClick={() => paginate(number + 1)}
                        >
                            {number + 1}
                        </button>
                    ))}
                </div>
            </div>
        </MasterLayout>
    );
};

export default Stock;
