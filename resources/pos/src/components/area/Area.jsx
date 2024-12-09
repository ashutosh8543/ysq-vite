import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import MasterLayout from "../MasterLayout";
import ReactDataTable from "../../shared/table/ReactDataTable";
import ModalAction from "../../shared/action-buttons/ActionButton";
import { fetchAreas,deleteArea} from "../../store/action/areaAction";
import TabTitle from "../../shared/tab-title/TabTitle";
import DeleteArea from "./DeleteArea";
import {
    getFormattedDate,
    getFormattedMessage,
    placeholderText,
} from "../../shared/sharedMethod";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import { Permissions } from "../../constants";
const Area = (props) => {
    const {areas,fetchAreas, totalRecord, isLoading, allConfigData } = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);

    useEffect(()=>{
        fetchAreas();
      },[]); 
    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };      
    const itemsValue =
        areas.length >= 0 &&
        areas.map((chanel) => ({
            date: getFormattedDate(
                chanel.created_at,
                allConfigData && allConfigData
            ),
            name: chanel.name,
            region:chanel?.region?.name,
            id: chanel.id,
        }));

    const onChange = (filter) => {
        fetchAreas(filter, true);
    };

    const goToEdit = (item) => {
        const id = item.id;
        window.location.href = "#/app/area/edit/" + id;
    };

    const columns = [
        {
            name: getFormattedMessage("globally.input.name.label"),
            selector: (row) => row.name,
            sortable: true,
            sortField: "name",
        },
        {
            name: "region",
            selector: (row) => row.region,
            sortable: true,
            sortField: "region",
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
                    isEditMode={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.EDIT_AREA)?true:false}
                    isDeleteMode={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.DELETE_AREA)?true:false} 
                    onClickDeleteModel={onClickDeleteModel}
                />
            ),
        },
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title="Areas" />
            <ReactDataTable
                columns={columns}
                items={itemsValue}
                onChange={onChange}
                ButtonValue={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.CREATE_AREA)?"Add Area":""}
                to="#/app/area/create"
                totalRows={totalRecord}
                isLoading={isLoading}
            />
            <DeleteArea
                onClickDeleteModel={onClickDeleteModel}
                deleteModel={deleteModel}
                onDelete={isDelete}
            />
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const {areas, totalRecord, isLoading, allConfigData } = state;
    return {areas, totalRecord, isLoading, allConfigData };
};
export default connect(mapStateToProps, {fetchAreas })(Area);
