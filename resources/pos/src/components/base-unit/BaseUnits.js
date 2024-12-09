import React, { useState } from 'react';
import { connect } from 'react-redux';
import MasterLayout from '../MasterLayout';
import { fetchBaseUnits } from '../../store/action/baseUnitsAction';
import ReactDataTable from '../../shared/table/ReactDataTable';
import DeleteBaseUnits from './DeleteBaseUnits';
import CreateBaseUnits from './CreateBaseUnits';
import EditBaseUnits from './EditBaseUnits';
import TabTitle from '../../shared/tab-title/TabTitle';
import { getFormattedMessage, placeholderText } from '../../shared/sharedMethod';
import ActionButton from '../../shared/action-buttons/ActionButton';
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import { Permissions } from '../../constants';
const BaseUnits = ( props ) => {
    const { fetchBaseUnits, baseUnits, totalRecord, isLoading ,allConfigData} = props;
    const [ deleteModel, setDeleteModel ] = useState( false );
    const [ isDelete, setIsDelete ] = useState( null );
    const [ editModel, setEditModel ] = useState( false );
    const [ unit, setUnit ] = useState();

    const handleClose = ( item ) => {
        setEditModel( !editModel );
        setUnit( item );
    };

    const onClickDeleteModel = ( isDelete = null ) => {
        setDeleteModel( !deleteModel );
        setIsDelete( isDelete );
    };

    const onChange = ( filter ) => {
        fetchBaseUnits( filter, true );
    };

    const itemsValue = baseUnits.length >= 0 && baseUnits.map( unit => {
        return {
            name: unit.attributes.name,
            id: unit.id
        }
    } );

    const columns = [
        {
            name: getFormattedMessage( 'globally.input.name.label' ),
            selector: row => row.name,
            sortField: 'name',
            sortable: true,
        },
        {
            name: getFormattedMessage( 'react-data-table.action.column.label' ),
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: row => <ActionButton item={row} goToEditProduct={handleClose}
             isEditMode={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.EDIT_UNIT)?true:false}
             isDeleteMode={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.DELETE_UNIT)?true:false}                 
     
            onClickDeleteModel={onClickDeleteModel} />
        }
    ];

    return (
        <MasterLayout>
            <TopProgressBar />
            <TabTitle title={placeholderText( 'base-units.title' )} />
            <ReactDataTable columns={columns} items={itemsValue} onChange={onChange} isLoading={isLoading}
                AddButton={allConfigData?.permissions && allConfigData?.permissions.includes(Permissions.CREATE_UNIT)?<CreateBaseUnits/>:""}
 
                title={getFormattedMessage( 'unit.modal.input.base-unit.label' )}
                totalRows={totalRecord} isUnitFilter />
            <EditBaseUnits handleClose={handleClose} show={editModel} unit={unit} />
            <DeleteBaseUnits onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel}
                onDelete={isDelete} />
        </MasterLayout>
    )
};

const mapStateToProps = ( state ) => {
    const { baseUnits, totalRecord, isLoading,allConfigData} = state;
    return { baseUnits, totalRecord, isLoading,allConfigData }
};

export default connect( mapStateToProps, { fetchBaseUnits } )( BaseUnits );

