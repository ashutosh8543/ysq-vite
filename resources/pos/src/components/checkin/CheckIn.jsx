import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import MasterLayout from "../MasterLayout";
import { useNavigate, Link } from "react-router-dom";
import ReactDataTable from "../../shared/table/ReactDataTable";
import { fetchExpenses } from "../../store/action/expenseAction";
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
import { CheckInLists } from "../../store/action/surveyAction";
const CheckIn = (props) => {
    const {
        fetchExpenses,
        expenses,
        totalRecord,
        isLoading,
        frontSetting,
        fetchFrontSetting,
        allConfigData,
        giftHistory,
        surveys,
        CheckInLists,
    } = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        CheckInLists();
    }, []);

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const onChange = (filter) => {
        CheckInLists(filter, true);
    };

    const onDetailsClick = (item) => {
        const id = item;
        if (id) {
            window.location.href = "#/app/checkIn/detail/" + item;
        } else {
            console.error("ID is undefined for item:", item);
        }
    };

    const itemsValue =
        surveys &&
        surveys.length >= 0 &&
        surveys.map((item) => ({
            image: item?.image,
            salesman: item?.salesman,
            outlets: item?.customer,
            created_date: item?.created_at,
            id: item?.id,

        }));

    const columns = [
        {
            name: getFormattedMessage("globally.input.image.label"),
            selector: (row) => row.image,
            sortable: false,
            sortField: "image",
            cell: (row) => {
                const imageUrl = row.image ? row.image : null;
                return (
                    <div className="d-flex align-items-center">
                        <div className="me-2">
                            {/* <Link to={`/app/distributors/detail/${row.id}`}> */}
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    height="50"
                                    width="50"
                                    alt="User Image"
                                    className="image image-circle image-mini"
                                />
                            ) : (
                                <span className="custom-user-avatar fs-5">
                                    {getAvatarName(
                                        row.sales_man_id +
                                            " " +
                                            row.sales_man_id
                                    )}
                                </span>
                            )}
                            {/* </Link> */}
                        </div>
                    </div>
                );
            },
        },
        {
            name: "Salesman",
            selector: (row) =>
                row.salesman?.first_name + " " + row.salesman?.last_name,
            sortable: false,
            sortField: "",
        },
        {
            name: getFormattedMessage("globally.input.outlet.label"),
            selector: (row) => row.outlets?.name,
            sortField: "outlet",
            sortable: false,
        },
        {
            name: "CheckIn Date",
            selector: (row) => moment(row.created_date).format("DD-MM-yyyy"),
            sortField: "created_at",
            sortable: false,
        },
        {
            name: getFormattedMessage('react-data-table.action.column.label'),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: (row) => (
                <ActionButton
                isViewIcon={true}
                goToDetailScreen={onDetailsClick}
                item={row}
                isEditMode={false}
                isDeleteMode={false}
            />
            ),

        }
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText("checkin.title")} />
            <ReactDataTable
                columns={columns}
                items={itemsValue}
                onChange={onChange}
                isLoading={isLoading}
                totalRows={totalRecord}
                isShowDateRangeField
            />
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const { giftHistory, surveys, expenses, totalRecord, isLoading } = state;
    return { giftHistory, surveys, expenses, totalRecord, isLoading };
};

export default connect(mapStateToProps, { CheckInLists })(CheckIn);
