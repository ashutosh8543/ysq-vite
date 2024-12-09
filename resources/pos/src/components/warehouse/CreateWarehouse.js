import React from 'react';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import MasterLayout from '../MasterLayout';
import WarehouseForm from './WarehouseForm';
import HeaderTitle from '../header/HeaderTitle';
import {Filters} from '../../constants';
import {getFormattedMessage} from '../../shared/sharedMethod';
import CreateWarehouseForm from './CreateWarehouseForm';
import {addWarehouse } from '../../store/action/userAction';

const CreateWarehouse = (props) => {
    const {addWarehouse} = props;
    const navigate = useNavigate();   

    return (
        <MasterLayout>
            <HeaderTitle title={getFormattedMessage('warehouse.create.title')} to='/app/warehouse'/>
            <CreateWarehouseForm    />
        </MasterLayout>
    )
};

export default connect(null, {addWarehouse})(CreateWarehouse);
