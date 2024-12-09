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
import { CollectionList } from "../../store/action/creditAction";
const Collection = (props) => {
    const {
        fetchExpenses,
        expenses,
        totalRecord,
        isLoading,
        frontSetting,
        fetchFrontSetting,
        allConfigData,
        giftHistory,
        credits,
        CheckInLists,
        CollectionList,
    } = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFrontSetting();
        CollectionList();
    }, []);

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const onChange = (filter) => {
        CollectionList(filter, true);
    };

    const currencySymbol =
        frontSetting &&
        frontSetting.value &&
        frontSetting.value.currency_symbol;

    const onDetailsClick = (item) => {
        navigate(`/app/submited-gift-details/${item}`);
    };

    const itemsValue =
        credits &&
        credits.length >= 0 &&
        credits.map((item) => ({
            image: item?.image,
            unique_code: item?.unique_code,
            amount: currencySymbol + " " + item?.amount,
            salesman: item?.salesman,
            outlets: item?.customer,
            collection_payment_type: item?.collection_payment_type,
            collected_date: item?.collected_date,
            status: item?.status,
            id: item?.id,
        }));

    const columns = [
        // {
        //     name: getFormattedMessage('globally.input.image.label'),
        //     selector: row => row.image,
        //     sortable: false,
        //     sortField: 'image',
        //     cell: row => {
        //         const imageUrl = row.image ? row.image : null;
        //         return <div className='d-flex align-items-center'>
        //             <div className='me-2'>
        //                 {/* <Link to={`/app/distributors/detail/${row.id}`}> */}
        //                     {imageUrl ?
        //                         <img src={imageUrl} height='50' width='50' alt='User Image'
        //                              className='image image-circle image-mini'/> :
        //                         <span className='custom-user-avatar fs-5'>
        //                                 {getAvatarName(row.sales_man_id + ' ' + row.sales_man_id)}
        //                         </span>
        //                     }
        //                 {/* </Link> */}
        //             </div>
        //         </div>
        //     }
        // },
        {
            name: "Collection Id",
            selector: (row) => row.unique_code,
            sortable: false,
            sortField: "unique_code",
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
            name: "Amount",
            selector: (row) => row.amount,
            sortable: false,
            sortField: "amount",
        },
        {
            name: "Collection Method",
            selector: (row) =>
                row.collection_payment_type
                    ? row.collection_payment_type
                    : "Not Collected Yet",
            sortable: false,
            sortField: "collection_payment_type",
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: false,
            sortField: "status",
        },
        {
            name: "Collection Date",
            selector: (row) =>
                row.collected_date ? row.collected_date : "Not Collected Yet",
            sortField: "collected_date",
            sortable: false,
        },
        // {
        //     name: getFormattedMessage('react-data-table.action.column.label'),
        //     right: true,
        //     ignoreRowClick: true,
        //     allowOverflow: true,
        //     button: true,
        //     cell: (row) => (
        //         <ActionButton
        //         isViewIcon={true}
        //         goToDetailScreen={onDetailsClick}
        //         item={row}
        //         isEditMode={false}
        //         isDeleteMode={false}
        //     />
        //     ),

        // }
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title="Credit Collections" />
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
    const {
        giftHistory,
        credits,
        expenses,
        totalRecord,
        isLoading,
        frontSetting,
    } = state;
    return {
        giftHistory,
        credits,
        expenses,
        totalRecord,
        isLoading,
        frontSetting,
    };
};

export default connect(mapStateToProps, { CollectionList, fetchFrontSetting })(
    Collection
);
