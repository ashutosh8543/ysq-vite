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

import { fetchAllCashHistory } from "../../store/action/cashAction";
import  {SurveyLists } from  "../../store/action/surveyAction"
import { Permissions } from "../../constants";
const SurveyList = (props) => {
    const {
        totalRecord,
        isLoading,
        frontSetting,
        fetchFrontSetting,
        allConfigData,
        surveys,
        SurveyLists
    } = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const navigate = useNavigate();  
     
    useEffect(() => {
        SurveyLists();
    }, []);
    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const onChange = (filter) => {
        fetchAllCashHistory(filter, true);
    };   
        const onSurveyClick = (item) => {
            const id = item.id;
            window.location.href = "#app/survey-details/" + id;
        };

    const itemsValue =
    surveys.length >= 0 &&
    surveys.map((item) => ({
            survey_date:  item?.survey_date,
            name: item.salesman_details?.first_name + " " + item.salesman_details?.last_name,
            order_id: item?.order_id,
            created_at: getFormattedDate(
                item?.created_at,
                allConfigData && allConfigData
            ),
            id: item?.id,
        }));
    const columns = [
        {
            name: "Survey Date",
            selector: (row) => row?.survey_date,
            sortable: false,
            sortField: "survey_date",
        },
        {
            name: "Order Id",
            selector: (row) => row.order_id,
            sortField: "order_id",
            sortable: false,
        },
        {
            name: "Salesman",
            selector: (row) => row?.name,
            sortable: false,
            sortField: "name",
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
                    onClick={() => onSurveyClick(row)}
                >
                    Details
                </button>
            ),
        },
        // {
        //     name: "Question",
        //     selector: (row) => row.question,
        //     sortField: "quetion",
        //     sortable: false,
        // },
        // {
        //     name: "Answer",
        //     selector: (row) => row.option,
        //     sortField: "option",
        //     sortable: false,
        // },       
        // {
        //     name: getFormattedMessage("globally.input.uploaded.label"),
        //     selector: (row) => row?.created_at,
        //     sortField: "Date",
        //     sortable: false,
        // },
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title="Survey List" />
            <ReactDataTable
                columns={columns}
                items={itemsValue}
                onChange={onChange}
                isShowDateRangeField
                isLoading={isLoading}
                // isShowFilterField
                totalRows={totalRecord}
                // ButtonValue={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.CREATE_QUESTION)?"Add Quetion":""}
                // to="#/app/add-question"
            />
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { surveys, totalRecord, isLoading, frontSetting, allConfigData } =
        state;
    return { surveys, totalRecord, isLoading, frontSetting, allConfigData };
};

export default connect(mapStateToProps, {
    SurveyLists,
})(SurveyList);
