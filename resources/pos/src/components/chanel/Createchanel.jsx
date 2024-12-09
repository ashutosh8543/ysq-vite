

import React, {useState, createRef, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {getFormattedMessage, placeholderText,decimalValidate} from "../../shared/sharedMethod";
import {editCurrency} from '../../store/action/currencyAction';
import MasterLayout from '../MasterLayout';
import HeaderTitle from '../header/HeaderTitle';
import ModelFooter from "../../shared/components/modelFooter";
import { fetchUsers } from '../../store/action/userAction';
import { addCashAmount } from '../../store/action/cashAction';
import { addChanel } from '../../store/action/chanelAction';
const CreateChanel = (props) => {
    const {fetchUsers,addChanel} = props;
    const innerRef = createRef();
    const [formValue, setFormValue] = useState({
        status: "",
        name: "",
    });

    const [errors, setErrors] = useState({
        status: '',
        name: '',
    });
    const navigate = useNavigate();

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if (!formValue['status'].trim()) {
            errorss['status'] = "Please select staus";
        } else if (!formValue['name'].trim()) {
            errorss['name'] = "Please Enter name";    
        } else {
            isValid = true;
        }
        setErrors(errorss);
        return isValid;
    };
    
  


    const onChangeInput = (e) => {
        e.preventDefault();
        setFormValue(inputs => ({...inputs, [e.target.name]: e.target.value}))
        setErrors('');
    };
 

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();     
            if (valid) {
                setFormValue(formValue);
                addChanel(formValue,navigate);                
                clearField(false);               
            }    
    };

    const clearField = () => {
        setFormValue({
            status: '',
            name: '',   
        });
        setErrors('');
    };

    return (
        <MasterLayout>
         <HeaderTitle title="Add Channel" to='/app/chanels'/>
         <Form>
                    <div className="row">
                    <div className="col-md-6 mb-3">
                            <label className="form-label">
                                 Channel Name
                            </label>
                            <span className="required" />
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter Channel Name"                                
                                onChange={(e) => onChangeInput(e)}
                                value={formValue.name}
                            />
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["name"] ? errors["name"] : null}
                            </span>
                        </div>                  
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Please select status</label>
                            <span className="required" />
                            <select className='form-control' autoFocus={true} name='status' value={formValue?.status} onChange={(e) => onChangeInput(e)} >
                             <option value="">Please select status</option>
                             <option value="Active">Active</option>                    
                             <option value="Inactive">Inactive</option>                   
                             </select>                         
                         
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["status"] ? errors["status"] : null}
                            </span>
                        </div>                                                     
                        <ModelFooter onSubmit={onSubmit}  addDisabled={!formValue.name}  link="/app/chanels" />
                    </div>
                </Form>
         </MasterLayout>
    )
};

// const mapStateToProps = (state) => {
//     const {users,cashlist} = state;
//     return {users,cashlist}
// };

export default connect(null, {addChanel})(CreateChanel);
