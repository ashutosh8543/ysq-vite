import React from 'react';
import {connect} from 'react-redux';
import {deleteArea} from '../../store/action/areaAction';
import DeleteModel from '../../shared/action-buttons/DeleteModel';
import {getFormattedMessage} from '../../shared/sharedMethod';

const DeleteArea = (props) => {
    const {deleteArea, onDelete, deleteModel, onClickDeleteModel} = props;

    const deleteUserClick = () => {
        deleteArea(onDelete.id);
        onClickDeleteModel(false);
    };

    return (
        <div>
            {deleteModel && <DeleteModel onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel}
                                         deleteUserClick={deleteUserClick} name="Delete Area"/>}
        </div>
    )
};

export default connect(null, {deleteArea})(DeleteArea);
