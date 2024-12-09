import React from 'react';
import {connect} from 'react-redux';
import {deleteChanel} from '../../store/action/chanelAction';
import DeleteModel from '../../shared/action-buttons/DeleteModel';
import {getFormattedMessage} from '../../shared/sharedMethod';

const DeleteChanel = (props) => {
    const {deleteChanel, onDelete, deleteModel, onClickDeleteModel} = props;

    const deleteUserClick = () => {
        deleteChanel(onDelete.id);
        onClickDeleteModel(false);
    };

    return (
        <div>
            {deleteModel && <DeleteModel onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel}
                                         deleteUserClick={deleteUserClick} name="Delete Chanel"/>}
        </div>
    )
};

export default connect(null, {deleteChanel})(DeleteChanel);
