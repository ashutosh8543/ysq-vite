import React, { useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import MasterLayout from "../MasterLayout";
import { fetchCustomers } from "../../store/action/customerAction";
import ReactDataTable from "../../shared/table/ReactDataTable";
import DeleteCustomer from "./DeleteCustomer";
import TabTitle from "../../shared/tab-title/TabTitle";
import {
    getFormattedDate,
    getFormattedMessage,
    placeholderText,
    getAvatarName,
} from "../../shared/sharedMethod";
import ActionButton from "../../shared/action-buttons/ActionButton";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import ImportCustomersModel from "./ImportCustomersModel";
import { Permissions } from "../../constants";
const Customers = (props) => {
    const { fetchCustomers, customers, totalRecord, isLoading, allConfigData } =
        props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const navigate = useNavigate();
    const [importCustomers, setImportCustomers] = useState(false);

    const handleClose = () => {
        setImportCustomers(!importCustomers);
    };

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const onChange = (filter) => {
        fetchCustomers(filter, true);
    };

    const goToEditProduct = (item) => {
        const id = item.id;
        navigate(`/app/customers/edit/${id}`);
    };

    // const goToEditProduct = (customer) =>{
    //     const id = customer;
    //     if (id) {
    //         window.location.href = "#/app/customers/edit/" + customer;
    //     } else {
    //         console.error("ID is undefined for item:", customer);
    //     }
    // }


    const goToDetailScreen = (customer) => {
        const id = customer;
        if (id) {
            window.location.href = "#/app/customer/detail/" + customer;
        } else {
            console.error("ID is undefined for item:", customer);
        }
    };

    const itemsValue =
        customers.length >= 0 &&
        customers.map((customer) => ({
            date: getFormattedDate(
                customer.attributes.created_at,
                allConfigData
            ),
            time: moment(customer.attributes.created_at).format("LT"),
            name: customer.attributes.name,
            email: customer.attributes.email,
            phone: customer.attributes.phone,
            country: customer.attributes.country,
            city: customer.attributes.city,
            credit_limit: customer.attributes.credit_limit,
            id: customer.id,
            unique_code: customer.attributes?.unique_code,
            channelDetails: customer.attributes?.channelDetails?.name,
            areaDetails: customer.attributes?.areaDetails?.name,
            countryDetails: customer.attributes?.countryDetails?.name,
            region: customer.attributes?.areaDetails?.region?.name,
            image: customer.attributes.image,
        }));

    const columns = [
        {
            name: "Customer Id",
            selector: (row) => row.unique_code,
            sortField: "unique_code",
            sortable: true,
        },
        {
            name: getFormattedMessage("customer.title"),
            selector: (row) => row.name,
            sortField: "name",
            sortable: true,
            cell: (row) => (
                <div className="d-flex align-items-center">
                    <div className="me-2">
                        {row.image ? (
                            <img
                                src={row.image}
                                height="50"
                                width="50"
                                alt="User Image"
                                className="image image-circle image-mini"
                            />
                        ) : (
                            <span className="custom-user-avatar fs-5">
                                {getAvatarName(row.name)}
                            </span>
                        )}
                    </div>
                    <div>
                        <div className="text-primary">{row.name}</div>
                    </div>
                </div>
            ),
        },
        {
            name: "Email & Phone",
            selector: (row) => row.email,
            sortField: "email",
            sortable: false,
            cell: (row) => (
                <div>
                    <div>{row.email}</div>
                    <div>{row.phone}</div>
                </div>
            ),
        },
        {
            name: "Customer Type",
            selector: (row) => row.channelDetails,
            sortField: "chanel_id",
            sortable: true,
        },
        {
            name: "Credit Limits",
            selector: (row) => row.credit_limit,
            sortField: "credit_limit",
            sortable: false,
        },
        {
            name: "Country",
            selector: (row) => row.countryDetails,
            sortField: "countryDetails",
            sortable: true,
        },
        {
            name: "Region",
            selector: (row) => row.region,
            sortField: "region",
            sortable: false,
        },
        {
            name: "Area",
            selector: (row) => row.areaDetails,
            sortField: "areaDetails",
            sortable: false,
        },
        {
            name: getFormattedMessage("react-data-table.action.column.label"),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: (row) => (
                <ActionButton
                    item={row}
                    isViewIcon={true}
                    goToDetailScreen={goToDetailScreen}
                    goToEditProduct={goToEditProduct}
                    onClickDeleteModel={onClickDeleteModel}
                    isEditMode={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.EDIT_CUSTOMER)?true:false}
                    isDeleteMode={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.DELETE_CUSTOMER)?true:false}   
                />
            ),
        },
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("customers.title")} />
            <ReactDataTable
                columns={columns}
                items={itemsValue}
                onChange={onChange}
                isLoading={isLoading}
                ButtonValue={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.CREATE_CUSTOMER)?getFormattedMessage("customer.create.title"):""}

                totalRows={totalRecord}
                buttonImport={false}
                goToImport={handleClose}
                importBtnTitle={"customers.import.title"}
                to="#/app/customers/create"
            />
            <DeleteCustomer
                onClickDeleteModel={onClickDeleteModel}
                deleteModel={deleteModel}
                onDelete={isDelete}
            />
            {importCustomers && (
                <ImportCustomersModel
                    handleClose={handleClose}
                    show={importCustomers}
                />
            )}
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { customers, totalRecord, isLoading, allConfigData } = state;
    return { customers, totalRecord, isLoading, allConfigData };
};

export default connect(mapStateToProps, { fetchCustomers })(Customers);
