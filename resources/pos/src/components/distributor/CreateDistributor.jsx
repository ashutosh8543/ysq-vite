import React from 'react';
import { connect } from 'react-redux';
import DistributorForm from './DistributorForm';
import {addDistributer } from '../../store/action/userAction';
import MasterLayout from '../MasterLayout';
import HeaderTitle from '../header/HeaderTitle';
import { Filters } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { getFormattedMessage } from '../../shared/sharedMethod';

const CreateDistributor = ( props ) => {
    const { addDistributer } = props;
    const navigate = useNavigate();
    const addUserData = ( formValue ) => {
        addDistributer( formValue, navigate, Filters.OBJ );
    };

    return (
        <MasterLayout>
            <HeaderTitle title={getFormattedMessage( 'create.distributor' )} to='/app/distributor' />
            <DistributorForm addUserData={addUserData} />
        </MasterLayout>
    );
}

export default connect( null, { addDistributer } )( CreateDistributor );
