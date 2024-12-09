import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MasterLayout from "../MasterLayout";
import ReactDataTable from "../../shared/table/ReactDataTable";
import TabTitle from "../../shared/tab-title/TabTitle";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import { assignedCustomer } from "../../store/action/assignCustomerAction";
import moment from "moment";
import ModalAction from "../../shared/action-buttons/ActionButton";
import { useNavigate, useParams } from "react-router-dom";

const AssignCustomerList = (props) => {
    const { totalRecord, isLoading, assignedCustomerList, assignedCustomer } =
        props;

    const navigate = useNavigate();
    useEffect(() => {
        assignedCustomer();
    }, []);

    const onChange = (filter) => {
        assignedCustomer(filter, true);
    };

    const itemsValue =
    Array.isArray(assignedCustomerList) && assignedCustomerList.length > 0
    ? assignedCustomerList.map((item) => ({
          salesman_name: item.salesman_name,
          assigned_date: item.assigned_date,
          customer_names: item.customer_names,
          id: item.id,
      }))
    : [];

    const goToProductDetailPage = (item) => {
        const id = item;
        window.location.href = "#/app/assing-customers-details/" + id;
    };

    const columns = [
        {
            name: "Assigned Date",
            selector: (row) => row.assigned_date,
            sortable: true,

            cell: (row) => {
                return (
                    row.assigned_date && (
                        <span className="badge bg-light-info">
                            <div className="mb-1">{row.time}</div>
                            <div>
                                {moment(row.assigned_date).format("DD-MM-yyyy")}
                            </div>
                        </span>
                    )
                );
            },
        },
        {
            name: "Salesman Name",
            sortable: true,
            selector: (row) => row.salesman_name,
        },
        {
            name: "assigned Customer",
            sortable: true,
            selector: (row) => row.customer_names,
        },
        {
            name: "Action",
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: (row) => (
                <ModalAction
                    isViewIcon={true}
                    item={row}
                    goToDetailScreen={goToProductDetailPage}
                    isEditMode={false}
                    isDeleteMode={false}
                />
            ),
        },
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title="Assigned Customer List" />
            <div className="d-flex justify-content-end">
                <button
                    className="btn mb-2"
                    onClick={() =>
                        (window.location.href = "#/app/assign-customer")
                    }
                    style={{ backgroundColor: "#ff5722", color: "white" }}
                >
                    Assign New Customer
                </button>
            </div>
            <ReactDataTable
                columns={columns}
                items={itemsValue}
                isShowDateRangeField
                onChange={onChange}
                isLoading={isLoading}
                totalRows={totalRecord}
            />
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { assignedCustomerList, totalRecord, isLoading } = state;
    return { assignedCustomerList, totalRecord, isLoading };
};
export default connect(mapStateToProps, { assignedCustomer })(
    AssignCustomerList
);
