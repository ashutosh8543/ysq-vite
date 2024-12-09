import React from 'react';
import {connect} from 'react-redux';
import {deleteRegion} from '../../store/action/regionAction';
import DeleteModel from '../../shared/action-buttons/DeleteModel';
import {getFormattedMessage} from '../../shared/sharedMethod';

const DeleteRegion = (props) => {
    const {deleteRegion, onDelete, deleteModel, onClickDeleteModel} = props;

    const deleteUserClick = () => {
        deleteRegion(onDelete.id);
        onClickDeleteModel(false);
    };

    return (
        <div>
            {deleteModel && <DeleteModel onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel}
                                         deleteUserClick={deleteUserClick} name={getFormattedMessage('region.title')}/>}
        </div>
    )
};

export default connect(null, {deleteRegion})(DeleteRegion);
