import React from 'react'
import { connect } from 'react-redux';
import { deleteGift } from '../../store/action/giftAction';
import DeleteModel from '../../shared/action-buttons/DeleteModel';

const DeleteGift = (props) => {
    const { deleteGift, onDelete, deleteModel, onClickDeleteModel, allGift } = props;

    const deleteUserClick = () => {
        deleteGift(onDelete.id);
        onClickDeleteModel(false);
    };
  return (
    <div>
            {deleteModel && <DeleteModel onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel}
                deleteUserClick={deleteUserClick} name="delete successfully" />}
        </div>
  )
}
export default connect(null, { deleteGift })(DeleteGift);
