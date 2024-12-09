import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import DistributorForm from './DistributorForm';
import { fetchUser } from '../../store/action/userAction';
import { useParams } from 'react-router-dom';
import MasterLayout from '../MasterLayout';
import HeaderTitle from '../header/HeaderTitle';
import { getFormattedMessage } from '../../shared/sharedMethod';
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";

const EditDistributor = (props) => {
    const { fetchUser, users } = props;
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        fetchUser(id);
        setIsEdit(true);
    }, []);

    const itemsValue = users && users.length === 1 && users.map(user => ({
        image: user.attributes.image,
        first_name: user.attributes.first_name,
        last_name: user.attributes.last_name,
        email: user.attributes.email,
        phone: user.attributes.phone,
        role_id: {
            value: user.attributes.role.map((ro) => ro.id),
            label: user.attributes.role.map((ro) => ro.name)
        },
        country: user.attributes.country,
        region: user.attributes.region,
        id: user.id,
    }));

    console.log("fields:", itemsValue);

    return (
        <MasterLayout>
            <TopProgressBar />
            <HeaderTitle title={getFormattedMessage('distributor.edit.title')} to='/app/distributor' />
            {users.length === 1 && <DistributorForm singleUser={itemsValue} id={id} isEdit={isEdit} />}
        </MasterLayout>
    );
}

const mapStateToProps = (state) => {
    const { users } = state;
    return { users }
};

export default connect(mapStateToProps, { fetchUser })(EditDistributor);
