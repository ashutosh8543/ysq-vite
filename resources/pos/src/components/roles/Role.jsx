import React, { useState } from "react";
import { connect } from "react-redux";
import MasterLayout from "../MasterLayout";
import ReactDataTable from "../../shared/table/ReactDataTable";
import ModalAction from "../../shared/action-buttons/ActionButton";
import { fetchRoles } from "../../store/action/roleAction";
import DeleteRole from "./DeleteRole";
import TabTitle from "../../shared/tab-title/TabTitle";
import {
    getFormattedDate,
    getFormattedMessage,
    placeholderText,
} from "../../shared/sharedMethod";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import { Permissions } from "../../constants";
const Role = (props) => {
    const { roles, fetchRoles, totalRecord, isLoading, allConfigData } = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const itemsValue =
        roles.length >= 0 &&
        roles.map((role) => ({
            date: getFormattedDate(
                role.attributes.created_at,
                allConfigData && allConfigData
            ),
            name_dispay: role.attributes.display_name,
            name: role.attributes.name,
            id: role.id,
        }));

    const onChange = (filter) => {
        fetchRoles(filter, true);
    };

    const goToEdit = (item) => {
        const id = item.id;
        window.location.href = "#/app/roles/edit/" + id;
    };

    const columns = [
        {
            name: getFormattedMessage("globally.input.name.label"),
            selector: (row) => row.name_dispay,
            sortable: true,
            sortField: "name",
        },
        {
            name: getFormattedMessage("react-data-table.date.column.label"),
            selector: (row) => row.date,
            sortField: "date",
            sortable: false,
        },
        {
            name: getFormattedMessage("react-data-table.action.column.label"),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: (row) => (
                <ModalAction
                    item={row}
                    goToEditProduct={goToEdit}
                    isEditMode={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.EDIT_ROLE)?true:false}
                    isDeleteMode={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.DELETE_ROLE)?true:false} 
                    onClickDeleteModel={onClickDeleteModel}
                />
            ),
        },
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("roles.title")} />
            <ReactDataTable
                columns={columns}
                items={itemsValue}
                onChange={onChange}
                ButtonValue={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.CREATE_ROLE)?"Add Role":""}
                to="#/app/roles/create"
                totalRows={totalRecord}
                isLoading={isLoading}
            />
            <DeleteRole
                onClickDeleteModel={onClickDeleteModel}
                deleteModel={deleteModel}
                onDelete={isDelete}
            />
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { roles, totalRecord, isLoading, allConfigData } = state;
    return { roles, totalRecord, isLoading, allConfigData };
};
export default connect(mapStateToProps, { fetchRoles })(Role);
