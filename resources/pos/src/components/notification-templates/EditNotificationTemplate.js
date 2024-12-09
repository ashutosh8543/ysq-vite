import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'
import HeaderTitle from '../header/HeaderTitle';
import MasterLayout from '../MasterLayout';
import { getFormattedMessage } from '../../shared/sharedMethod';
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import NotificationTemplateForm from "./NotificationTemplateForm";
import { fetchSmsTemplate } from "../../store/action/notificationTemplateAction";

const EditNotificationTemplate = ( props ) => {
    const { fetchSmsTemplate, smsTemplates } = props;
    const { id } = useParams();

    useEffect( () => {
        fetchSmsTemplate( id );
    }, [] );

    const itemsValue = smsTemplates && smsTemplates.length === 1 && smsTemplates.map( smsTemplate => ( {
        name: smsTemplate.attributes.template_name,
        content: smsTemplate.attributes.content,
        id: smsTemplate.id
    } ) );

    return (
        <MasterLayout>
            <TopProgressBar />
            <HeaderTitle title="Edit Notification Template" to='/app/notification-templates' />
            {smsTemplates && itemsValue.length >= 1 && <NotificationTemplateForm singleSMSTemplate={itemsValue} id={id} />}
        </MasterLayout>
    )
};

const mapStateToProps = ( state ) => {
    const { smsTemplates } = state;
    return { smsTemplates }
};

export default connect( mapStateToProps, { fetchSmsTemplate } )( EditNotificationTemplate );

