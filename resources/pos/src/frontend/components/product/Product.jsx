import React, { useEffect, useState } from "react";
import { Card, Badge } from "react-bootstrap-v5";
import { connect, useDispatch } from "react-redux";
import useSound from "use-sound";
import { posFetchProduct } from "../../../store/action/pos/posfetchProductAction";
import { posAllProduct } from "../../../store/action/pos/posAllProductAction";
import productImage from "../../../assets/images/brand_logo.png";
import { addToast } from "../../../store/action/toastAction";
import {
    currencySymbolHandling,
    getFormattedMessage,
} from "../../../shared/sharedMethod";
import { toastType } from "../../../constants";
import Skelten from "../../../shared/components/loaders/Skelten";

const Product = (props) => {
    const {
        posAllProducts,
        posFetchProduct,
        cartProducts,
        updateCart,
        customCart,
        cartProductIds,
        setCartProductIds,
        wareHouseId,
        filterProds,
        settings,
        productMsg,
        newCost,
        selectedOption,
        allConfigData,
        isLoading,
    } = props;
    const [updateProducts, setUpdateProducts] = useState([]);
    const [play] =
        useSound();
    const dispatch = useDispatch();

    useEffect(() => {
        cartProducts && setUpdateProducts(cartProducts);
        const ids = updateProducts.map((item) => {
            return item.id;
        });
        setCartProductIds(ids);
    }, [updateProducts, cartProducts]);

    // console.log("updated products:",  updateProducts);


    const addToCart = (product) => {
        // play();
        posFetchProduct(product.id);
        addProductToCart(product);
    };


    const addProductToCart = (product) => {
        const updateProducts = posAllProducts
            .filter((item) => item.id === product.id)
            .map((item) => item.attributes.productInventoriesDetails);

        const newId = posAllProducts
            .filter((item) => item.id === product.id)
            .map((item) => item.id);
        const finalIdArrays = customCart.map((id) => id.product_id);
        const finalId = finalIdArrays.filter(
            (finalIdArray) => finalIdArray === newId[0]
        );


        const pushArray = [...customCart];
        const newProduct = pushArray.find(
            (element) => element.id === finalId[0]
        );

        const filterQty = updateProducts
            .filter((item) => item.id === product.id)
            .map((qty) => qty.quantity)[0];

        if (
            updateProducts.filter((item) => item.id === product.id).length > 0
        ) {
            if (filterQty >= product.attributes.quantity) {
                dispatch(
                    addToast({
                        text: getFormattedMessage(
                            "pos.quantity.exceeds.quantity.available.in.stock.message"
                        ),
                        type: toastType.ERROR,
                    })
                );
            } else {
                setUpdateProducts((updateProducts) =>
                    updateProducts.map((item) =>
                        item.id === product.id
                            ? {
                                  ...item,
                                  quantity:
                                      product.attributes.quantity >
                                      item.quantity
                                          ? item.quantity + 1
                                          : item.quantity,
                              }
                            : item
                    )
                );
                updateCart(updateProducts, product);
            }
        } else {
            const productToAdd = {
                id: product.id,
                name: product.attributes.name,
                quantity: 0,
                price: product.attributes.price,
                productDetails: product,
            };

            setUpdateProducts((prevSelected) => [...prevSelected, productToAdd]);
            updateCart((prevSelected) => [...prevSelected, productToAdd]);
        }
    };




    const isProductExistInCart = (productId) => {
        return cartProductIds.includes(productId);
    };

    const posFilterProduct =
    filterProds &&
    filterProds.map((product) => {
        const filteredInventories = product.attributes.productInventoriesDetails.filter(
            (inventory) => inventory.warehouse_id === wareHouseId
        );

        const totalQuantity = filteredInventories.length
            ? filteredInventories[0].warehouse_quantities
            : 0;

        return {
            ...product,
            attributes: {
                ...product.attributes,
                quantity: totalQuantity,
            },
        };
    }).filter((product) => product.attributes.quantity > 0);


    const loadAllProduct = (product, index) => {
        return product.attributes.quantity > 0 ? (
            <div
                className="product-custom-card"
                key={index}
                onClick={() => addToCart(product)}
            >
                <Card
                    className={`position-relative h-100 ${
                        isProductExistInCart(product.id) ? "product-active" : ""
                    }`}
                >
                    <Card.Img
                        variant="top"
                        src={
                            product.attributes.images.imageUrls
                                ? product.attributes.images.imageUrls[0]
                                : productImage
                        }
                    />
                    <Card.Body className="px-2 pt-2 pb-1 custom-card-body">
                        <h6 className="product-title mb-0 text-gray-900">
                            {product.attributes?.name}
                        </h6>
                        <span className="fs-small text-gray-700">
                            {product.attributes?.code}
                        </span>
                        <p className="m-0 item-badges">
                            <Badge
                                bg="info"
                                text="white"
                                className="product-custom-card__card-badge"
                            >
                                {product.attributes.quantity}{" "}
                                {product?.attributes?.product_unit_name?.name}
                            </Badge>
                        </p>
                    </Card.Body>
                </Card>
            </div>
        ) : null;
    };


    return (
        <div
            className={`${
                posFilterProduct && posFilterProduct.length === 0
                    ? "d-flex align-items-center justify-content-center"
                    : ""
            } product-list-block pt-1`}
        >
            <div className="d-flex flex-wrap product-list-block__product-block w-100">
                {posFilterProduct && posFilterProduct.length === 0 ? (
                    isLoading ? (
                        <Skelten />
                    ) : (
                        <h4 className="m-auto">
                            {getFormattedMessage(
                                "pos-no-product-available.label"
                            )}
                        </h4>
                    )
                ) : (
                    posFilterProduct.map((product, index) => loadAllProduct(product, index))
                )}
            </div>
        </div>
    );

};

const mapStateToProps = (state) => {
    const { posAllProducts, allConfigData, isLoading } = state;
    return { posAllProducts, allConfigData, isLoading };
};

export default connect(mapStateToProps, { posAllProduct, posFetchProduct })(
    Product
);
