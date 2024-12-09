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
import {QuestionList} from "../../store/action/surveyAction";
import DeleteQuestion from "./DeleteQuestion";
import { Permissions } from "../../constants";


const Question = (props) => {
    const {
        totalRecord,
        isLoading,
        frontSetting,
        fetchFrontSetting,
        allConfigData,
        surveys,
        QuestionList
    } = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        QuestionList();
    }, []);

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const goToEditProduct = (item) => {
        const id = item.id;
        window.location.href = "#/app/edit/question/" + id;
    };


    const goToDetailScreen = (item) => {
        const id = item;
        if(id) {
            window.location.href = "#/app/question-details/" + item;
        } else {
            console.error("ID is undefined for item:", item);
        }
    };

    const onChange = (filter) => {
        QuestionList(filter,true);
    };
    const itemsValue =
    surveys.length >= 0 &&
    surveys.map((item) => ({
            question:  item?.question,
            status: item?.status,
            created_at: getFormattedDate(
                item?.created_at,
                allConfigData && allConfigData
            ),
            id: item?.id,
        }));
    const columns = [
        {
            name: "Quetion",
            selector: (row) => row?.question,
            sortable: false,
            sortField: "question",
        },

        {
            name: "status",
            selector: (row) => row.status,
            sortField: "status",
            sortable: false,
        },
        {
            name: "Date",
            selector: (row) => row?.created_at,
            sortField: "created_at",
            sortable: false,
        },

        {
            name: getFormattedMessage('react-data-table.action.column.label'),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: "120px",
            cell: (row) => (
                <ActionButton
                    isViewIcon={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.MANAGE_QUESTION)?true:false}
                    goToDetailScreen={goToDetailScreen}
                    item={row}
                    goToEditProduct={goToEditProduct}
                    isEditMode={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.EDIT_QUESTION)?true:false}
                    isDeleteMode={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.DELETE_QUESTION)?true:false}                 
                    onClickDeleteModel={() => onClickDeleteModel(row)}
                />
            ),

        }
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title="Questions" />
            <ReactDataTable
                columns={columns}
                items={itemsValue}
                onChange={onChange}
                // isShowDateRangeField
                isLoading={isLoading}
                // isShowFilterField
                totalRows={totalRecord}
                ButtonValue={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.CREATE_QUESTION)?"Add Quetion":""}
                to="#/app/add-question"
            />
            <DeleteQuestion
                onClickDeleteModel={onClickDeleteModel}
                deleteModel={deleteModel}
                onDelete={isDelete}
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
    QuestionList,
    fetchFrontSetting,
})(Question);
