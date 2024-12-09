import React from 'react';
import { connect } from 'react-redux';
import SalesmanForm from './SalesmanForm';
import {addSalesman } from '../../store/action/salesmanAction';
import MasterLayout from '../MasterLayout';
import HeaderTitle from '../header/HeaderTitle';
import { Filters } from '../../constants';
import { useNavigate } from 'react-router-dom';

const CreateSalesman = ( props ) => {
    const { addSalesman } = props;
    const navigate = useNavigate();
    const addUserData = ( formValue ) => {
        addSalesman( formValue, navigate, Filters.OBJ );
    };

    return (
        <MasterLayout>
            <HeaderTitle title="Create Salesman" to='/app/salesman' />
            <SalesmanForm addUserData={addUserData} />
        </MasterLayout>
    );
}

export default connect( null, { addSalesman } )( CreateSalesman );
