import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import MasterLayout from "../MasterLayout";
import { useNavigate,Link  } from "react-router-dom";
import ReactDataTable from "../../shared/table/ReactDataTable";
import { fetchExpenses } from "../../store/action/expenseAction";
import TabTitle from "../../shared/tab-title/TabTitle";
import {
    currencySymbolHandling,
    getFormattedDate,
    getFormattedMessage,
    placeholderText,getAvatarName,
} from "../../shared/sharedMethod";
import ActionButton from "../../shared/action-buttons/ActionButton";
import { fetchFrontSetting } from "../../store/action/frontSettingAction";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import {fetchAllSubmitedGiftsHistory}  from "../../store/action/giftAction";

const SubmitedGifts = (props) => {
    const {
        fetchExpenses,
        expenses,
        totalRecord,
        isLoading,
        frontSetting,
        fetchFrontSetting,
        allConfigData,
        giftHistory,
        fetchAllSubmitedGiftsHistory,

    } = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllSubmitedGiftsHistory();
    }, []);
    
    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const onChange = (filter) => {
        fetchAllSubmitedGiftsHistory(filter,true);
    };

        const onDetailsClick = (item) => {
            navigate(`/app/submited-gift-details/${item}`);
        };

          const itemsValue = giftHistory && giftHistory.length >= 0 && giftHistory.map(item => (
            {
            image: item?.image,
            gitf_details: item?.gitf_details,
            quantity: item?.total_quantity,
            outlets: item?.outlets,
            salesman: item?.salesman_details,
            uploaded_date:item?.uploaded_date,
            id: item?.id
        })); 

        console.log("giftHistory",giftHistory);
        

        const columns = [
            {
                name: getFormattedMessage('globally.input.image.label'),
                selector: row => row.image,
                sortable: false,
                sortField: 'image',
                cell: row => {
                    const imageUrl = row.image ? row.image : null;
                    return <div className='d-flex align-items-center'>
                        <div className='me-2'>
                            {/* <Link to={`/app/distributors/detail/${row.id}`}> */}
                                {imageUrl ?
                                    <img src={imageUrl} height='50' width='50' alt='User Image'
                                         className='image image-circle image-mini'/> :
                                    <span className='custom-user-avatar fs-5'>
                                            {getAvatarName(row.sales_man_id + ' ' + row.sales_man_id)}
                                    </span>
                                }
                            {/* </Link> */}
                        </div>                       
                    </div>
                }
            },
            {
                name: getFormattedMessage('globally.input.gitf_name.label'),
                selector: row => row.salesman?.first_name+' '+row.salesman?.last_name,
                sortable: false,
                sortField: 'salesman',
            },
            {
                name: getFormattedMessage('globally.input.quantity.label'),
                selector: row => row.quantity,
                sortField: 'quantity',
                sortable: false              
            },
            {
                name: getFormattedMessage('globally.input.outlet.label'),
                selector: row => row.outlets?.name,
                sortField: 'outlet',
                sortable: false              
            },
            {
                name: getFormattedMessage('globally.input.uploaded.label'),
                selector: row => row.uploaded_date,
                sortField: 'Date',
                sortable: false              
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
//                     <button   className="btn btn-primary"  onClick={() => onDetailsClick(row)}
// >                           Details
//                         </button>
                ),
              
            }
        ];
    
        return (
            <MasterLayout>
                <TopProgressBar />
                <TabTitle title={placeholderText('region.title')}/>
                <ReactDataTable columns={columns} items={itemsValue} onChange={onChange} isLoading={isLoading}
                                totalRows={totalRecord} />
            </MasterLayout>
        )};

const mapStateToProps = (state) => {
    const {giftHistory, expenses, totalRecord, isLoading } =
        state;
    return {giftHistory, expenses, totalRecord, isLoading};
};

export default connect(mapStateToProps, {fetchAllSubmitedGiftsHistory })(SubmitedGifts);
