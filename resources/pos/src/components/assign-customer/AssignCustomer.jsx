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
import { assignCustomer } from "../../store/action/assignCustomerAction";
import { useNavigate } from "react-router";
import axiosApi from "../../config/apiConfig";
import { Tokens } from "../../constants";
import moment from "moment";

const AssignCustomer = (props) => {
    const {
        salesmans,
        areas,
        customers,
        AreaList,
        fetchAllCustomer,
        assignCustomer,
    } = props;

    const [distributors, setDistributors] = useState([]);
    const [salesman, setSalesman] = useState([]);
    const [selectedDistributor, setSelectedDistributor] = useState("");
    const [selectedWarehouse, setSelectedWarehouse] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [filteredSalesmen, setFilteredSalesmen] = useState([]);
    const [selectedSalesman, setSelectedSalesman] = useState("");
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableWarehouses, setAvailableWarehouses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllDistributors = async () => {
            try {
                const token = localStorage.getItem(Tokens.ADMIN);
                const response = await axiosApi.get("distributors", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                setDistributors(response.data.data);
            }catch (error) {
                console.error("Error fetching all distributors:", error);
            }
        };
        fetchAllDistributors();
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

    useEffect(() => {
        AreaList();
        fetchAllCustomer();
    }, [AreaList, fetchAllCustomer]);

    // useEffect(() => {
    //     if (selectedArea) {
    //         const customersInArea = customers.filter(
    //             (customer) => customer.attributes.area_id === selectedArea
    //         );
    //         setFilteredCustomers(customersInArea);
    //     } else {
    //         setFilteredCustomers([]);
    //     }
    // }, [selectedArea, customers]);

    const handleCustomerSelect = (customerId) => {
        setSelectedCustomers((prev) => {
            if (prev.includes(customerId)) {
                return prev.filter((id) => id !== customerId);
            }
            return [...prev, customerId];
        });
    };
    const handleDistributorChange = (e) => {
        const distributorId = e.target.value;
        setSelectedDistributor(distributorId);
        setSelectedWarehouse("");
        setFilteredSalesmen([]);
        setFilteredCustomers([]);
        setSelectedCustomers([]);
        const selectedDistributorDetails = distributors.find(
            (d) => d.id === parseInt(distributorId)
        );

        if (selectedDistributorDetails) {
            const warehouses = selectedDistributorDetails.attributes.warehouse;
            setAvailableWarehouses(warehouses);
        } else {
            setAvailableWarehouses([]);
        }
    };

    const handleWarehouseChange = (e) => {
        setFilteredSalesmen([]);
        setFilteredCustomers([]);
        const warehouseId = e.target.value;
        const area = e.target.selectedOptions[0].getAttribute("data-area");
        setSelectedArea(area);
        setSelectedWarehouse(warehouseId);
        setFilteredSalesmen(
            salesman.filter((item) => item?.ware_id == warehouseId)
        );
        setFilteredCustomers(
          customers.filter((customer) => customer.attributes.area_id === area)
        );

     };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            area_id: selectedArea,
            salesman_id: selectedSalesman,
            customers: selectedCustomers,
            assigned_date: moment(selectedDate).format("YYYY-MM-DD"),
            distributor_id: selectedDistributor,
            warehouse_id: selectedWarehouse,
            assign_by: 1,
        };
        try {
            await assignCustomer(data);
            clearFields();
            navigate("#/app/assign-customer-list");
        } catch (error) {
            console.error("Error assigning customers:", error);
        }
    };
    const clearFields = () => {
        setSelectedDistributor("");
        setSelectedWarehouse("");
        setSelectedArea("");
        setSelectedSalesman("");
        setSelectedCustomers([]);
        setSelectedDate(null);
        setFilteredSalesmen([]);
    };

    function dateSelect(e){
        setSelectedDistributor([]);
        setAvailableWarehouses([]);
        setFilteredSalesmen([]);
        setFilteredCustomers([]);
         const filterDate=moment(e).format("YYYY-MM-DD");
         fetchAllCustomer(filterDate);
    }

    return (
        <MasterLayout>
            <div className="container mt-4">
                <h2 className="mb-4">Assign Customers To Salesman</h2>
                <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                        <label className="form-label">Select Trip Date:</label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            onSelect={dateSelect}
                            dateFormat="dd-MM-yyyy"
                            className="form-control"
                            placeholderText="Select a date"
                            minDate={new Date()}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="distributor" className="form-label">
                            Select Distributor:
                        </label>
                        <select
                            id="distributor"
                            className="form-select"
                            value={selectedDistributor}
                            onChange={handleDistributorChange}                        >
                            <option value="">Select a distributor</option>
                            {distributors.length > 0 ? (
                                distributors.map((distributor) => (
                                    <option
                                        key={distributor.id}
                                        value={distributor.id}
                                    >
                                        {distributor.attributes.first_name +
                                            " " +
                                            distributor.attributes.last_name}
                                    </option>
                                ))
                            ) : (
                                <option disabled>
                                    No distributors available
                                </option>
                            )}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="warehouse" className="form-label">
                            Select Warehouse:
                        </label>
                        <select
                            id="warehouse"
                            className="form-select"
                            value={selectedWarehouse}
                            onChange={handleWarehouseChange}
                            disabled={!availableWarehouses.length}
                        >
                            <option value="">Select a warehouse</option>
                            {availableWarehouses.map((warehouse) => (
                                <option key={warehouse.id} value={warehouse.ware_id} data-area={warehouse.area}>
                                    {warehouse.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="salesman" className="form-label">
                            Select Salesman:
                        </label>
                        <select
                            id="salesman"
                            className="form-select"
                            value={selectedSalesman}
                            onChange={(e) =>
                                setSelectedSalesman(e.target.value)
                            }
                            disabled={!filteredSalesmen.length}
                        >
                            <option value="">Select a salesman</option>
                            {filteredSalesmen &&
                                filteredSalesmen.map((salesman) => (
                                    <option
                                        key={salesman.salesman_id}
                                        value={salesman.salesman_id}
                                    >
                                        {salesman?.sales_man_details
                                            ?.first_name +
                                            " " +
                                            salesman?.sales_man_details
                                                ?.last_name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="area" className="form-label">
                         Area:
                        </label>
                        <select
                            id="area"
                            className="form-select"
                            value={selectedArea}
                            onChange={(e) => setSelectedArea(e.target.value)}
                            disabled
                        >
                            <option value="">salesman area</option>
                            {areas.map((area) => (
                                <option key={area.id} value={area.id}>
                                    {area.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {selectedArea && (
                        <div className="mb-3">
                            <label className="form-label">
                                Customers in Selected Area:
                            </label>
                            <ul className="list-group">
                                {filteredCustomers.length > 0 ? (
                                    filteredCustomers.map((customer) => (
                                        <li
                                            key={customer.id}
                                            className="list-group-item"
                                        >
                                            <Form.Check
                                                type="checkbox"
                                                id={`customer-${customer.id}`}
                                                label={`${customer.attributes.name} - ${customer.attributes.email}`}
                                                checked={selectedCustomers.includes(
                                                    customer.id
                                                )}
                                                onChange={() =>
                                                    handleCustomerSelect(
                                                        customer.id
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
                        </div>
                    )}
                    <ModelFooter
                        onSubmit={handleSubmit}
                        addDisabled={
                            !selectedSalesman || !selectedArea || !selectedDate || !selectedCustomers || !filteredCustomers
                        }
                        link="/app/assign-customer-list"
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
    assignCustomer,
})(AssignCustomer);
