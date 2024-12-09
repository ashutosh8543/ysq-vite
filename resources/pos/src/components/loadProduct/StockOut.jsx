import React, { useState, useEffect } from "react";
import MasterLayout from "../MasterLayout";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { fetchSalesmans } from "../../store/action/salesmanAction";
import { AreaList } from "../../store/action/areaAction";
import { fetchAllCustomer } from "../../store/action/customerAction";
import ModelFooter from "../../shared/components/modelFooter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { StockOutProduct } from "../../store/action/loadUnloadAction";
import { useNavigate } from "react-router";
import axiosApi from "../../config/apiConfig";
import { Tokens } from "../../constants";
import moment from "moment";
import { func } from "prop-types";
import { error } from "laravel-mix/src/Log";
import { faL } from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select';

const StockOut = (props) => {
    const {
        salesmans,
        areas,
        customers,
        AreaList,
        fetchAllCustomer,
        assignCustomer,
        StockOutProduct
    } = props;

    const [distributors, setDistributors] = useState([]);
    const [salesman, setSalesman] = useState([]);
    const [selectedSalesman, setSelectedSalesman] = useState("");
    const [selectedProducts,setSelectedProducts]=useState([]);
    const [selectedFilterProducts,setSelectedFilterProducts]=useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [returProduct,setReturnProduct]=useState([])
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    useEffect(() => {
        const fetchAllTodayLoadProducts = async () => {
            try {
                const token = localStorage.getItem(Tokens.ADMIN);
                const response = await axiosApi.get("today-stockin-product-list", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                console.log("today",response.data.data);                
                setSelectedProducts(response.data.data);
            }catch (error) {
                console.error("Error fetching today stockIn:", error);
            }
        };
        fetchAllTodayLoadProducts();
    },[]);

    useEffect(() => {
        const fetchAllSalesMan = async () => {
            try {
                const token = localStorage.getItem(Tokens.ADMIN);
                const response = await axiosApi.get("show-salesman", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                setSalesman(response.data);
            } catch (error) {
                console.error("Error fetching all salesman:", error);
            }
        };
        fetchAllSalesMan();
    }, []);
     const handleSalesmanChange = (e) => {
        setSelectedFilterProducts([]);
        const salesman_id = e.value;
        setSelectedSalesman(salesman_id); 
        setSelectedFilterProducts(
            selectedProducts.filter((selectedProducts) => selectedProducts.salesman_id == salesman_id)
        );
     };

     const handleReturnSelectProduct = (productId) => {
        setReturnProduct((prev) => {
            if (prev.includes(productId)) {
                return prev.filter((id) => id !== productId);
            }
            return [...prev, productId];
        });
    };
     
    function handelError(){
         let errorss={};
         let isValid=false;
        if(selectedSalesman==""){
            errorss['salesman_id']="Please select Salesman";
        }else if(returProduct.length==0){
            errorss['return_product']="Please select atleast one product";
        }else{
           isValid = true;
       }
       setErrors(errorss);
        return isValid;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
         let  valid = handelError();

        const data = {
            salesman_id: selectedSalesman,
            products: returProduct,
            // assigned_date: moment(selectedDate).format("YYYY-MM-DD"),
        };
        try {
            if(valid){
               StockOutProduct(data);
               clearFields();
            //    window.location.href="#/app/stockout";
            }
        } catch (error) {
            console.error("Error return product:", error);
        }
    };
    const clearFields = () => {
        setErrors({});
        setSelectedSalesman([]);
        setReturnProduct([]);
        setSelectedFilterProducts([])
        setSelectedDate(null);
    };
    const options = salesman &&
    salesman.map((salesman) => (
              { value: salesman.salesman_id, label: salesman.sales_man_details?.first_name+' '+salesman.sales_man_details?.last_name}        
     
            ));
    
 
    return (
        <MasterLayout>
            <div className="container mt-4">
                <h2 className="mb-4">StockOut Products</h2>
                <Form onSubmit={handleSubmit}>              
                    <div className="mb-3">
                        <label htmlFor="salesman" className="form-label">
                            Select Salesman:
                        </label>
                        <Select 
                            id="salesman"
                            // value={selectedSalesman}
                            onChange={handleSalesmanChange}                         
                            options={options &&
                                options}                          
                        />
                        <span className="text-danger d-block fw-400 fs-small mt-2">
                                            {errors["salesman_id"]
                                                ? errors["salesman_id"]
                                                : null}
                                        </span>
                    </div>                
                    {selectedFilterProducts && (
                        <div className="mb-3">
                            <label className="form-label">
                                Today StockIn Products:
                            </label>
                            <ul className="list-group">
                                {selectedFilterProducts.length > 0 ? (
                                    selectedFilterProducts.map((item) => (
                                     item.quantity &&
                                        <li
                                            key={item.id}
                                            className="list-group-item"
                                        >
                                            <Form.Check
                                                type="checkbox"
                                                id={`product-${item.id}`}
                                                label={`${item.product.name} - ${item.product.name}`}
                                                checked={returProduct.includes(
                                                    item.product_id
                                                )}
                                                onChange={() =>
                                                    handleReturnSelectProduct(
                                                        item.product_id
                                                    )
                                                }
                                            />
                                        </li>
                                    ))
                                ) : (
                                    <li className="list-group-item">
                                        No customers found for this area.
                                    </li>
                                )}
                            </ul>
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                            {errors["return_product"]
                                                ? errors["return_product"]
                                                : null}
                                        </span>
                        </div>
                    )}
                    <ModelFooter
                        onSubmit={handleSubmit}
                        addDisabled={
                            !selectedSalesman || returProduct.length==0
                        }
                        link="/app/stockout-product-list"
                    />
                </Form>
            </div>
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { areas, customers } = state;
    return { areas, customers };
};

export default connect(mapStateToProps, {
    AreaList,
    fetchAllCustomer,
    StockOutProduct,
})(StockOut);
