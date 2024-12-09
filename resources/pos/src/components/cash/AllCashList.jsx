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
import ActionButton from "../../shared/action-buttons/ActionButton";
import { fetchFrontSetting } from "../../store/action/frontSettingAction";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import { Permissions } from "../../constants";
import { fetchAllCashHistory } from "../../store/action/cashAction";

const AllCashList = (props) => {
    const {
        totalRecord,
        isLoading,
        frontSetting,
        fetchFrontSetting,
        allConfigData,
        cashlist,
        fetchAllCashHistory,
    } = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFrontSetting();
        fetchAllCashHistory();
    }, []);

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const onChange = (filter) => {
        fetchAllCashHistory(filter, true);
    };
     
    const currencySymbol =
    frontSetting &&
    frontSetting.value &&
    frontSetting.value.currency_symbol;


    const itemsValue =
        cashlist.length >= 0 &&
        cashlist.map((item) => ({
            cash: currencySymbol+" "+ item?.cash,
            name: item.sales_man?.first_name + " " + item.sales_man?.last_name,
            type: item?.type,
            created_at: getFormattedDate(
                item?.created_at,
                allConfigData && allConfigData
            ),
            id: item?.id,
        }));
    const columns = [
        {
            name: getFormattedMessage("globally.input.sales_mane.label"),
            selector: (row) => row?.name,
            sortable: false,
            sortField: "name",
        },
        {
            name: getFormattedMessage("globally.input.cash.label"),
            selector: (row) => row?.cash,
            sortable: false,
            sortField: "cash",
        },
        {
            name: getFormattedMessage("globally.input.cash_type.label"),
            selector: (row) => row.type,
            sortField: "type",
            sortable: false,
        },
        {
            name: getFormattedMessage("globally.input.uploaded.label"),
            selector: (row) => row?.created_at,
            sortField: "date",
            sortable: false,
        },
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title="Cash History" />
            <ReactDataTable
                columns={columns}
                items={itemsValue}
                onChange={onChange}
                isShowDateRangeField
                isLoading={isLoading}
                isShowFilterField
                totalRows={totalRecord}
                ButtonValue={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.ASIGN_CASH)?"Asign Cash":""}
                to="#/app/asign-cash"
            />
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { cashlist, totalRecord, isLoading, frontSetting, allConfigData } =
        state;
    return { cashlist, totalRecord, isLoading, frontSetting, allConfigData };
};

export default connect(mapStateToProps, {
    fetchAllCashHistory,
    fetchFrontSetting,
})(AllCashList);
