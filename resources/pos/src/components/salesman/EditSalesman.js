import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchSingleSalesman } from '../../store/action/salesmanAction';
import { useParams } from 'react-router-dom';
import MasterLayout from '../MasterLayout';
import HeaderTitle from '../header/HeaderTitle';
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import SalesmanForm from './SalesmanForm';

const EditSalesman = (props) => {
    const { fetchSingleSalesman, salesmans } = props;
    const { id } = useParams();
    const [isEdit, setIsEdit] = useState(true);

    useEffect(() => {
        fetchSingleSalesman(id);
        setIsEdit(true);
    }, []);
    
    console.log("salesmans",salesmans);
    
    const itemsValue = salesmans && salesmans.length === 1 && salesmans.map(user => ({
        image: user.attributes.image,
        first_name: user.attributes.first_name,
        last_name: user.attributes.last_name,
        email: user.attributes.email,
        phone: user.attributes.phone,
        country: user.attributes?.countryDetails?.name,
        role_id: {
            value: user.attributes.role.map((ro) => ro.id),
            label: user.attributes.role.map((ro) => ro.name)
        },
        distributor_id: user.attributes?.salesman_details[0]?.distributor_id,
        ware_id: user.attributes?.salesman_details[0]?.ware_id,
        id: user.id,
        salesman_id:user.attributes?.salesman_details[0]?.id,
    }));

    return (
        <MasterLayout>
            <TopProgressBar />
            <HeaderTitle title="Edit Salesman" to='/app/salesman' />
            {salesmans.length === 1 && <SalesmanForm singleUser={itemsValue} id={id} isEdit={isEdit} />}
        </MasterLayout>
    );
}

const mapStateToProps = (state) => {
    const { salesmans } = state;
    return { salesmans }
};

export default connect(mapStateToProps, { fetchSingleSalesman })(EditSalesman);
