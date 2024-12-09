import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import MasterLayout from "../MasterLayout";
import { useNavigate, Link } from "react-router-dom";
import ReactDataTable from "../../shared/table/ReactDataTable";
import TabTitle from "../../shared/tab-title/TabTitle";
import { fetchAdminNotificationTemplates } from "../../store/action/notificationTemplateAction";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import ModalAction from "../../shared/action-buttons/ActionButton";
const AdminNotificationTemplateList = (props) => {
    const {
        fetchAdminNotificationTemplates,
        adminNotifications,
        totalRecord,
        isLoading,
    } = props;

    useEffect(() => {
        fetchAdminNotificationTemplates();
    }, []);



    const itemsValue =
        adminNotifications.length >= 0 &&
        adminNotifications.map((item) => ({
            title: item?.title,
            type: item?.type,
            id: item?.id,
        }));

    const onChange = (filter) => {
        fetchAdminNotificationTemplates(filter, true);
    };

    const  goToEditProduct = (item) => {
        const id = item.id;
        window.location.href = "#/app/edit-admin-notification-templates/" + id;
    };

    const columns = [
        {
            name:"Title",
            selector: (row) => row?.title,
            sortable: false,
            sortField: "Name",
        },
        {
            name:"Type",
            selector: (row) => row.type,
            sortField: "type",
            sortable: false,
        },

        {
            name: "Action",
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: (row) => (
                <ModalAction
                    // isViewIcon={true}
                    item={row}
                    goToEditProduct={ goToEditProduct}
                    isEditMode={true}
                    isDeleteMode={false}
                />
            ),
        },

    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title="Admin Notifications List" />
            <div className="d-flex justify-content-end">
                <button
                    className="btn mb-2"
                    onClick={() =>
                        (window.location.href =
                            "#/app/admin-notification-templates/create")
                    }
                    style={{ backgroundColor: "#ff5722", color: "white" }}
                >
                    Create
                </button>
            </div>
            <ReactDataTable
                columns={columns}
                items={itemsValue}
                isLoading={isLoading}
                onChange={onChange}
                totalRows={totalRecord}
            />
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { adminNotifications, totalRecord, isLoading } = state;
    return { adminNotifications, totalRecord, isLoading };
};

export default connect(mapStateToProps, {
    fetchAdminNotificationTemplates,
})(AdminNotificationTemplateList);
