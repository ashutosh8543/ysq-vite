import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import MasterLayout from "../MasterLayout";
import { fetchWarehouses } from "../../store/action/warehouseAction";
import ReactDataTable from "../../shared/table/ReactDataTable";
import DeleteWarehouse from "./DeleteWarehouse";
import TabTitle from "../../shared/tab-title/TabTitle";
import {
    getFormattedDate,
    getFormattedMessage,
    placeholderText,
} from "../../shared/sharedMethod";
import ActionButton from "../../shared/action-buttons/ActionButton";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import { Permissions } from "../../constants";
import { setSelectedCountry } from "../../store/action/countryAction";

// Helper function to get avatar initials
const getAvatarName = (name) => {
    const parts = name.split(" ");
    return parts.map((part) => part.charAt(0).toUpperCase()).join("");
};

const Warehouses = (props) => {
    const {
        fetchWarehouses,
        warehouses,
        totalRecord,
        isLoading,
        allConfigData,
        selectedCountry,
    } = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    // const [selectedCountry, setSelectedCountry] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWarehouses();
    }, []);

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const onChange = (filter) => {
        fetchWarehouses(filter, true);
    };

    const goToEditProduct = (item) => {
        const id = item.id;
        navigate(`/app/warehouse/edit/${id}`);
    };

    const goToProductDetailPage = (id) => {
        navigate(`/app/warehouse/detail/${id}`);
    };
    const itemsValue =
    warehouses.length >= 0 &&
    warehouses.map((warehouse) => {
        const warehouseDetails = warehouse.attributes.warehouseDetails || {};
        const countryDetails = warehouse.attributes.countryDetails || {};
        const areaDetails = warehouse.attributes.areaDetails || {};

        return {
            date: getFormattedDate(
                warehouse.attributes.created_at,
                allConfigData && allConfigData
            ),
            time: moment(warehouse.attributes.created_at).format("LT"),
            name: warehouse.attributes.name,
            image: warehouseDetails.image_url || null, // Use optional chaining
            phone: warehouse.attributes.phone,
            unique_code: warehouseDetails.unique_code,
            country: countryDetails.name,
            city: warehouse.attributes.city,
            email: warehouse.attributes.email,
            zip_code: warehouse.attributes.zip_code,
            id: warehouse.id,
            ware_id: warehouse.attributes?.ware_id,
            area: areaDetails.name,
            region: areaDetails.region?.name,
        };
    });


    const columns = [
        {
            name: "Warehouse Id",
            selector: (row) => row.unique_code,
            sortField: "unique_code",
            sortable: true,
        },
        {
            name: getFormattedMessage("globally.detail.warehouse"),
            selector: (row) => row.name,
            sortField: "name",
            sortable: true,
            cell: (row) => {
                const imageUrl = row.image || null;
                return (
                    <div className="d-flex align-items-center">
                        <div className="me-2">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    height="50"
                                    width="50"
                                    alt="Warehouse Image"
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
                            {/* <div>{row.email}</div> */}
                        </div>
                    </div>
                );
            },
        },
        {
            name: "Email & Phone",
            selector: (row) => row.email,
            sortField: "email",
            sortable: false,
            cell: row => (
                <div>
                    <div>{row.email}</div>
                    <div>{row.phone}</div>
                </div>
            ),
        },
        {
            name: getFormattedMessage("globally.input.country.label"),
            selector: (row) => row.country,
            sortField: "country",
            sortable: true,
        },
        {
            name: "Region",
            selector: (row) => row.region,
            sortField: "region",
            sortable: true,
        },
        {
            name: "Area",
            selector: (row) => row.area,
            sortField: "area",
            sortable: true,
        },
        {
            name: getFormattedMessage("react-data-table.action.column.label"),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: (row) => (
                <ActionButton
                    isViewIcon={true}
                    item={row}
                    goToDetailScreen={goToProductDetailPage}
                    goToEditProduct={goToEditProduct}
                    isEditMode={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.EDIT_WAREHOUSE)?true:false}
                    isDeleteMode={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.DELETE_WAREHOUSE)?true:false}
                    onClickDeleteModel={onClickDeleteModel}
                />
            ),
        },
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("warehouse.title")} />
            <ReactDataTable
                columns={columns}
                items={itemsValue}
                onChange={onChange}
                isLoading={isLoading}
                ButtonValue={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.CREATE_WAREHOUSE)?getFormattedMessage("warehouse.create.title"):""}
                totalRows={totalRecord}
                to="#/app/warehouse/create"
            />
            <DeleteWarehouse
                onClickDeleteModel={onClickDeleteModel}
                deleteModel={deleteModel}
                onDelete={isDelete}
            />
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { warehouses, totalRecord, isLoading, allConfigData } = state;
    return { warehouses, totalRecord, isLoading, allConfigData };
};

export default connect(mapStateToProps, { fetchWarehouses })(Warehouses);
