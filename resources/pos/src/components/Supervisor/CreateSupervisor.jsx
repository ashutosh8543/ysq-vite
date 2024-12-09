import React from 'react';
import { connect } from 'react-redux';
import SupervisorForm from './SupervisorForm';
import {addSuppervisor } from '../../store/action/userAction';
import MasterLayout from '../MasterLayout';
import HeaderTitle from '../header/HeaderTitle';
import { Filters } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { getFormattedMessage } from '../../shared/sharedMethod';

const CreateSupervisor = ( props ) => {
    const { addSuppervisor } = props;
    const navigate = useNavigate();
    const addUserData = ( formValue ) => {
        addSuppervisor( formValue, navigate, Filters.OBJ );
    };

    return (
        <MasterLayout>
            <HeaderTitle title="Create Supervisor" to='/app/supervisor' />
            <SupervisorForm addUserData={addUserData} />
        </MasterLayout>
    );
}

export default connect( null, { addSuppervisor } )( CreateSupervisor );
