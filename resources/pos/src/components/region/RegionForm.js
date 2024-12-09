import React, {useState, createRef,useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap-v5';
import {getFormattedMessage, placeholderText} from "../../shared/sharedMethod";
import {editRegion} from '../../store/action/regionAction';
import ModelFooter from '../../shared/components/modelFooter';
import { fetchSetting } from '../../store/action/settingAction';
const RegionForm = (props) => {
    const {addRegionData,editRegion,singleRegion, handleClose, show, title,defaultCountry,fetchSetting} = props;
    const innerRef = createRef();
    const [formValue, setFormValue] = useState({
        country: singleRegion ? singleRegion.country : '',
        name: singleRegion ? singleRegion.name : '',
        status: singleRegion ? singleRegion.status : '',        
    });

    const [errors, setErrors] = useState({
        country:'',
        name: '',
        status: '',        
    });

    const disabled = singleRegion && singleRegion.name === formValue.name.trim() && singleRegion.status === formValue.status.trim() && singleRegion.country === formValue.country.trim() ;

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if(!formValue['country'].trim()) {
        errorss['country'] = "Please select country";    
        }  else if (!formValue['name'].trim()) {
            errorss['name'] = getFormattedMessage("currency.modal.input.name.validate.label");
        } else if ((formValue['name'] && formValue['name'].length > 50)) {
            errorss['name'] = getFormattedMessage("globally.input.name.validate.label");
        } else if (!formValue['status'].trim()) {
            errorss['status'] = getFormattedMessage("region.modal.input.status.validate.label");     
        } else {
            isValid = true;
        }
        setErrors(errorss);
        return isValid;
    };
    useEffect(() => {
        fetchSetting();
    }, []);

    useEffect(() => {
        if (defaultCountry) {
            const countries =
                defaultCountry &&
                defaultCountry.countries &&
                defaultCountry.countries.filter(
                    (country) => country.name === defaultCountry.country
                );
        }
    }, [defaultCountry]);


    const onChangeInput = (e) => {
        e.preventDefault();
        setFormValue(inputs => ({...inputs, [e.target.name]: e.target.value}))
        setErrors('');
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        if (singleRegion && valid) {
            if (!disabled) {
                editRegion(singleRegion.id, formValue, handleClose);
                clearField(false);
            }
        } else {
            if (valid) {
                setFormValue(formValue);
                addRegionData(formValue);
                clearField(false);
            }
        }

    };

    const clearField = () => {
        setFormValue({
            name: '',
            status: '',
            country:'',
        });
        setErrors('');
        handleClose(false);
    };

    return (
        <Modal show={show}
               onHide={clearField}
               keyboard={true}
               onShow={() => setTimeout(() => {

                //    innerRef.current.focus();
               }, 1)}
        >
            <Form onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    onSubmit(e)
                }
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                            <div className='col-md-12  mb-5'>
                             <label  className="form-label">
                                {getFormattedMessage("globally.input.country.label")} :<span className="required" />
                            </label>
                        <select className='form-control' autoFocus={true} name='country'  value={formValue?.country} onChange={(e) => onChangeInput(e)} >
                          <option value="">Please Select </option>
                            {                               
                        defaultCountry &&
                            defaultCountry.countries &&
                            defaultCountry.countries.map((item) =>
                                   <option key={item.id} value={item.id}>{item.name}</option>
                            )}
                             </select>
                             <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['country'] ? errors['country'] : null}</span>
                        </div>
                        <div className='col-md-12 mb-5'>
                            <label
                                className='form-label'>{getFormattedMessage("globally.input.name.label")}: </label>
                            <span className='required'/>
                            <input type='text' name='name' value={formValue.name}
                                   placeholder={placeholderText("region.modal.input.name.placeholder.label")}
                                   className='form-control' ref={innerRef} autoComplete='off'
                                   onChange={(e) => onChangeInput(e)}/>
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors['name'] ? errors['name'] : null}</span>
                        </div>
                        <div className='col-md-12 mb-5'>
                                <label
                                    className='form-label'>{getFormattedMessage("region.modal.input.status.label")} : </label>
                                <span className='required'/>
                            <select name='status'  className='form-control'  autoFocus={true}  value={formValue?.status} onChange={(e) => onChangeInput(e)}>
                                 <option value="">Please Select </option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>                           
                                <span className='text-danger d-block fw-400 fs-small mt-2'>{errors['status'] ? errors['status'] : null}</span>
                        </div>
                       
                    </div>
                </Modal.Body>
            </Form>
            <ModelFooter onEditRecord={singleRegion} onSubmit={onSubmit} editDisabled={disabled}
                         clearField={clearField} addDisabled={!formValue.name.trim()}/>
        </Modal>
    )
};
const mapStateToProps = (state) => {
    const {
        defaultCountry,
    } = state;
    return {  
        defaultCountry,
    };
};

export default connect(mapStateToProps, {editRegion,fetchSetting})(RegionForm);
