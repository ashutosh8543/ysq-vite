import React, {useState} from 'react';
import {connect} from 'react-redux';
import MasterLayout from '../MasterLayout';
import { fetchRegions} from '../../store/action/regionAction';
import ReactDataTable from '../../shared/table/ReactDataTable';
import DeleteRegion from './DeleteRegion';
import CreateRegion from './CreateRegion';
import EditRegion from './EditRegion';
import TabTitle from '../../shared/tab-title/TabTitle';
import {getFormattedMessage, placeholderText} from '../../shared/sharedMethod';
import ActionButton from '../../shared/action-buttons/ActionButton';
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import { Permissions } from '../../constants';
const Region = (props) => {
    const {fetchRegions,regions, totalRecord, isLoading,allConfigData} = props;
    const [deleteModel, setDeleteModel] = useState(false);
    const [isDelete, setIsDelete] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [region, setRegion] = useState();
    const handleClose = (item = null) => {
        setToggle(!toggle);
        setRegion(item);
    };

    const onClickDeleteModel = (isDelete = null) => {
        setDeleteModel(!deleteModel);
        setIsDelete(isDelete);
    };

    const onChange = (filter) => {
        fetchRegions(filter, true);
    };    
    const itemsValue = regions.length >= 0 && regions.map(item => ({
        name: item?.name,
        status: item?.status,
        country: item?.country?.name,
        id: item?.id
    }));


    const columns = [
        {
            name: getFormattedMessage('globally.input.name.label'),
            selector: row => row.name,
            sortable: false,
            sortField: 'name',
        },
        {
            name: getFormattedMessage('globally.input.country.label'),
            selector: row => row.country,
            sortable: false,
            sortField: 'country',
        },
        {
            name: getFormattedMessage('region.modal.input.status.label'),
            selector: row => row.status,
            sortField: 'status',
            sortable: false,
            cell: row => {
                return <span className='badge bg-light-info'>
                            <span>{row.status}</span>
                        </span>
            }
        },
        
        {
            name: getFormattedMessage('react-data-table.action.column.label'),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: row => {
                return <ActionButton
                 item={row} 
                 goToEditProduct={handleClose} 
                 isEditMode={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.EDIT_REGION)?true:false}
                 isDeleteMode={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.DELETE_REGION)?true:false} 
                 onClickDeleteModel={onClickDeleteModel}/>
            }
        }
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText('region.title')}/>
            <ReactDataTable 
            columns={columns} 
            items={itemsValue}
             onChange={onChange} 
             isLoading={isLoading}
            totalRows={totalRecord} 
            AddButton={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.CREATE_REGION)?<CreateRegion/>:""}

            />
            <EditRegion handleClose={handleClose} show={toggle} region={region}/>
            <DeleteRegion onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel} onDelete={isDelete}/>
        </MasterLayout>
    )
};

const mapStateToProps = (state) => {
    const {regions,  totalRecord, isLoading,allConfigData} = state;
    return {regions, totalRecord, isLoading,allConfigData}
};

export default connect(mapStateToProps, {fetchRegions})(Region);

