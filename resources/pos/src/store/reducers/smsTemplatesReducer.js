import { smsTemplatesActionType } from "../../constants";

export default (state = [], action) => {
    switch (action.type) {
        case smsTemplatesActionType.FETCH_SMS_TEMPLATES:
            return action.payload;
        case smsTemplatesActionType.FETCH_SMS_TEMPLATE:
            return [action.payload];
        case smsTemplatesActionType.ADD_NOTIFICATION_TEMPLATE:
            return action.payload;
        case smsTemplatesActionType.USER_NOTIFICATION_TEMPLATE_LIST:
            return action.payload;
        case smsTemplatesActionType.UPDATE_NOTIFICATION_TEMPLATE:
            return {
                ...state,
                notificationTemplates: state.notificationTemplates.map(
                    (template) =>
                        template.id === action.payload.id
                            ? action.payload
                            : template
                ),
            };
        case smsTemplatesActionType.ADD_ADMIN_NOTIFICATION_TEMPLATE:
            return action.payload;
        case smsTemplatesActionType.ADMIN_NOTIFICATION_TEMPLATE_LIST:
            return action.payload;
        case smsTemplatesActionType.ADMIN_NOTIFICATION_DETAIL:
            return action.payload;
        case smsTemplatesActionType.UPDATE_ADMIN_NOTIFICATION_DETAIL:
            return {
                ...state,
                adminNotificationsDetail: action.payload,
            };

        case smsTemplatesActionType.SET_ACTIVE_DE_ACTIVE:
            return state.map((item) =>
                item.id === +action.payload.id ? action.payload : item
            );
        default:
            return state;
    }
};
