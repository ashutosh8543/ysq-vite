

import React, {useState, createRef, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import {connect,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {getFormattedMessage, placeholderText,decimalValidate} from "../../shared/sharedMethod";
import {editCurrency} from '../../store/action/currencyAction';
import MasterLayout from '../MasterLayout';
import HeaderTitle from '../header/HeaderTitle';
import ModelFooter from "../../shared/components/modelFooter";
import { addCoupon } from '../../store/action/couponAction';
import DatePicker from "react-datepicker";

const CreateCoupon = (props) => {
    const {addCoupon,onChangeDate} = props;
    const innerRef = createRef();
    const [formValue, setFormValue] = useState({
        name: "",
        cn_name: "",
        cn_name: "",
        bn_name: "",
        description: "",
        cn_description: "",
        bn_description: "",
        code:"",
        start_date:"",
        end_date:"",
        how_many_time_can_use:"",
        discount_type:"",
        discount:"",
        status: "",
    });
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());



    const { allConfigData } = useSelector((state) => state);


    const [errors, setErrors] = useState({
        name: "",
        cn_name: "",
        cn_name: "",
        bn_name: "",
        description: "",
        cn_description: "",
        bn_description: "",
        code:"",
        start_date:"",
        end_date:"",
        how_many_time_can_use:"",
        discount_type:"",
        discount:"",
        status: "",
    });
    const navigate = useNavigate();

    const handleValidation = () => {
        let errorss = {};
        const codeRegex = /^[A-Z0-9]+$/;
        let isValid = false;
        if(!formValue['name'].trim()){
            errorss['name'] = "Please Enter name";
        }else if (!formValue['cn_name'].trim()){
            errorss['cn_name'] = "Please Enter name in chinese";    
        }
        else if (!formValue['bn_name'].trim()){
            errorss['bn_name'] = "Please Enter name in Bahasa Indonesia";    
        }
        else if (!formValue['description'].trim()){
            errorss['description'] = "Please Enter description";    
        
        }else if (!formValue['cn_description'].trim()){
            errorss['cn_description'] = "Please enter description in chinese ";    
        
        }else if (!formValue['bn_description'].trim()){
            errorss['bn_description'] = "Please enter description in Bahasa Indonesia";    
        
        }else if (!formValue['code'].trim()){
            errorss['code'] = "Please Enter code";    
        
        }
        else if (formValue["code"] && !codeRegex.test(formValue["code"])){
            errorss["code"] = getFormattedMessage("barcode-symbol-uppercase-validation-message");
        } 
              
        else if (!formValue['how_many_time_can_use'].trim()){
            errorss['how_many_time_can_use'] = "Please Enter how many time can use";    
        }
        else if (!formValue['discount'].trim()){
            errorss['discount'] = "Please Enter discount amount";    
        }  
        else if (!formValue['status'].trim()){
            errorss['status'] = "Please select status";    
        }        
        // else if (!formValue['discount_type'].trim()){
        //     errorss['discount_type'] = "Please select coupon type";    
        // } 
        else if (!formValue['start_date']){
            errorss['start_date'] = "Please Enter start date";    
        }        
        else if (!formValue['end_date']){
            errorss['end_date'] = "Please Enter end date";    
        }        
        else {
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
        formValue.start_date=startDate;
        formValue.end_date=endDate;
        const valid = handleValidation();     
            if (valid) {
                setFormValue(formValue);
                addCoupon(formValue,navigate);                
                clearField(false);               
            }    
    };

    const format = (allConfigData) => {
        const format = allConfigData && allConfigData.date_format;
        if (format === "d-m-y") {
            return "dd-MM-yyyy";
        } else if (format === "m-d-y") {
            return "MM-dd-yyyy";
        } else if (format === "y-m-d") {
            return "yyyy-MM-dd";
        } else if (format === "m/d/y") {
            return "MM/dd/yyyy";
        } else if (format === "d/m/y") {
            return "dd/MM/yyyy";
        } else if (format === "y/m/d") {
            return "yyyy/MM/dd";
        } else if (format === "m.d.y") {
            return "MM.dd.yyyy";
        } else if (format === "d.m.y") {
            return "dd.MM.yyyy";
        } else if (format === "y.m.d") {
            return "yyyy.MM.dd";
        } else "yyyy-mm-dd";
    };   

    const clearField = () => {
        setFormValue({
            name: "",
            cn_name: "",
            cn_name: "",
            bn_name: "",
            description: "",
            cn_description: "",
            bn_description: "",
            code:"",
            start_date:"",
            end_date:"",
            how_many_time_can_use:"",
            discount_type:"",
            discount:"",
            status: "", 
        });
        setErrors('');
    };

    return (
        <MasterLayout>
         <HeaderTitle title="Add Coupon" to='/app/coupons'/>
         <Form>
                    <div className="row">
                    <div className="col-md-4 mb-3">
                            <label className="form-label">
                                 Name
                            </label>
                            <span className="required" />
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter Coupon Name"                                
                                onChange={(e) => onChangeInput(e)}
                                value={formValue.name}
                            />
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["name"] ? errors["name"] : null}
                            </span>
                        </div>  
                        <div className="col-md-4 mb-3">
                            <label className="form-label">
                               Name in Chinese
                            </label>
                            <span className="required" />
                            <input
                                type="text"
                                name="cn_name"
                                className="form-control"
                                placeholder="Name in Chinese"                                
                                onChange={(e) => onChangeInput(e)}
                                value={formValue.cn_name}
                            />
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["cn_name"] ? errors["cn_name"] : null}
                            </span>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">
                            Name in Bahasa Indonesia
                            </label>
                            <span className="required" />
                            <input
                                type="text"
                                name="bn_name"
                                className="form-control"
                                placeholder="Name in Bahasa Indonesia"                                
                                onChange={(e) => onChangeInput(e)}
                                value={formValue.bn_name}
                            />
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["bn_name"] ? errors["bn_name"] : null}
                            </span>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">
                            Description
                            </label>
                            <span className="required" />
                            <textarea
                                type="text"
                                name="description"
                                className="form-control"
                                placeholder="description"                                
                                onChange={(e) => onChangeInput(e)}
                                value={formValue.description}
                            />
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["description"] ? errors["description"] : null}
                            </span>
                        </div>                  
                        <div className="col-md-4 mb-3">
                            <label className="form-label">
                            Description in chinese
                            </label>
                            <span className="required" />
                            <textarea
                                type="text"
                                name="cn_description"
                                className="form-control"
                                placeholder="Description in Chinese"                                
                                onChange={(e) => onChangeInput(e)}
                                value={formValue.cn_description}
                            />
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["cn_description"] ? errors["cn_description"] : null}
                            </span>
                        </div>  
                        <div className="col-md-4 mb-3">
                            <label className="form-label">
                            Description in Bahasa Indonesia
                            </label>
                            <span className="required" />
                            <textarea
                                type="text"
                                name="bn_description"
                                className="form-control"
                                placeholder="Description in Bahasa Indonesia"                                
                                onChange={(e) => onChangeInput(e)}
                                value={formValue.bn_description}
                            />
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["bn_description"] ? errors["bn_description"] : null}
                            </span>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">
                            code
                            </label>
                            <span className="required" />
                            <input
                                type="text"
                                name="code"
                                className="form-control"
                                placeholder="code"                                
                                onChange={(e) => onChangeInput(e)}
                                value={formValue.code}
                            />
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["code"] ? errors["code"] : null}
                            </span>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">
                            How many time can use
                            </label>
                            <span className="required" />
                            <input
                                type="text"
                                name="how_many_time_can_use"
                                className="form-control"
                                onKeyPress={(event) =>
                                    decimalValidate(event)
                                }
                                placeholder="how many time can use"                                
                                onChange={(e) => onChangeInput(e)}
                                value={formValue.how_many_time_can_use}
                            />
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["how_many_time_can_use"] ? errors["how_many_time_can_use"] : null}
                            </span>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">
                               Discount
                            </label>
                            <span className="required" />
                            <input
                                type="text"
                                name="discount"
                                className="form-control"
                                onKeyPress={(event) =>
                                    decimalValidate(event)
                                }
                                placeholder="Enter discount"                                
                                onChange={(e) => onChangeInput(e)}
                                value={formValue.discount}
                            />
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["discount"] ? errors["discount"] : null}
                            </span>
                        </div>                     
                        <div className="col-md-4 mb-3">
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
                        {/* <div className="col-md-4 mb-3">
                            <label className="form-label">Please select coupon type</label>
                            <span className="required" />
                            <select className='form-control' autoFocus={true} name='discount_type' value={formValue?.discount_type} onChange={(e) => onChangeInput(e)} >
                             <option value="">Please select coupon type</option>
                             <option value="1">Fixed</option>                    
                             <option value="0">Percentage</option>                   
                             </select>                       
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["discount_type"] ? errors["discount_type"] : null}
                            </span>
                        </div>                           */}
                        <div className="col-md-4 mb-3">
                            <label className="form-label">Start date</label>
                            <span className="required" />
                            <DatePicker 
                             className="datepicker__custom-datepicker px-4"
                             name="star_date"
                             dateFormat={format(allConfigData)}
                              selected={startDate} onChange={(date) => setStartDate(date)} 
                              minDate={new Date()}
                            />              
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["start_date"] ? errors["start_date"] : null}
                            </span>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label">End date</label>
                            <span className="required" />
                            <DatePicker 
                             className="datepicker__custom-datepicker px-4"
                             name="end_date"
                             dateFormat={format(allConfigData)}
                              selected={endDate} 
                              onChange={(date) => setEndDate(date)} 
                              minDate={new Date()}
                            />                             <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["end_date"] ? errors["end_date"] : null}
                            </span>
                        </div> 
                                                                             
                        <ModelFooter onSubmit={onSubmit}  addDisabled={!formValue.name}  link="/app/coupons" />
                    </div>
                </Form>
         </MasterLayout>
    )
};

// const mapStateToProps = (state) => {
//     const {users,cashlist} = state;
//     return {users,cashlist}
// };

export default connect(null, {addCoupon})(CreateCoupon);
