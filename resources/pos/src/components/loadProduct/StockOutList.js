import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MasterLayout from "../MasterLayout";
import ReactDataTable from "../../shared/table/ReactDataTable";
import TabTitle from "../../shared/tab-title/TabTitle";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import {StockOutProductList } from "../../store/action/loadUnloadAction";
import moment from "moment";
import { Permissions } from "../../constants";
const StockOutList = (props) => {
    const {
        totalRecord,
        isLoading,
        assignedProductsList,
        StockOutProductList,
        allConfigData
    } = props;

    useEffect(() => {
        StockOutProductList();
    }, []);

    const onChange = (filter) => {
        StockOutProductList(filter,true)
    };

    const itemsValue = assignedProductsList && assignedProductsList.map((item) => ({
        salesman: item.salesman,
        assign_for_date: item.assign_for_date,
        quantity: item.quantity,
        total_quantity:item.total_quantity,
        product: item.product,
        id: item.id,
    }));

    const columns = [
        {
            name: "Salesman Name",
            selector: (row) => row.salesman,
            cell: (row) => row.salesman ? `${row.salesman.first_name} ${row.salesman.last_name}` : "N/A",
        },
        {
            name: "Assigned Date",
            selector: (row) => row.assign_for_date,
            cell: (row) => moment(row.assign_for_date).format('DD-MM-yyyy'),
        },
        {
            name: "Unload Quantity",
            selector: (row) => row.quantity,
        },
        {
            name: "Loaded Quantity",
            selector: (row) => row.total_quantity,
        },
        {
            name: "Product Name",
            selector: (row) => row.product,
            cell: (row) => row.product ? row.product.name : "N/A",
        },
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title="StockOut Products" />
            {
                    allConfigData?.permissions &&
                    allConfigData?.permissions.includes(
                        Permissions.STOCKOUT_PRODUCT
                    )
                      ?
                    <div className="d-flex justify-content-end">
                        <button
                            className="btn mb-2"
                            onClick={() => window.location.href = "#/app/stockout"}
                            style={{ backgroundColor: "#ff5722", color: "white"  }}
                        >
                        StockOut Product
                        </button>
                    </div>:""
           }
            <ReactDataTable 
                columns={columns}
                items={itemsValue}
                onChange={onChange}
                isShowDateRangeField
                isLoading={isLoading}
                totalRows={totalRecord} />
        </MasterLayout>
    );
};
const mapStateToProps = (state) => {
    const {
        totalRecord,
        isLoading,
        assignedProductsList,
        allConfigData
    } = state;
    return {
        totalRecord,
        isLoading,
        assignedProductsList,
        allConfigData
    };
};

export default connect(mapStateToProps, {StockOutProductList  })(StockOutList);
