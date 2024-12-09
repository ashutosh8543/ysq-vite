import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import MasterLayout from "../MasterLayout";
import { useNavigate, Link } from "react-router-dom";
import ReactDataTable from "../../shared/table/ReactDataTable";
import TabTitle from "../../shared/tab-title/TabTitle";
import {
    currencySymbolHandling,
    getFormattedDate,
    getFormattedMessage,
    placeholderText,
    getAvatarName,
} from "../../shared/sharedMethod";
import ModalAction from "../../shared/action-buttons/ActionButton";

import { fetchFrontSetting } from "../../store/action/frontSettingAction";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import { fetchAllMileageHistory } from "../../store/action/mileageAction";

const Mileage = (props) => {
    const {
        totalRecord,
        isLoading,
        frontSetting,
        fetchFrontSetting,
        allConfigData,
        mileagelist,
        fetchAllMileageHistory,
    } = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);

    useEffect(() => {
        fetchFrontSetting();
        fetchAllMileageHistory();
    }, []);

    const onChange = (filter) => {
        fetchAllMileageHistory(filter, true);
    };

    const onMileageClick = (item) => {
        const id = item.id;
        window.location.href = "#app/mileage-details/" + id;
    };

    const itemsValue =
        mileagelist.length >= 0 &&
        mileagelist.map((item) => ({
            vehicle_image: item?.vehicle_image,
            mileage_image: item?.mileage_image,
            mileage: item?.mileage + " Km",
            sales_man:
                item?.sales_man?.first_name + " " + item?.sales_man?.last_name,
            type: item?.type,
            uploaded_date: item?.uploaded_date,
            created_at: getFormattedDate(
                item?.created_at,
                allConfigData && allConfigData
            ),
            id: item?.id,
        }));

    const columns = [
        {
            name: getFormattedMessage("globally.input.sales_mane.label"),
            selector: (row) => row?.sales_man,
            sortable: true,
            sortField: "sales_man",
        },
        {
            name: getFormattedMessage("globally.input.mileage.label"),
            selector: (row) => row?.mileage,
            sortable: true,
            sortField: "mileage",
        },
        {
            name: getFormattedMessage("globally.input.mileage_type.label"),
            selector: (row) => row.type,
            sortField: "mileage_type",
            sortable: true,
        },
        {
            name: getFormattedMessage("globally.input.uploaded.label"),
            selector: (row) => row?.created_at,
            sortField: "Date",
            sortable: true,
        },
        {
            name: getFormattedMessage("react-data-table.action.column.label"),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: (row) => (
                <button
                    className="btn btn-sm btn-primary"
                    variant="primary"
                    onClick={() => onMileageClick(row)}
                >
                    {getFormattedMessage("mileage.details.title")}
                </button>
            ),
        },
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("region.title")} />
            <ReactDataTable
                columns={columns}
                items={itemsValue}
                onChange={onChange}
                isShowDateRangeField
                isLoading={isLoading}
                isShowFilterField
                isMileageType
                totalRows={totalRecord}
            />
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { mileagelist, totalRecord, isLoading, frontSetting, allConfigData } =
        state;
    return { mileagelist, totalRecord, isLoading, frontSetting, allConfigData };
};

export default connect(mapStateToProps, {
    fetchAllMileageHistory,
    fetchFrontSetting,
})(Mileage);
