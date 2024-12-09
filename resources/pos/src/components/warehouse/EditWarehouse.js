import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchUser,fetchSingleWarehouse } from '../../store/action/userAction';
import { fetchWarehouse } from '../../store/action/warehouseAction';
import { useParams } from 'react-router-dom';
import MasterLayout from '../MasterLayout';
import HeaderTitle from '../header/HeaderTitle';
import { getFormattedMessage } from '../../shared/sharedMethod';
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import CreateWarehouseForm from './CreateWarehouseForm';

const EditWarehouse = (props) => {
    const { fetchWarehouse, warehouses } = props;
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        fetchWarehouse(id);
        setIsEdit(true);
    }, []);
    const itemsValue = warehouses && warehouses.length === 1 && warehouses.map(user =>({
        image: user.attributes.warehouseDetails?.image,
        first_name: user.attributes.warehouseDetails?.first_name,
        last_name: user.attributes?.warehouseDetails?.last_name,
        email: user.attributes?.email,
        phone: user.attributes?.phone,
        role_id:user.attributes?.warehouseDetails?.role_id,
        country: user.attributes?.warehouseDetails?.country,
        user_id: user.attributes?.user_id,
        ware_id: user.attributes?.ware_id,
        region: user.attributes?.warehouseDetails?.region,
        id: user.id,
        area: user.attributes?.area,
    }));

    return (
        <MasterLayout>
            <TopProgressBar />
            <HeaderTitle title="Edit Warehouse" to='/app/warehouse' />
            {warehouses.length === 1 && <CreateWarehouseForm singleUser={itemsValue} id={id} isEdit={isEdit} />}
        </MasterLayout>
    );
}

const mapStateToProps = (state) => {
    const { warehouses } = state;
    return { warehouses }
};

export default connect(mapStateToProps, { fetchWarehouse })(EditWarehouse);
