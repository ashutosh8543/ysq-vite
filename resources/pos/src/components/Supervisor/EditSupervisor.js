import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchSingleSupervisor } from '../../store/action/userAction';
import { useParams } from 'react-router-dom';
import MasterLayout from '../MasterLayout';
import HeaderTitle from '../header/HeaderTitle';
import { getFormattedMessage } from '../../shared/sharedMethod';
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import SupervisorForm from './SupervisorForm';

const EditSupervisor = (props) => {
    const { fetchSingleSupervisor, supervisors } = props;
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        fetchSingleSupervisor(id);
        setIsEdit(true);
    }, []);
   

    const itemsValue = supervisors && supervisors.length === 1 && supervisors.map(user => ({
        image: user.attributes.image,
        first_name: user.attributes.first_name,
        last_name: user.attributes.last_name,
        email: user.attributes.email,
        phone: user.attributes.phone,
        country: user.attributes.country,
        role_id: {
            value: user.attributes.role.map((ro) => ro.id),
            label: user.attributes.role.map((ro) => ro.name)
        },
        distributor_id: user.attributes?.supervisor?.distributor_id,
        ware_id: user.attributes?.supervisor?.ware_id,
        supervisor_id: user.attributes?.supervisor?.id,
        id: user.id
    }));

    return (
        <MasterLayout>
            <TopProgressBar />
            <HeaderTitle title="Edit Supervisor" to='/app/supervisor' />
            {supervisors.length === 1 && <SupervisorForm singleUser={itemsValue} id={id} isEdit={isEdit} />}
        </MasterLayout>
    );
}

const mapStateToProps = (state) => {
    const { supervisors } = state;
    return { supervisors }
};

export default connect(mapStateToProps, { fetchSingleSupervisor })(EditSupervisor);
