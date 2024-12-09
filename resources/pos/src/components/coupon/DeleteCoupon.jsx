import React from 'react';
import {connect} from 'react-redux';
import {deleteCoupon} from '../../store/action/couponAction';
import DeleteModel from '../../shared/action-buttons/DeleteModel';
import {getFormattedMessage} from '../../shared/sharedMethod';

const DeleteCoupon = (props) => {
    const {deleteCoupon, onDelete, deleteModel, onClickDeleteModel} = props;

    const deleteUserClick = () => {
        deleteCoupon(onDelete.id);
        onClickDeleteModel(false);
    };

    return (
        <div>
            {deleteModel && <DeleteModel onClickDeleteModel={onClickDeleteModel} deleteModel={deleteModel}
                                         deleteUserClick={deleteUserClick} name="Delete Coupon"/>}
        </div>
    )
};

export default connect(null, {deleteCoupon})(DeleteCoupon);
