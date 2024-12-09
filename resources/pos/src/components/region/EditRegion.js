import React from 'react';
import RegionForm from './RegionForm';
import { getFormattedMessage } from '../../shared/sharedMethod';

const EditRegion = ( props ) => {
    const { handleClose, show, currency,region } = props;

    return (
        region ?
            <RegionForm handleClose={handleClose} show={show} singleRegion={region}
                title={getFormattedMessage( 'region.edit.title' )} />
            : null
    )
};

export default EditRegion;

