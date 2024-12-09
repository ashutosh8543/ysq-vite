import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MasterLayout from "../MasterLayout";
import ReactDataTable from "../../shared/table/ReactDataTable";
import TabTitle from "../../shared/tab-title/TabTitle";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import axiosApi from "../../config/apiConfig";
import { Tokens } from "../../constants";
import { assignedGift } from "../../store/action/assignedGiftAction";
import { fetchFrontSetting } from "../../store/action/frontSettingAction";
import { format } from "echarts";
import moment from "moment";
import { Permissions } from "../../constants";

const PosLoadGiftList = (props) => {
    const { totalRecord, isLoading, assignedGift, assignedGifts,allConfigData } = props;

    useEffect(() => {
        fetchFrontSetting();
        assignedGift();
    }, []);

    const onChange = (filter) => {
        assignedGift(filter, true);
    };

    const itemsValue =
        assignedGifts &&
        assignedGifts.map((item) => ({
            salesman: item.salesman,
            assign_for_date: item.assign_for_date,
            quantity: item.quantity,
            gifts: item.gifts,
            id: item.id,
        }));

    const columns = [
        {
            name: "Assigned Date",
            selector: (row) => row.assign_for_date,
            cell: (row) => moment(row.assign_for_date).format('DD-MM-yyyy'),
        },
        {
            name: "Salesman Name",
            selector: (row) => row.salesman,
            cell: (row) =>
                row.salesman
                    ? `${row.salesman.first_name} ${row.salesman.last_name}`
                    : "N/A",
        },
        {
            name: "Gift Name",
            selector: (row) => row.gifts,
            cell: (row) => (row.gifts ? row.gifts.title : "N/A"),
        },
        {
            name: "Quantity",
            selector: (row) => row.quantity,
        },
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title="Assigned Gifts" />
            {
                    allConfigData?.permissions &&
                    allConfigData?.permissions.includes(
                        Permissions.STOCKIN_GIFT
                    )
                        ? 
            <div className="d-flex justify-content-end">
                <button
                    className="btn mb-2"
                    onClick={() => (window.location.href = "#/app/load-gift")}
                    style={{ backgroundColor: "#ff5722", color: "white" }}
                >
                    Assign Gift
                </button>
            </div>:""
             }
            <ReactDataTable
                columns={columns}
                items={itemsValue}
                onChange={onChange}
                isShowDateRangeField
                isLoading={isLoading}
                // isShowFilterField
                totalRows={totalRecord}
            />
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const {
        totalRecord,
        isLoading,
        assignedGift,
        assignedGifts,
        frontSetting,
        allConfigData
    } = state;
    return {
        totalRecord,
        isLoading,
        assignedGift,
        assignedGifts,
        frontSetting,
        allConfigData
    };
};

export default connect(mapStateToProps, { assignedGift, fetchFrontSetting })(
    PosLoadGiftList
);
