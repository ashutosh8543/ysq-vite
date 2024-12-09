import React, {useState, createRef, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import {connect} from 'react-redux';
import {getFormattedMessage, placeholderText,decimalValidate} from "../../shared/sharedMethod";
import {editCurrency} from '../../store/action/currencyAction';
import MasterLayout from '../MasterLayout';
import HeaderTitle from '../header/HeaderTitle';
import ModelFooter from "../../shared/components/modelFooter";
import { fetchUsers } from '../../store/action/userAction';
import { fetchSalesmans } from '../../store/action/salesmanAction';
import { addCashAmount } from '../../store/action/cashAction';
import { AddQuestionAndOption } from '../../store/action/surveyAction';
import Inputs from "./Inputs";

const AddQuestion = (props) => {
    const {salesmans,cashlist,fetchSalesmans,AddQuestionAndOption} = props;

    const innerRef = createRef();
    return (
        <MasterLayout>
         <HeaderTitle title="Add Survey Question" to='/app/question'/>
            <Form>
                 <Inputs AddQuestionAndOption={AddQuestionAndOption} />
            </Form>
         </MasterLayout>
    )
};

const mapStateToProps = (state) => {
    const {salesmans,cashlist} = state;
    return {salesmans,cashlist}
};

export default connect(mapStateToProps, {AddQuestionAndOption,fetchSalesmans})(AddQuestion);
