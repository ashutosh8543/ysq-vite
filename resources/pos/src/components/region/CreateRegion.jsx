import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap-v5';
import {Filters} from '../../constants';
import {addRegion} from '../../store/action/regionAction';
import RegionForm from './RegionForm';
import {getFormattedMessage} from '../../shared/sharedMethod';

const CreateRegion = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(!show);
    const {addRegion} = props;
    const addRegionData = (formValue) => {
        addRegion(formValue, Filters.OBJ);
    };
    return (
        <div className='text-end w-sm-auto w-100'>
            <Button variant='primary mb-lg-0 mb-md-0 mb-4' onClick={handleClose}>
                {getFormattedMessage('region.create.title')}
            </Button>
            <RegionForm addRegionData={addRegionData} handleClose={handleClose} show={show}
                          title={getFormattedMessage('region.create.title')}/>
        </div>
    )
};

export default connect(null, {addRegion})(CreateRegion);
