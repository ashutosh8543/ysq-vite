import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, Table } from "react-bootstrap-v5";
import { connect, useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import Category from "./Category.js";
import Brands from "./Brand.js";
import Product from "./product/Product.js";
import ProductCartList from "./cart-product/ProductCartList.js";
import {
    posSearchNameProduct,
    posSearchCodeProduct,
} from "../../store/action/pos/posfetchProductAction.js";
import ProductSearchbar from "./product/ProductSearchbar.js";
import { prepareCartArray } from "../shared/PrepareCartArray.js";
import ProductDetailsModel from "../shared/ProductDetailsModel.js";
import CartItemMainCalculation from "./cart-product/CartItemMainCalculation.js";
import PosHeader from "./header/PosHeader.js";
import { posCashPaymentAction } from "../../store/action/pos/posCashPaymentAction.js";
import PaymentButton from "./cart-product/PaymentButton.js";
import CashPaymentModel from "./cart-product/paymentModel/CashPaymentModel.js";
import PrintData from "./printModal/PrintData.js";
import PaymentSlipModal from "./paymentSlipModal/PaymentSlipModal.js";
import { fetchFrontSetting } from "../../store/action/frontSettingAction.js";
import { fetchSetting } from "../../store/action/settingAction.js";
import { calculateProductCost } from "../shared/SharedMethod.js";
import {
    fetchBrandClickable,
    posAllProduct,
} from "../../store/action/pos/posAllProductAction.js";
import TabTitle from "../../shared/tab-title/TabTitle.js";
import HeaderAllButton from "./header/HeaderAllButton.js";
import RegisterDetailsModel from "./register-detailsModal/RegisterDetailsModel.js";
import PrintRegisterDetailsData from "./printModal/PrintRegisterDetailsData.js";
import {
    closeRegisterAction,
    fetchTodaySaleOverAllReport,
    getAllRegisterDetailsAction,
} from "../../store/action/pos/posRegisterDetailsAction.js";
import {
    getFormattedMessage,
    getFormattedOptions,
} from "../../shared/sharedMethod.js";
import {
    discountType,
    paymentMethodOptions,
    toastType,
} from "../../constants/index.js";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar.js";
import CustomerForm from "./customerModel/CustomerForm.js";
import HoldListModal from "./holdListModal/HoldListModal.js";
import { fetchHoldLists } from "../../store/action/pos/HoldListAction.js";
import { useNavigate } from "react-router";
import PosCloseRegisterDetailsModel from "../../components/posRegister/PosCloseRegisterDetailsModel.js";
import { addToast } from "../../store/action/toastAction.js";
import { Button } from "react-bootstrap-v5";
import { loadProductstoSalesMan } from "../../store/action/loadUnloadAction.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Tokens } from "../../constants";
import Select from "react-select";
import axiosApi from "../../config/apiConfig";

const PosLoadMainPage = (props) => {
    const {
        onClickFullScreen,
        posAllProducts,
        customCart,
        posCashPaymentAction,
        frontSetting,
        fetchFrontSetting,
        settings,
        fetchSetting,
        paymentDetails,
        allConfigData,
        fetchBrandClickable,
        posAllTodaySaleOverAllReport,
        fetchHoldLists,
        holdListData,
        loadProductstoSalesMan,
    } = props;
    const componentRef = useRef();
    const registerDetailsRef = useRef();
    // const [play] = useSound('https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3');
    const [openCalculator, setOpenCalculator] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [updateProducts, setUpdateProducts] = useState([]);
    const [isOpenCartItemUpdateModel, setIsOpenCartItemUpdateModel] =
        useState(false);
    const [product, setProduct] = useState(null);
    const [cartProductIds, setCartProductIds] = useState([]);
    const [newCost, setNewCost] = useState("");
    const [paymentPrint, setPaymentPrint] = useState({});
    const [cashPayment, setCashPayment] = useState(false);
    const [modalShowPaymentSlip, setModalShowPaymentSlip] = useState(false);
    const [modalShowCustomer, setModalShowCustomer] = useState(false);
    const [productMsg, setProductMsg] = useState(0);
    const [brandId, setBrandId] = useState();
    const [categoryId, setCategoryId] = useState();
    const [selectedCustomerOption, setSelectedCustomerOption] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [updateHolList, setUpdateHoldList] = useState(false);
    const [hold_ref_no, setHold_ref_no] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [salesmen, setSalesmen] = useState([]);
    const [warehouse, setWarehouse] = useState([]);
    const [allWarehouse, setAllWarehouse] = useState([]);
    const [selectedSalesmanId, setSelectedSalesmanId] = useState("");
    const [selectedWarehouseId, setSelectedWarehouseId] = useState("");
    const [selectedWarehouse, setSelectedWarehouse] = useState(null);
    const [filteredSalesmen, setFilteredSalesmen] = useState([]);
    const [filteredsProduct, setFilteredsProduct] = useState([]);
    const [cartItemValue, setCartItemValue] = useState({
        discount_type: discountType.FIXED,
        discount_value: 0,
        discount: 0,
        tax: 0,
        shipping: 0,
    });
    const qtyCart = updateProducts.filter((a) => a.quantity === 0);

    const [cashPaymentValue, setCashPaymentValue] = useState({
        notes: "",
        payment_status: {
            label: getFormattedMessage("dashboard.recentSales.paid.label"),
            value: 1,
        },
    });
    const [errors, setErrors] = useState({ notes: "", date: "" });
    // const [searchString, setSearchString] = useState('');
    const [changeReturn, setChangeReturn] = useState(0);
    const [showCloseDetailsModal, setShowCloseDetailsModal] = useState(false);
    const { closeRegisterDetails } = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllWarehouses = async () => {
            try {
                const token = localStorage.getItem(Tokens.ADMIN);
                const response = await axiosApi.get("warehouses", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                setWarehouse(response.data?.data);
                setAllWarehouse(response.data?.data);
            } catch (error) {
                console.error("Error fetching all warehouse:", error);
            }
        };
        fetchAllWarehouses();
    }, []);

    useEffect(() => {
        const fetchAllSalesmen = async () => {
            try {
                const token = localStorage.getItem(Tokens.ADMIN);
                const response = await axiosApi.get("show-salesman", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                setSalesmen(response.data);
            } catch (error) {
                console.error("Error fetching all salesmen:", error);
            }
        };

        fetchAllSalesmen();
    }, []);

    const setSelectedSalesman = (obj) => {
        setSelectedSalesmanId(obj.value);
    };

    let warehouse_id = "";

    const handleWarehouseChange = (selectedOption) => {
        // console.log("selected warehouse:", selectedOption);
        setSelectedWarehouse(selectedOption);
        setSelectedWarehouseId(selectedOption.value);
        warehouse_id = selectedOption.value;
        const allWarehouses = allWarehouse.find(
            (item) => item.attributes.ware_id === selectedOption.value
        );
        console.log("warehouse:", allWarehouses);
        setSelectedWarehouseId(allWarehouses?.id);

        if (selectedOption) {
            const filteredProducts = posAllProducts.filter((product) => {
                return product.attributes.productInventoriesDetails.some(
                    (inventory) => inventory.warehouse_id === allWarehouses?.id
                );
            });
            setFilteredsProduct(filteredProducts);
            const filteredSalesmen = salesmen.filter(
                (salesman) => salesman.ware_id === selectedOption.value
            );

            setFilteredSalesmen(filteredSalesmen);
        } else {
            setFilteredSalesmen(salesmen);
        }
    };


    const onDeleteCartItem = (productId) => {
        const productToRemove = updateProducts.find((item) => item.id === productId);

        if (productToRemove) {
            const cartQuantity = productToRemove.quantity || 0;
            // console.log("Cart Quantity to Restore:", cartQuantity);

            if (cartQuantity > 0) {
                const selectedWarehouseDetails = allWarehouse.find(
                    (warehouse) => warehouse.id === selectedWarehouseId
                );

                if (selectedWarehouseDetails) {
                    const warehouseInventory = posAllProducts
                        .filter((product) => product.id === productId)
                        .flatMap((product) => product.attributes.productInventoriesDetails)
                        .find((inventory) => inventory.warehouse_id === selectedWarehouseDetails.id);
                        // console.log("warehouseInventory:",warehouseInventory );

                    if (warehouseInventory) {
                        warehouseInventory.warehouse_quantities += cartQuantity;
                    } else {
                        console.error("No matching warehouse inventory found for the product.");
                    }
                } else {
                    console.error("No matching warehouse details found for the selected warehouse.");
                }
            } else {
                console.error("Cart quantity is zero or undefined.");
            }
        } else {
            console.error("Product not found in the cart.");
        }

        const updatedCart = updateProducts.filter((item) => item.id !== productId);
        setUpdateProducts(updatedCart);
    };




    const localCart = updateProducts.map((updateQty) =>
        Number(updateQty.quantity)
    );
    const totalQty =
        localCart.length > 0 &&
        localCart.reduce((cart, current) => {
            return cart + current;
        });

    const localTotal = updateProducts.map(
        (updateQty) =>
            calculateProductCost(updateQty).toFixed(2) * updateQty.quantity
    );
    const subTotal =
        localTotal.length > 0 &&
        localTotal.reduce((cart, current) => {
            return cart + current;
        });

    const [holdListId, setHoldListValue] = useState({
        referenceNumber: "",
    });

    const discountTotal = subTotal - cartItemValue.discount;
    const taxTotal = (discountTotal * cartItemValue.tax) / 100;
    const mainTotal = discountTotal + taxTotal;
    const grandTotal = (
        Number(mainTotal) + Number(cartItemValue.shipping)
    ).toFixed(2);

    useEffect(() => {
        setPaymentPrint({
            ...paymentPrint,
            barcode_url:
                paymentDetails.attributes &&
                paymentDetails.attributes.barcode_url,
            reference_code:
                paymentDetails.attributes &&
                paymentDetails.attributes.reference_code,
        });
    }, [paymentDetails]);

    useEffect(() => {
        setSelectedCustomerOption();
        setSelectedOption(
            settings.attributes && {
                value: Number(settings.attributes.default_warehouse),
                label: settings.attributes.warehouse_name,
            }
        );
    }, [settings]);

    useEffect(() => {
        fetchSetting();
        fetchFrontSetting();
        fetchTodaySaleOverAllReport();
        fetchHoldLists();
    }, []);

    useEffect(() => {
        if (updateHolList === true) {
            fetchHoldLists();
            setUpdateHoldList(false);
        }
    }, [updateHolList]);

    useEffect(() => {
        setUpdateProducts(updateProducts);
    }, [quantity, grandTotal]);

    const handleValidation = () => {
        let errors = {};
        let isValid = false;
        if (!selectedDate) {
            errors["date"] = "Please select date";
        } else {
            isValid = true;
        }
        setErrors(errors);
        return isValid;
    };

    const setCategory = (item) => {
        setCategoryId(item);
    };

    useEffect(() => {
        if (selectedOption) {
            fetchBrandClickable(
                brandId,
                categoryId,
                selectedOption.value && selectedOption.value
            );
        }
    }, [selectedOption, brandId, categoryId]);

    const setBrand = (item) => {
        setBrandId(item);
    };

    const onChangeInput = (e) => {
        e.preventDefault();
        setCashPaymentValue((inputs) => ({
            ...inputs,
            [e.target.name]: e.target.value,
        }));
    };

    const onPaymentStatusChange = (obj) => {
        setCashPaymentValue((inputs) => ({ ...inputs, payment_status: obj }));
    };

    const onChangeReturnChange = (change) => {
        setChangeReturn(change);
    };

    const paymentTypeFilterOptions = getFormattedOptions(paymentMethodOptions);
    const paymentTypeDefaultValue = paymentTypeFilterOptions.map((option) => {
        return {
            value: option.id,
            label: option.name,
        };
    });
    const [paymentValue, setPaymentValue] = useState({
        payment_type: paymentTypeDefaultValue[0],
    });

    const onPaymentTypeChange = (obj) => {
        setPaymentValue({ ...paymentValue, payment_type: obj });
    };

    const onChangeCart = (event) => {
        const { value } = event.target;
        if (value.match(/\./g)) {
            const [, decimal] = value.split(".");
            if (decimal?.length > 2) {
                return;
            }
        }

        let discount = cartItemValue.discount;
        if (event.target.name == "discount_value") {
            if (cartItemValue.discount_type == discountType.FIXED) {
                discount = value;
            } else {
                discount = (Number(subTotal) * Number(value)) / 100;
            }
        }
        if (event.target.name === "discount_type") {
            if (value == discountType.FIXED) {
                discount = cartItemValue.discount_value;
            } else {
                discount =
                    (Number(subTotal) * Number(cartItemValue.discount_value)) /
                    100;
            }
        }

        setCartItemValue((inputs) => ({
            ...inputs,
            discount: discount,
            [event.target.name]: value,
        }));
    };

    const onChangeTaxCart = (event) => {
        const min = 0;
        const max = 100;
        const { value } = event.target;
        const values = Math.max(min, Math.min(max, Number(value)));
        if (value.match(/\./g)) {
            const [, decimal] = value.split(".");
            if (decimal?.length > 2) {
                return;
            }
        }
        setCartItemValue((inputs) => ({
            ...inputs,
            [event.target.name]: values,
        }));
    };

    //payment slip model onchange
    const handleCashPayment = () => {
        setCashPaymentValue({
            notes: "",
            payment_status: {
                label: getFormattedMessage("dashboard.recentSales.paid.label"),
                value: 1,
            },
        });
        setCashPayment(!cashPayment);
    };

    const updateCost = (item) => {
        setNewCost(item);
    };

    const openProductDetailModal = () => {
        setIsOpenCartItemUpdateModel(!isOpenCartItemUpdateModel);
    };

    const onClickUpdateItemInCart = (item) => {
        setProduct(item);
        setIsOpenCartItemUpdateModel(true);
    };

    const onProductUpdateInCart = () => {
        const localCart = updateProducts.slice();
        updateCart(localCart);
    };

    const updatedQty = (qty) => {
        setQuantity(qty);
    };

    const updateCart = (cartProducts) => {
        setUpdateProducts(cartProducts);
    };

    //product add to cart function
    const addToCarts = (items) => {
        updateCart(items);
    };

    // create customer model
    const customerModel = (val) => {
        setModalShowCustomer(val);
    };

    //prepare data for print Model
    const preparePrintData = () => {
        const formValue = {
            products: updateProducts,
            discount: cartItemValue.discount ? cartItemValue.discount : 0,
            tax: cartItemValue.tax ? cartItemValue.tax : 0,
            cartItemPrint: cartItemValue,
            taxTotal: taxTotal,
            grandTotal: grandTotal,
            shipping: cartItemValue.shipping,
            subTotal: subTotal,
            frontSetting: frontSetting,
            customer_name: selectedCustomerOption,
            settings: settings,
            note: cashPaymentValue.notes,
            changeReturn,
            payment_status: cashPaymentValue.payment_status,
        };
        return formValue;
    };

    const prepareData = (updateProducts) => {
        const formValue = {
            date: moment(selectedDate).format("YYYY-MM-DD"),
            customer_id:
                selectedCustomerOption && selectedCustomerOption[0]
                    ? selectedCustomerOption[0].value
                    : selectedCustomerOption?.value,
            warehouse_id:
                selectedOption && selectedOption[0]
                    ? selectedOption[0].value
                    : selectedOption?.value,
            salesman_id: selectedSalesmanId,
            product_id: updateProducts.map((product) => product.id),
            sale_items: updateProducts,
            grand_total: grandTotal,
            payment_status: 1,
            payment_type: paymentValue?.payment_type?.value,
            discount: cartItemValue.discount,
            shipping: cartItemValue.shipping,
            tax_rate: cartItemValue.tax,
            note: cashPaymentValue.notes,
            status: 1,
            hold_ref_no: hold_ref_no,
            payment_status: cashPaymentValue?.payment_status?.value,
        };
        return formValue;
    };



    //cash payment method
    const onCashPayment = (event, printSlip = false) => {
        event.preventDefault();
        const valid = handleValidation();
        if (valid) {
            posCashPaymentAction(
                prepareData(updateProducts),
                setUpdateProducts,
                setModalShowPaymentSlip,
                posAllProduct,
                {
                    brandId,
                    categoryId,
                    selectedOption,
                },
                printSlip
            );
            // setModalShowPaymentSlip(true);
            setCashPayment(false);
            setPaymentPrint(preparePrintData);
            setCartItemValue({
                discount_type: discountType.FIXED,
                discount_value: 0,
                discount: 0,
                tax: 0,
                shipping: 0,
            });
            setCashPaymentValue({
                notes: "",
                payment_status: {
                    label: getFormattedMessage(
                        "dashboard.recentSales.paid.label"
                    ),
                    value: 1,
                },
            });
            setCartProductIds("");
        }
    };

    const printPaymentReceiptPdf = () => {
        document.getElementById("printReceipt").click();
    };

    const printRegisterDetails = () => {
        document.getElementById("printRegisterDetailsId").click();
    };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const handleRegisterDetailsPrint = useReactToPrint({
        content: () => registerDetailsRef.current,
    });

    //payment print
    const loadPrintBlock = () => {
        return (
            <div className="d-none">
                <button id="printReceipt" onClick={handlePrint}>
                    Print this out!
                </button>
                <PrintData
                    ref={componentRef}
                    paymentType={paymentValue.payment_type.label}
                    allConfigData={allConfigData}
                    updateProducts={paymentPrint}
                />
            </div>
        );
    };

    //Register details  slip
    const loadRegisterDetailsPrint = () => {
        return (
            <div className="d-none">
                <button
                    id="printRegisterDetailsId"
                    onClick={handleRegisterDetailsPrint}
                >
                    Print this out!
                </button>
                <PrintRegisterDetailsData
                    ref={registerDetailsRef}
                    allConfigData={allConfigData}
                    frontSetting={frontSetting}
                    posAllTodaySaleOverAllReport={posAllTodaySaleOverAllReport}
                    updateProducts={paymentPrint}
                    closeRegisterDetails={closeRegisterDetails}
                />
            </div>
        );
    };

    //payment slip
    const loadPaymentSlip = () => {
        return (
            <div className="d-none">
                <PaymentSlipModal
                    printPaymentReceiptPdf={printPaymentReceiptPdf}
                    setPaymentValue={setPaymentValue}
                    setModalShowPaymentSlip={setModalShowPaymentSlip}
                    settings={settings}
                    frontSetting={frontSetting}
                    modalShowPaymentSlip={modalShowPaymentSlip}
                    allConfigData={allConfigData}
                    paymentDetails={paymentDetails}
                    updateProducts={paymentPrint}
                    paymentType={paymentValue.payment_type.label}
                    paymentTypeDefaultValue={paymentTypeDefaultValue}
                />
            </div>
        );
    };
    const [isDetails, setIsDetails] = useState(null);
    const [lgShow, setLgShow] = useState(false);
    const [holdShow, setHoldShow] = useState(false);

    const onClickDetailsModel = (isDetails = null) => {
        setLgShow(true);
    };

    const onClickHoldModel = (isDetails = null) => {
        setHoldShow(true);
    };

    const handleClickCloseRegister = () => {
        dispatch(getAllRegisterDetailsAction());
        setShowCloseDetailsModal(true);
    };

    const handleCloseRegisterDetails = (data) => {
        if (data.cash_in_hand_while_closing.toString().trim()?.length === 0) {
            dispatch(
                addToast({
                    text: getFormattedMessage(
                        "pos.cclose-register.enter-total-cash.message"
                    ),
                    type: toastType.ERROR,
                })
            );
        } else {
            setShowCloseDetailsModal(false);
            dispatch(closeRegisterAction(data, navigate));
        }
    };

    const loadProducts = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (valid) {
            if (
                !updateProducts.length > 0 ||
                qtyCart.length > 0 ||
                cartItemValue.tax > 100 ||
                // Number(cartItemValue.discount) > grandTotal ||
                Number(cartItemValue.shipping) > Number(subTotal)
            ) {
                !updateProducts.length > 0 &&
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "pos.cash-payment.product-error.message"
                            ),
                            type: toastType.ERROR,
                        })
                    );
                qtyCart.length > 0 &&
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "pos.cash-payment.quantity-error.message"
                            ),
                            type: toastType.ERROR,
                        })
                    );
                updateProducts.length > 0 &&
                    cartItemValue.tax > 100 &&
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "pos.cash-payment.tax-error.message"
                            ),
                            type: toastType.ERROR,
                        })
                    );
                updateProducts.length > 0 &&
                    Number(cartItemValue.shipping) > Number(subTotal) &&
                    dispatch(
                        addToast({
                            text: getFormattedMessage(
                                "pos.cash-payment.sub-total-amount-error.message"
                            ),
                            type: toastType.ERROR,
                        })
                    );
            } else if (updateProducts.length > 0 && !qtyCart.length) {
                loadProductstoSalesMan(prepareData(updateProducts));
                setUpdateProducts([]);
                setCartProductIds("");
            }
        }
    };

    const warehouses =
        warehouse &&
        warehouse.map((item) => {
            return {
                value: item?.attributes.ware_id,
                label:
                    item.attributes?.warehouseDetails?.first_name +
                    " " +
                    item.attributes?.warehouseDetails?.last_name,
            };
        });

    return (
        <Container className="pos-screen px-3" fluid>
            <TabTitle title="POS" />
            {loadPrintBlock()}
            {loadPaymentSlip()}
            {loadRegisterDetailsPrint()}
            <Row>
                <TopProgressBar />
                <Col lg={5} xxl={4} xs={6} className="pos-left-scs">
                    <div className="d-flex flex-column h-100">
                        <div className="mb-3 mt-3 position-relative">
                            <Select
                                placeholder="Choose Warehouse"
                                onChange={handleWarehouseChange}
                                options={warehouses}
                                value={warehouses.find(
                                    (w) => w.value === selectedWarehouseId
                                )}
                                noOptionsMessage={() =>
                                    getFormattedMessage("no-option.label")
                                }
                            />
                        </div>
                        <div className="mb-3 mt-3 position-relative">
                            <Select
                                placeholder="Choose Salesman"
                                // value={selectedSalesmanId}
                                onChange={setSelectedSalesman}
                                options={filteredSalesmen.map((item) => ({
                                    value: item.salesman_id,
                                    label: `${item.sales_man_details?.first_name} ${item.sales_man_details?.last_name}`,
                                }))}
                                noOptionsMessage={() =>
                                    getFormattedMessage("no-option.label")
                                }
                            />
                        </div>

                        <div className="left-content custom-card mb-3 p-3 d-flex flex-column justify-content-between">
                            <div className="main-table overflow-auto">
                                <div className="mb-3 mt-4">
                                    <label
                                        htmlFor="datePicker"
                                        className="form-label"
                                    >
                                        Assign Date
                                    </label>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(date) =>
                                            setSelectedDate(date)
                                        }
                                        dateFormat="dd-MM-yyyy"
                                        className="form-control"
                                        placeholderText="Select a date"
                                        minDate={new Date()}
                                    />
                                    <span className="text-danger d-block fw-400 fs-small mt-2">
                                        {errors["date"] ? errors["date"] : null}
                                    </span>
                                </div>
                                <Table className="mb-0">
                                    <thead className="position-sticky top-0">
                                        <tr>
                                            <th>
                                                {getFormattedMessage(
                                                    "pos-product.title"
                                                )}
                                            </th>
                                            <th
                                                className={
                                                    updateProducts &&
                                                    updateProducts.length
                                                        ? "text-center"
                                                        : ""
                                                }
                                            >
                                                {getFormattedMessage(
                                                    "pos-qty.title"
                                                )}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-0">
                                        {updateProducts &&
                                        updateProducts.length ? (
                                            updateProducts.map(
                                                (updateProduct, index) => {
                                                    return (
                                                        <ProductCartList
                                                            singleProduct={
                                                                updateProduct
                                                            }
                                                            key={index + 1}
                                                            index={index}
                                                            posAllProducts={
                                                                posAllProducts
                                                            }
                                                            onClickUpdateItemInCart={
                                                                onClickUpdateItemInCart
                                                            }
                                                            updatedQty={
                                                                updatedQty
                                                            }
                                                            updateCost={
                                                                updateCost
                                                            }
                                                            onDeleteCartItem={
                                                                onDeleteCartItem
                                                            }
                                                            wareHouseId={
                                                                selectedWarehouseId
                                                            }
                                                            quantity={quantity}
                                                            frontSetting={
                                                                frontSetting
                                                            }
                                                            newCost={newCost}
                                                            allConfigData={
                                                                allConfigData
                                                            }
                                                            setUpdateProducts={
                                                                setUpdateProducts
                                                            }
                                                        />
                                                    );
                                                }
                                            )
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className="custom-text-center text-gray-900 fw-bold py-5"
                                                >
                                                    {getFormattedMessage(
                                                        "sale.product.table.no-data.label"
                                                    )}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                            <div>
                                <CartItemMainCalculation
                                    totalQty={totalQty}
                                    subTotal={subTotal}
                                    grandTotal={grandTotal}
                                    cartItemValue={cartItemValue}
                                    onChangeCart={onChangeCart}
                                    allConfigData={allConfigData}
                                    frontSetting={frontSetting}
                                    onChangeTaxCart={onChangeTaxCart}
                                />

                                <Button
                                    type="button"
                                    // variant="success"
                                    className="text-white w-100 py-3 rounded-10 px-3 pos-pay-btn"
                                    onClick={loadProducts}
                                    style={{ backgroundColor: "#ff5722" }}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg={7} xxl={8} xs={6} className="ps-lg-0 pos-right-scs">
                    <div className="right-content mb-3 d-flex flex-column h-100">
                        <div className="d-sm-flex align-items-center flex-xxl-nowrap flex-wrap">
                            <ProductSearchbar
                                customCart={customCart}
                                setUpdateProducts={setUpdateProducts}
                                updateProducts={updateProducts}
                            />
                        </div>
                        <div className="custom-card h-100 mb-3">
                            <div className="p-3">
                                <Category
                                    setCategory={setCategory}
                                    brandId={brandId}
                                    selectedOption={selectedOption}
                                />
                                <Brands
                                    categoryId={categoryId}
                                    setBrand={setBrand}
                                    selectedOption={selectedOption}
                                />
                            </div>
                            <Product
                                cartProducts={updateProducts}
                                updateCart={addToCarts}
                                wareHouseId={selectedWarehouseId}
                                filterProds={filteredsProduct}
                                customCart={customCart}
                                setCartProductIds={setCartProductIds}
                                cartProductIds={cartProductIds}
                                settings={settings}
                                productMsg={productMsg}
                                selectedOption={selectedOption}
                            />
                        </div>
                    </div>
                </Col>
            </Row>
            {isOpenCartItemUpdateModel && (
                <ProductDetailsModel
                    openProductDetailModal={openProductDetailModal}
                    productModelId={product.id}
                    onProductUpdateInCart={onProductUpdateInCart}
                    updateCost={updateCost}
                    cartProduct={product}
                    isOpenCartItemUpdateModel={isOpenCartItemUpdateModel}
                    frontSetting={frontSetting}
                />
            )}
            {cashPayment && (
                <CashPaymentModel
                    cashPayment={cashPayment}
                    totalQty={totalQty}
                    cartItemValue={cartItemValue}
                    onChangeInput={onChangeInput}
                    onPaymentStatusChange={onPaymentStatusChange}
                    cashPaymentValue={cashPaymentValue}
                    allConfigData={allConfigData}
                    subTotal={subTotal}
                    onPaymentTypeChange={onPaymentTypeChange}
                    grandTotal={grandTotal}
                    onCashPayment={onCashPayment}
                    taxTotal={taxTotal}
                    handleCashPayment={handleCashPayment}
                    settings={settings}
                    errors={errors}
                    paymentTypeDefaultValue={paymentTypeDefaultValue}
                    paymentTypeFilterOptions={paymentTypeFilterOptions}
                    onChangeReturnChange={onChangeReturnChange}
                    setPaymentValue={setPaymentValue}
                />
            )}
            {lgShow && (
                <RegisterDetailsModel
                    printRegisterDetails={printRegisterDetails}
                    frontSetting={frontSetting}
                    lgShow={lgShow}
                    setLgShow={setLgShow}
                />
            )}
            {holdShow && (
                <HoldListModal
                    setUpdateHoldList={setUpdateHoldList}
                    setCartItemValue={setCartItemValue}
                    setUpdateProducts={setUpdateProducts}
                    updateProduct={updateProducts}
                    printRegisterDetails={printRegisterDetails}
                    frontSetting={frontSetting}
                    holdListData={holdListData}
                    setHold_ref_no={setHold_ref_no}
                    holdShow={holdShow}
                    setHoldShow={setHoldShow}
                    addCart={addToCarts}
                    updateCart={updateCart}
                    setSelectedCustomerOption={setSelectedCustomerOption}
                    setSelectedOption={setSelectedOption}
                />
            )}
            {modalShowCustomer && (
                <CustomerForm
                    show={modalShowCustomer}
                    hide={setModalShowCustomer}
                />
            )}
            <PosCloseRegisterDetailsModel
                showCloseDetailsModal={showCloseDetailsModal}
                handleCloseRegisterDetails={handleCloseRegisterDetails}
                setShowCloseDetailsModal={setShowCloseDetailsModal}
            />
        </Container>
    );
};

const mapStateToProps = (state) => {
    const {
        posAllProducts,
        frontSetting,
        settings,
        cashPayment,
        allConfigData,
        posAllTodaySaleOverAllReport,
        holdListData,
    } = state;
    return {
        holdListData,
        posAllProducts,
        frontSetting,
        settings,
        paymentDetails: cashPayment,
        customCart: prepareCartArray(posAllProducts),
        allConfigData,
        posAllTodaySaleOverAllReport,
    };
};

export default connect(mapStateToProps, {
    fetchSetting,
    fetchFrontSetting,
    posSearchNameProduct,
    posCashPaymentAction,
    posSearchCodeProduct,
    posAllProduct,
    fetchBrandClickable,
    fetchHoldLists,
    loadProductstoSalesMan,
})(PosLoadMainPage);
