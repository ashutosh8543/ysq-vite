//API Base URL
export const apiBaseURL = {
    BRANDS: "/brands",
    CURRENCY: "/currencies",
    REGISTRATION: "/register",
    PRODUCTS_CATEGORIES: "/product-categories",
    VARIATIONS: "/variations",
    ROLES: "/roles",
    GIFT_INVENTORY_DATA:"gift-inventory",
    LANGUAGES: "/languages",
    FETCH_COUNTRY:"/countries",
    UPDATE_COUNTRY:"/update-country",
    UPDATE_GIFT_QUANTITY:"/update-gift-inventory",
    UPDATE_PRODUCT_QUANTITY:"/update-product-inventory",
    FETCH_LANGUAGE_CONTENTS:"/language-contents",
    UPDATE_LANGUAGE_CONTENTS:"/update-language-contents",
    ADD_LANGUAGE_CONTENTS:"/create-language-contents",
    FETCH_LANGUAGE_CONTENTS_DETAIL:"/language-contents",
    FETCH_CHECKIN_DETAILS:"/checkin-details",
    PERMISSION: "/permissions",
    WAREHOUSES: "/warehouses",
    UNITS: "/units",
    BASE_UNITS: "/base-units",
    SUPPLIERS: "/suppliers",
    SMS_SETTING: "/sms-settings",
    SUPPLIERS_REPORT: "/supplier-report",
    CUSTOMERS_REPORT: "/customer-report",
    CUSTOMERS: "/customers",
    USERS: "/users",
    DISTRIBUTORS:"/distributors",
    EXPENSES_CATEGORIES: "/expense-categories",
    EXPENSES: "/expenses",
    MAIN_PRODUCTS: "/main-products",
    PRODUCTS: "/products",
    IMPORT_PRODUCT: "/import-products",
    IMPORT_SUPPLIER: "/import-suppliers",
    IMPORT_CUSTOMERS: "/import-customers",
    PURCHASES: "/purchases",
    TRANSFERS: "/transfers",
    SALES: "/sales",
    QUOTATIONS: "/quotations",
    QUOTATIONS_DETAILS: "quotation-info",
    ADJUSTMENTS: "/adjustments",
    SETTINGS: "/settings",
    CACHE_CLEAR: "/cache-clear",
    CHANGE_PASSWORD: "change-password",
    ADMIN_FORGOT_PASSWORD: "forgot-password",
    ADMIN_RESET_PASSWORD: "reset-password",
    EDIT_PROFILE: "edit-profile",
    UPDATE_PROFILE: "update-profile",
    FRONT_SETTING: "front-setting",
    PRODUCT_IMAGE_DELETE: "products-image-delete",
    CASH_PAYMENT: "sales",
    CHANGE_LANGUAGE: "change-language",
    TODAY_SALE_COUNT: "today-sales-purchases-count",
    RECENT_SALES: "recent-sales",
    TOP_SELLING_PRODUCTS: "top-selling-products",
    WEEK_SALE_PURCHASES_API: "week-selling-purchases",
    YEAR_TOP_PRODUCT: "yearly-top-selling",
    TOP_CUSTOMERS: "top-customers",
    PURCHASE_DETAILS: "purchase-info",
    SALE_DETAILS: "sale-info",
    SALE_RETURN: "sales-return",
    SALE_PDF: "sale-pdf-download",
    QUOTATION_PDF: "quotation-pdf-download",
    SALE_RETURN_PDF: "sale-return-pdf-download",
    PURCHASE_PDF: "purchase-pdf-download",
    PURCHASES_RETURN: "purchases-return",
    SALE_RETURN_DETAILS: "sale-return-info",
    PURCHASES_RETURN_DETAILS: "purchase-return-info",
    PURCHASE_RETURN_PDF: "purchase-return-pdf-download",
    WAREHOUSE_REPORT: "warehouse-report",
    WAREHOUSE_DETAILS: "warehouse-details",
    STOCK_REPORT: "stock-report",
    PRODUCT_STOCK_REPORT: "product-stock-alerts",
    TOP_SELLING_REPORT: "top-selling-product-report",
    STOCK_SALE_TAB: "get-sale-product-report",
    STOCK_SALE_RETURN_TAB: "get-sale-return-product-report",
    STOCK_PURCHASE_TAB: "get-purchase-product-report",
    STOCK_PURCHASE_RETURN_TAB: "get-purchase-return-product-report",
    STOCK_DETAILS_WAREHOUSE: "get-product-count",
    TOP_SELLING_PRODUCT_REPORT: "top-selling-product-report",
    STOCK_ALERT: "stock-alerts",
    VALIDATE_AUTH_TOKEN: "validate-auth-token",
    CONFIG: "config",
    EMAIL_TEMPLATES: "mail-templates",
    SMS_TEMPLATES: "sms-templates",
    SMS_TEMPLATES_STATUS: "sms-template-status",
    EMAIL_TEMPLATES_STATUS: "mail-template-status",
    ALL_SALE_PURCHASE: "all-sales-purchases-count",
    SUPPLIER_PURCHASE_REPORT: "supplier-purchases-report",
    SUPPLIER_PURCHASE_RETURN_REPORT: "supplier-purchases-return-report",
    SUPPLIER_PURCHASE_REPORT_EXCEL: "purchases-report-excel",
    SUPPLIER_PURCHASE_RETURN_EXCEL: "purchases-return-report-excel",
    SUPPLIER_REPORT_WIDGET_DATA: "supplier-report-info",
    BEST_CUSTOMERS_REPORT: "best-customers-report",
    BEST_CUSTOMERS_REPORT_PDF: "best-customers-pdf-download",
    PROFIT_AND_LOSS_REPORT: "profit-loss-report",
    CUSTOMER_REPORT_WIDGET_DATA: "customer-info",
    CUSTOMER_REPORT_PDF: "customer-pdf-download",
    CUSTOMER_QUOTATIONS_REPORT_PDF: "customer-quotations-pdf-download",
    CUSTOMER_SALES_REPORT_PDF: "customer-sales-pdf-download",
    CUSTOMER_SALES_RETURNS_REPORT_PDF: "customer-returns-pdf-download",
    CUSTOMER_PAYMENT_REPORT: "customer-payments-report",
    CUSTOMER_PAYMENT_REPORT_PDF: "customer-payments-pdf-download",
    MAIL_SETTINGS: "mail-settings",
    MAIL_SETTINGS_UPDATE: "mail-settings/update",
    TODAY_SALE_OVERALL_REPORT: "today-sales-overall-report",
    EDIT_SALE_FROM_SALE: "sales-return-edit",
    HOLDS_LIST: "holds",
    REGISTER_CASH_IN_HAND: "register-entry",
    CLOSE_REGISTER: "register-close",
    GET_REGISTER_DETAILS: "get-register-details",
    GET_REGISTER_REPORT_DETAILS: "register-report",
    RECEIPT_SETTINGS:"receipt-settings",
    REGION:"/add-region",
    FETCH_REGIONS:"/fetch-regions",
    FETCH_REGION:"/fetch-region",
    DELETE_REGION:"/delete-regions",
    EDIT_REGION:"/edit-regions",
    FETCH_SUBMITTED_GIFT_HISTORY:"/submit-gift-history",
    FETCH_GIFTS:"/get-gift-list",
    FETCH_SINGLE_GIFT_DETAILS:"gift/detail",
    DELETE_GIFT:"/gifts",
    DELETE_QUESTION:"/question",
    FETCH_ALL_CASH_LIST:"/opening-closing-cash-list",
    FETCH_ALL_MILEAGE_LIST:"/mileage-records",
    FETCH_MILEAGE:"/fetch-mileage",
    ADD_CASH_AMOUNT:"/add-cash-amount",
    CHANELS:"/chanels",
    SUPERVISOR:"/supervisors",
    FETCH_SALESMANS:"/salesmans",
    FETCH_ALL_SALESMANS:"show-salesman",
    ADD_CHANEL:"add-chanels",
    FETCH_CHANELS:"/chanels",
    FETCH_CHANEL:"/fetch-chanel",
    EDIT_CHANEL:"edit-chanel",
    DELETE_CHANEL:"delete-chanel",
    ADD_AREA:"add-area",
    FETCH_AREAS:"/areas",
    FETCH_AREA:"/fetch-area",
    EDIT_AREA:"edit-area",
    DELETE_AREA:"delete-area",
    CHANEL_LIST:"chanels-list",
    COUPONS: "/coupon-codes",
    AREA_LIST:"area-list",
    SALESMAN_LIST:"salesman-list",
    ASSIGN_CUSTOMER:"assign-customers",
    FETCH_DISTRIBUTORS:"distributors",
    LOADPRODUCTS:"load",
    FETCH_ASSIGNED_GIFT:"assigned-gift-list",
    FETCH_ASSIGNED_PRODUCT:"assigned-load-product",
    FETCH_ASSIGNED_CUSTOMER:"assigned-customer",
    FETCH_STOCK_OUT_PRODUCT:"stock-out-product-list",
    STOCK_OUT_PRODUCT:"stock-out-product",
    ADD_QUESTION_OPTION:"add-question-option",
    FETCH_QUESTION_LIST:"question-list",
    FETCH_SURVEY_LIST:"survey-list",
    FETCH_SURVEY_DETAILS:"survey-details",
    FETCH_SUBMITTED_GIFT_DETAILS:"submit-gift-details",
    FETCH_ALL_CHECKIN:"all-checkin-list",
    FETCH_ALL_CHECKOUT:"all-checkout-list",
    FETCH_COLLECTION_LIST:"all-collection-list",
    FETCH_SIGNLE_ASSIGNED_CUSTOMER:"fetch-single-assigned-customer",
    FETCH_SIGNLE_ASSIGNED_CUSTOMER_AND_SALESMAN:"fetch-single-assigned-customer-salesman",
    ADD_NOTIFICATION_TEMPLATE:"/create-notification-template",
    USER_NOTIFICATION_TEMPLATE_LIST:"/user-notification-template",
    UPDATE_NOTIFICATION_TEMPLATE:"/user-notification-templates",
    ADD_ADMIN_NOTIFICATION_TEMPLATE:"/create-admin-notification-template",
    ADMIN_NOTIFICATION_TEMPLATE_LIST:"/admin-notification-template-list",
    ADMIN_NOTIFICATION_DETAIL:"/addmin-notification-detail",
    UPDATE_ADMIN_NOTIFICATION_DETAIL:"/update-admin-notification"
};



export const authActionType = {
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    CHANGE_PASSWORD: "CHANGE_PASSWORD",
    ADMIN_FORGOT_PASSWORD: "ADMIN_FORGOT_PASSWORD",
    ADMIN_RESET_PASSWORD: "ADMIN_RESET_PASSWORD",
};

export const countryActionType = {
    FETCH_COUNTRY: "FETCH_COUNTRY",
    UPDATE_COUNTRY:"UPDATE_COUNTRY"

}

export const surveyActionType=
{
   ADD_QUESTION_OPTION:"ADD_QUESTION_OPTION",
   FETCH_QUESTION_LIST:"FETCH_QUESTION_LIST",
   FETCH_SURVEY_LIST:"FETCH_SURVEY_LIST",
   FETCH_SURVEY_DETAILS:"FETCH_SURVEY_DETAILS",
   FETCH_ALL_CHECKIN:"FETCH_ALL_CHECKIN",
   FETCH_ALL_CHECKOUT:"FETCH_ALL_CHECKOUT",
   DELETE_QUESTION:"DELETE_QUESTION",
   ETCH_CHECKIN_DETAILS:"ETCH_CHECKIN_DETAILS"

}



export const creditActionType=
{
   FETCH_COLLECTION_LIST:"FETCH_COLLECTION_LIST",

}

export const configActionType = {
    FETCH_CONFIG: "FETCH_CONFIG",
    FETCH_ALL_CONFIG: "FETCH_ALL_CONFIG",
};

export const brandsActionType = {
    FETCH_BRANDS: "FETCH_BRANDS",
    FETCH_BRAND: "FETCH_BRAND",
    ADD_BRANDS: "ADD_BRANDS",
    EDIT_BRANDS: "EDIT_BRANDS",
    DELETE_BRANDS: "DELETE_BRANDS",
    FETCH_ALL_BRANDS: "FETCH_ALL_BRANDS",
};

export const bestCustomerActionType = {
    FETCH_BEST_CUSTOMER_REPORT: "FETCH_BEST_CUSTOMER_REPORT",
};

export const emailTemplatesActionType = {
    FETCH_EMAIL_TEMPLATES: "FETCH_EMAIL_TEMPLATES",
    FETCH_EMAIL_TEMPLATE: "FETCH_EMAIL_TEMPLATE",
    EDIT_EMAIL_TEMPLATE: "EDIT_EMAIL_TEMPLATE",
    SET_ACTIVE_DE_ACTIVE: "SET_ACTIVE_DE_ACTIVE",
};

export const smsTemplatesActionType = {
    FETCH_SMS_TEMPLATES: "FETCH_SMS_TEMPLATES",
    FETCH_SMS_TEMPLATE: "FETCH_SMS_TEMPLATE",
    EDIT_SMS_TEMPLATE: "EDIT_SMS_TEMPLATE",
    SET_ACTIVE_DE_ACTIVE: "SET_ACTIVE_DE_ACTIVE",
    ADD_NOTIFICATION_TEMPLATE:" ADD_NOTIFICATION_TEMPLATE",
    USER_NOTIFICATION_TEMPLATE_LIST:"USER_NOTIFICATION_TEMPLATE_LIST",
    UPDATE_NOTIFICATION_TEMPLATE:"UPDATE_NOTIFICATION_TEMPLATE",
    ADD_ADMIN_NOTIFICATION_TEMPLATE:"ADD_ADMIN_NOTIFICATION_TEMPLATE",
    ADMIN_NOTIFICATION_TEMPLATE_LIST:"ADMIN_NOTIFICATION_TEMPLATE_LIST",
    ADMIN_NOTIFICATION_DETAIL:"ADMIN_NOTIFICATION_DETAIL",
    UPDATE_ADMIN_NOTIFICATION_DETAIL:"UPDATE_ADMIN_NOTIFICATION_DETAIL"
};

export const expenseActionType = {
    FETCH_EXPENSES: "FETCH_EXPENSES",
    FETCH_EXPENSE: "FETCH_EXPENSE",
    ADD_EXPENSE: "ADD_EXPENSE",
    EDIT_EXPENSE: "EDIT_EXPENSE",
    DELETE_EXPENSE: "DELETE_EXPENSE",
};

export const settingActionType = {
    FETCH_SETTING: "FETCH_SETTING",
    EDIT_SETTINGS: "EDIT_SETTINGS",
    FETCH_CACHE_CLEAR: "FETCH_CACHE_CLEAR",
    FETCH_MAIL_SETTINGS: "FETCH_MAIL_SETTINGS",
    EDIT_MAIL_SETTINGS: "EDIT_MAIL_SETTINGS",
    FETCH_RECEIPT_SETTINGS: "FETCH_RECEIPT_SETTINGS",
    EDIT_RECEIPT_SETTINGS: "EDIT_RECEIPT_SETTINGS",
};

export const warehouseActionType = {
    FETCH_WAREHOUSES: "FETCH_WAREHOUSES",
    FETCH_WAREHOUSE: "WAREHOUSE",
    ADD_WAREHOUSE: "ADD_WAREHOUSE",
    EDIT_WAREHOUSE: "EDIT_WAREHOUSE",
    DELETE_WAREHOUSE: "DELETE_WAREHOUSE",
    FETCH_ALL_WAREHOUSES: "FETCH_ALL_WAREHOUSES",
    FETCH_WAREHOUSE_REPORT: "FETCH_WAREHOUSE_REPORT",
    FETCH_WAREHOUSE_DETAILS: "FETCH_WAREHOUSE_DETAILS",
};

export const supplierActionType = {
    FETCH_SUPPLIERS: "FETCH_SUPPLIERS",
    FETCH_SUPPLIER: "FETCH_SUPPLIER",
    ADD_SUPPLIER: "ADD_SUPPLIER",
    EDIT_SUPPLIER: "EDIT_SUPPLIER",
    DELETE_SUPPLIER: "DELETE_SUPPLIER",
    FETCH_ALL_SUPPLIERS: "FETCH_ALL_SUPPLIERS",
    FETCH_SUPPLIERS_REPORT: "FETCH_SUPPLIERS_REPORT",
};

export const smsApiActionType = {
    FETCH_SMS_SETTINGS: "FETCH_SMS_SETTINGS",
    EDIT_SMS_SETTING: "EDIT_SMS_SETTING",
};

export const unitsActionType = {
    FETCH_UNITS: "FETCH_UNITS",
    FETCH_UNIT: "FETCH_UNIT",
    ADD_UNIT: "ADD_UNIT",
    EDIT_UNIT: "EDIT_UNIT",
    DELETE_UNIT: "DELETE_UNIT",
};

export const baseUnitsActionType = {
    FETCH_UNITS: "FETCH_UNITS",
    FETCH_UNIT: "FETCH_UNIT",
    ADD_UNIT: "ADD_UNIT",
    EDIT_UNIT: "EDIT_UNIT",
    DELETE_UNIT: "DELETE_UNIT",
    FETCH_ALL_BASE_UNITS: "FETCH_ALL_BASE_UNITS",
};

export const productUnitActionType = {
    PRODUCT_UNITS: "PRODUCT_UNITS",
};


export const rolesActionType = {
    FETCH_ROLES: "FETCH_ROLES",
    FETCH_ROLE: "FETCH_ROLE",
    ADD_ROLES: "ADD_ROLES",
    EDIT_ROLES: "EDIT_ROLES",
    DELETE_ROLES: "DELETE_ROLES",
    FETCH_ALL_ROLES: "FETCH_ALL_ROLES",
};

export const assignCustomersActionType = {
    ASSIGN_CUSTOMER:"ASSIGN_CUSTOMER",
    FETCH_ASSIGNED_CUSTOMER:"FETCH_ASSIGNED_CUSTOMER",
    FETCH_SIGNLE_ASSIGNED_CUSTOMER:"FETCH_SIGNLE_ASSIGNED_CUSTOMER",
    FETCH_SIGNLE_ASSIGNED_CUSTOMER_AND_SALESMAN:"FETCH_SIGNLE_ASSIGNED_CUSTOMER_AND_SALESMAN"
};

export const chanelsActionType = {
    FETCH_CHANELS: "FETCH_CHANELS",
    FETCH_CHANEL: "FETCH_CHANEL",
     ADD_CHANEL: "ADD_CHANEL",
     DELETE_CHANEL: "DELETE_CHANEL",
     CHANEL_LIST:"CHANEL_LIST",
};
export const areaActionType = {
    FETCH_AREAS: "FETCH_AREAS",
    FETCH_AREA: "FETCH_AREA",
    ADD_AREA: "ADD_AREA",
    DELETE_AREA: "DELETE_AREA",
    AREA_LIST:"AREA_LIST",
};

export const giftActionType = {
    FETCH_GIFTS: "FETCH_GIFTS",
    FETCH_SUBMITTED_GIFT_HISTORY: "FETCH_SUBMITTED_GIFT_HISTORY",
    FETCH_SUBMITTED_GIFT_DETAILS: "FETCH_SUBMITTED_GIFT_DETAILS",
    DELETE_GIFT:"DELETE_GIFT",
    FETCH_SINGLE_GIFT_DETAILS:"FETCH_SINGLE_GIFT_DETAILS",
    UPDATE_GIFT_QUANTITY:"UPDATE_GIFT_QUANTITY",
    UPDATE_PRODUCT_QUANTITY:"UPDATE_PRODUCT_QUANTITY"
};


export const giftInventoryActionType = {

}

export const  assignedGiftActionType = {
    FETCH_ASSIGNED_GIFT:"FETCH_ASSIGNED_GIFT"
}

export const  assignedProductActionType = {
    FETCH_ASSIGNED_PRODUCT:"FETCH_ASSIGNED_PRODUCT",
    SET_LOADING: 'SET_LOADING', // New action type for loading
    SET_TOTAL_RECORDS: 'SET_TOTAL_RECORDS', // New action type for total records
    FETCH_STOCK_OUT_PRODUCT:"FETCH_STOCK_OUT_PRODUCT",
}


export const cashActionType = {
    FETCH_ALL_CASH_LIST: "FETCH_ALL_CASH_LIST",
    ADD_CASH_AMOUNT:"ADD_CASH_AMOUNT",

};

export const distributorActionType ={
    FETCH_DISTRIBUTORS:"FETCH_DISTRIBUTORS"
}



export const mileageActionType = {
    FETCH_ALL_MILEAGE_LIST: "FETCH_ALL_MILEAGE_LIST",
    FETCH_MILEAGE:"FETCH_MILEAGE",
};




export const languagesActionType = {
    FETCH_LANGUAGES: "FETCH_LANGUAGES",
    FETCH_LANGUAGE: "FETCH_LANGUAGE",
    ADD_LANGUAGE: "ADD_LANGUAGE",
    EDIT_LANGUAGE: "EDIT_LANGUAGE",
    DELETE_LANGUAGE: "DELETE_LANGUAGE",
    FETCH_ALL_LANGUAGES: "FETCH_ALL_LANGUAGES",
    EDIT_LANGUAGE_DATA: "EDIT_LANGUAGE_DATA",
    FETCH_LANGUAGE_DATA: "FETCH_LANGUAGE_DATA",
    FETCH_LANGUAGE_CONTENTS:"FETCH_LANGUAGE_CONTENTS",
    ADD_LANGUAGE_CONTENTS:"ADD_LANGUAGE_CONTENTS",
    FETCH_LANGUAGE_CONTENTS_DETAIL:"FETCH_LANGUAGE_CONTENTS_DETAIL",
    UPDATE_LANGUAGE_CONTENTS:"UPDATE_LANGUAGE_CONTENTS",
    GIFT_INVENTORY_DATA:"GIFT_INVENTORY_DATA"

};

export const productImageActionType = {
    DELETE_PRODUCT_IMAGE: "DELETE_PRODUCT_IMAGE",
};

export const purchaseActionType = {
    FETCH_PURCHASES: "FETCH_PURCHASES",
    FETCH_PURCHASE: "FETCH_PURCHASE",
    ADD_PURCHASE: "ADD_PURCHASE",
    EDIT_PURCHASE: "EDIT_PURCHASE",
    DELETE_PURCHASE: "DELETE_PURCHASE",
    PURCHASE_DETAILS: "PURCHASE_DETAILS",
    PURCHASE_PDF_ACTION: "PURCHASE_PDF_ACTION",
};

export const transferActionType = {
    FETCH_TRANSFERS: "FETCH_TRANSFERS",
    FETCH_TRANSFER: "FETCH_TRANSFER",
    ADD_TRANSFER: "ADD_TRANSFER",
    EDIT_TRANSFER: "EDIT_TRANSFER",
    DELETE_TRANSFER: "DELETE_TRANSFER",
    TRANSFER_DETAILS: "TRANSFER_DETAILS",
    TRANSFER_PDF_ACTION: "TRANSFER_PDF_ACTION",
};

export const purchaseReturnActionType = {
    FETCH_PURCHASES_RETURN: "FETCH_PURCHASES_RETURN",
    FETCH_PURCHASE_RETURN: "FETCH_PURCHASE_RETURN",
    ADD_PURCHASE_RETURN: "ADD_PURCHASE_RETURN",
    EDIT_PURCHASE_RETURN: "EDIT_PURCHASE_RETURN",
    DELETE_PURCHASE_RETURN: "DELETE_PURCHASE_RETURN",
    PURCHASES_RETURN_DETAILS: "PURCHASES_RETURN_DETAILS",
};

export const purchaseProductActionType = {
    SEARCH_PURCHASE_PRODUCTS: "SEARCH_PURCHASE_PRODUCTS",
};

export const permissionActionType = {
    FETCH_PERMISSIONS: "FETCH_PERMISSIONS",
};

export const currencyActionType = {
    FETCH_CURRENCIES: "FETCH_CURRENCIES",
    FETCH_CURRENCY: "FETCH_CURRENCY",
    ADD_CURRENCY: "ADD_CURRENCY",
    EDIT_CURRENCY: "EDIT_CURRENCY",
    DELETE_CURRENCY: "DELETE_CURRENCY",
};

export const regionActionType = {
    FETCH_REGIONS: "FETCH_REGIONS",
    FETCH_REGION: "FETCH_REGION",
    ADD_REGION: "ADD_REGION",
    EDIT_REGION: "EDIT_REGION",
    DELETE_REGION: "DELETE_REGION",
};


export const userActionType = {
    FETCH_USERS: "FETCH_USERS",
    FETCH_USER: "FETCH_USER",
    ADD_USER: "ADD_USER",
    EDIT_USER: "EDIT_USER",
    DELETE_USER: "DELETE_USER",
    DISTRIBUTORS:"FETCH_DISTRIBUTORS",
    SUPERVISOR:"SUPERVISOR",
    FETCH_SUPERVISOR:"FETCH_SUPERVISOR",
    FETCH_WAREHOUSE:"FETCH_WAREHOUSE",
    FETCH_SALESMANS:"FETCH_SALESMANS",
    FETCH_ALL_SALESMANS:"FETCH_ALL_SALESMANS",
    FETCH_SALESMAN:"FETCH_SALESMAN",
    ADD_SALESMAN:"ADD_SALESMAN",
    EDIT_SALESMAN:"EDIT_SALESMAN",
    SALESMAN_LIST:"SALESMAN_LIST",
};


export const couponActionType = {
    FETCH_COUPONS: "FETCH_COUPONS",
    FETCH_COUPON: "FETCH_COUPON",
    ADD_COUPON: "ADD_COUPON",
    EDIT_COUPON: "EDIT_COUPON",
    DELETE_COUPON: "DELETE_COUPON",
};






export const languageActionType = {
    UPDATE_LANGUAGE: "UPDATE_LANGUAGE",
    UPDATED_LANGUAGE: "UPDATED_LANGUAGE",
};

export const profileActionType = {
    FETCH_PROFILE: "FETCH_PROFILE",
    UPDATE_PROFILE: "UPDATE_PROFILE",
};

export const productCategoriesActionType = {
    FETCH_PRODUCTS_CATEGORIES: "FETCH_PRODUCTS_CATEGORIES",
    FETCH_PRODUCT_CATEGORIES: "FETCH_PRODUCT_CATEGORIES",
    ADD_PRODUCT_CATEGORIES: "ADD_PRODUCT_CATEGORIES",
    EDIT_PRODUCT_CATEGORIES: "EDIT_PRODUCT_CATEGORIES",
    DELETE_PRODUCT_CATEGORIES: "DELETE_PRODUCT_CATEGORIES",
    FETCH_ALL_PRODUCTS_CATEGORIES: "FETCH_ALL_PRODUCTS_CATEGORIES",
};

export const variationActionType = {
    FETCH_VARIATIONS: "FETCH_VARIATIONS",
    FETCH_VARIATION: "FETCH_VARIATION",
    ADD_VARIATION: "ADD_VARIATION",
    EDIT_VARIATION: "EDIT_VARIATION",
    DELETE_VARIATION: "DELETE_VARIATION",
    FETCH_ALL_VARIATIONS: "FETCH_ALL_VARIATIONS",
};

export const expenseCategoriesActionType = {
    FETCH_EXPENSES_CATEGORIES: "FETCH_EXPENSES_CATEGORIES",
    FETCH_EXPENSE_CATEGORIES: "FETCH_EXPENSE_CATEGORIES",
    ADD_EXPENSE_CATEGORIES: "ADD_EXPENSE_CATEGORIES",
    EDIT_EXPENSE_CATEGORIES: "EDIT_EXPENSE_CATEGORIES",
    DELETE_EXPENSE_CATEGORIES: "DELETE_EXPENSE_CATEGORIES",
    FETCH_ALL_EXPENSES_CATEGORIES: "FETCH_ALL_EXPENSES_CATEGORIES",
};

export const frontSettingActionType = {
    FETCH_FRONT_SETTING: "FETCH_FRONT_SETTING",
};

export const tokenValidationActionType = {
    FETCH_VALIDATION: "FETCH_VALIDATION",
};

export const customerActionType = {
    FETCH_CUSTOMERS: "FETCH_CUSTOMERS",
    FETCH_CUSTOMER: "FETCH_CUSTOMER",
    ADD_CUSTOMER: "ADD_CUSTOMER",
    EDIT_CUSTOMER: "EDIT_CUSTOMER",
    DELETE_CUSTOMER: "DELETE_CUSTOMER",
    FETCH_ALL_CUSTOMER: "FETCH_ALL_CUSTOMER",
    FETCH_CUSTOMERS_REPORT: "FETCH_CUSTOMERS_REPORT",
    FETCH_CUSTOMERS_PAYMENT_REPORT: "FETCH_CUSTOMERS_PAYMENT_REPORT",
};

export const todaySalePurchaseCountActionType = {
    TODAY_SALE_COUNT: "TODAY_SALE_COUNT",
};

export const dashboardActionType = {
    FETCH_ALL_SALE_PURCHASE: "FETCH_ALL_SALE_PURCHASE",
};

export const saleActionType = {
    FETCH_SALES: "FETCH_SALES",
    FETCH_SALE: "FETCH_SALE",
    ADD_SALE: "ADD_SALE",
    EDIT_SALE: "EDIT_SALE",
    DELETE_SALE: "DELETE_SALE",
    SEARCH_SALE_PRODUCTS: "SEARCH_SALE_PRODUCTS",
    PRODUCT_SALES_UNIT: "PRODUCT_SALES_UNIT",
    SALE_DETAILS: "SALE_DETAILS",
    SALE_PDF: "SALE_PDF",
    FILTER_STATUS_FILED: "FILTER_STATUS_FILED",
    FILTER_PAYMENT_STATUS_FILED: "FILTER_PAYMENT_STATUS_FILED",
    CREATE_SALE_PAYMENT: "CREATE_SALE_PAYMENT",
    FETCH_SALE_PAYMENT: "FETCH_SALE_PAYMENT",
    EDIT_SALE_PAYMENT: "EDIT_SALE_PAYMENT",
    DELETE_SALE_PAYMENT: "DELETE_SALE_PAYMENT",
};

export const holdListActionType = {
    FETCH_HOLDS: "FETCH_HOLDS",
    ADD_HOLD: "ADD_HOLD",
    FETCH_HOLD: "FETCH_HOLD",

    EDIT_SALE: "EDIT_SALE",
    DELETE_SALE: "DELETE_SALE",
    SEARCH_SALE_PRODUCTS: "SEARCH_SALE_PRODUCTS",
    PRODUCT_SALES_UNIT: "PRODUCT_SALES_UNIT",
    SALE_DETAILS: "SALE_DETAILS",
    SALE_PDF: "SALE_PDF",
    FILTER_STATUS_FILED: "FILTER_STATUS_FILED",
    FILTER_PAYMENT_STATUS_FILED: "FILTER_PAYMENT_STATUS_FILED",
    CREATE_SALE_PAYMENT: "CREATE_SALE_PAYMENT",
    FETCH_SALE_PAYMENT: "FETCH_SALE_PAYMENT",
    EDIT_SALE_PAYMENT: "EDIT_SALE_PAYMENT",
    DELETE_SALE_PAYMENT: "DELETE_SALE_PAYMENT",
};

export const quotationActionType = {
    FETCH_QUOTATIONS: "FETCH_QUOTATIONS",
    FETCH_QUOTATION: "FETCH_QUOTATION",
    ADD_QUOTATION: "ADD_QUOTATION",
    EDIT_QUOTATION: "EDIT_QUOTATION",
    DELETE_QUOTATION: "DELETE_QUOTATION",
    SEARCH_SALE_PRODUCTS: "SEARCH_SALE_PRODUCTS",
    PRODUCT_SALES_UNIT: "PRODUCT_SALES_UNIT",
    QUOTATION_DETAILS: "QUOTATION_DETAILS",
    QUOTATION_PDF: "QUOTATION_PDF",
    FILTER_STATUS_FILED: "FILTER_STATUS_FILED",
    FILTER_PAYMENT_STATUS_FILED: "FILTER_PAYMENT_STATUS_FILED",
    CREATE_SALE_PAYMENT: "CREATE_SALE_PAYMENT",
    FETCH_SALE_PAYMENT: "FETCH_SALE_PAYMENT",
    EDIT_SALE_PAYMENT: "EDIT_SALE_PAYMENT",
    DELETE_SALE_PAYMENT: "DELETE_SALE_PAYMENT",
};

export const adjustMentActionType = {
    FETCH_ADJUSTMENTS: "FETCH_ADJUSTMENTS",
    FETCH_ADJUSTMENT: "FETCH_ADJUSTMENT",
    ADD_ADJUSTMENTS: "ADD_ADJUSTMENTS",
    EDIT_ADJUSTMENTS: "EDIT_ADJUSTMENTS",
    DELETE_ADJUSTMENT: "DELETE_ADJUSTMENT",
    ADJUSTMENT_DETAILS: "ADJUSTMENT_DETAILS",
};

export const saleReturnActionType = {
    FETCH_SALES_RETURN: "FETCH_SALES_RETURN",
    FETCH_SALE_RETURN: "FETCH_SALE_RETURN",
    ADD_SALE_RETURN: "ADD_SALE_RETURN",
    EDIT_SALE_RETURN: "EDIT_SALE",
    DELETE_SALE_RETURN: "DELETE_SALE_RETURN",
    SEARCH_SALE_PRODUCTS: "SEARCH_SALE_PRODUCTS",
    PRODUCT_SALES_UNIT: "PRODUCT_SALES_UNIT",
    SALE_DETAILS: "SALE_DETAILS",
    FETCH_SALE_RETURN_DETAILS: "FETCH_SALE_RETURN_DETAILS",
};

export const recentSaleActionType = {
    RECENT_SALES: "RECENT_SALES",
};

export const stockReportActionType = {
    STOCK_REPORT: "STOCK_REPORT",
    STOCK_DETAILS_SALE_TAB: "STOCK_DETAILS_SALE_TAB",
    STOCK_DETAILS_SALE_RETURN_TAB: "STOCK_DETAILS_SALE_RETURN_TAB",
    STOCK_DETAILS_PURCHASE_TAB: "STOCK_DETAILS_PURCHASE_TAB",
    STOCK_DETAILS_PURCHASE_RETURN_TAB: "STOCK_DETAILS_PURCHASE_RETURN_TAB",
    STOCK_DETAILS_WAREHOUSE: "STOCK_DETAILS_WAREHOUSE",
};

export const supplierReportActionType = {
    FETCH_SUPPLIER_PURCHASE_REPORT: "FETCH_SUPPLIER_PURCHASE_REPORT",
    FETCH_SUPPLIER_PURCHASE_RETURN: "FETCH_SUPPLIER_PURCHASE_RETURN",
    FETCH_SUPPLIER_WIDGET_DATA: "FETCH_SUPPLIER_WIDGET_DATA",
};

export const customerReportActionType = {
    FETCH_CUSTOMER_WIDGET_DATA: "FETCH_CUSTOMER_WIDGET_DATA",
};

export const productQuantityReportActionType = {
    QUANTITY_REPORT: "QUANTITY_REPORT",
};

export const profitAndLossReportActionType = {
    FETCH_PROFIT_AND_LOSS: "FETCH_PROFIT_AND_LOSS",
};

export const topSellingActionType = {
    TOP_SELLING: "TOP_SELLING",
    TOP_SELLING_REPORT: "TOP_SELLING_REPORT",
};

export const topCustomersActionType = {
    TOP_CUSTOMERS: "TOP_CUSTOMERS",
    FETCH_STOCK_ALERT: "FETCH_STOCK_ALERT",
};

export const weekSalePurchasesActionType = {
    WEEK_SALE_PURCHASES: "WEEK_SALE_PURCHASES",
};

export const yearTopProductActionType = {
    YEAR_TOP_PRODUCT: "YEAR_TOP_PRODUCT",
};

export const Filters = {
    PAGE: 1,
    OBJ: {
        order_By: "",
        page: 1,
        pageSize: 10,
        direction: "asc",
        search: "",
        adminName: "admin",
        categoryId: "",
        created_at: "created_at",
        status: "",
        payment_status: "",
        payment_type: "",
        product_unit: "",
        base_unit: "",
    },
};

export const constants = {
    SET_TOTAL_RECORD: "SET_TOTAL_RECORD",
    UPDATE_TOTAL_RECORD_AFTER_DELETE: "UPDATE_TOTAL_RECORD_AFTER_DELETE",
    UPDATE_TOTAL_RECORD_AFTER_ADD: "UPDATE_TOTAL_RECORD_AFTER_ADD",
    IS_LOADING: "IS_LOADING",
    SET_LANGUAGE: "SET_LANGUAGE",
    DATE_ACTION: "DATE_ACTION",
    CALL_SALE_API: "CALL_SALE_API",
    CALL_IMPORT_PRODUCT_API: "CALL_IMPORT_PRODUCT_API",
    SET_PRODUCT_UNIT_ID: "SET_PRODUCT_UNIT_ID",
    SET_DATE_FORMAT: "SET_DATE_FORMAT",
    CALL_UPDATE_BRAND_API: "CALL_UPDATE_BRAND_API",
    SET_SAVING: "SET_SAVING",
    SET_DEFAULT_COUNTRY: "SET_DEFAULT_COUNTRY",
};

export const dateLabelSelector = {
    CLEAN: "clean",
    TODAY: "today",
    THIS_WEEK: "this_week",
    LAST_WEEK: "last_week",
    THIS_MONTH: "this_month",
    LAST_MONTH: "last_month",
    CUSTOM: "custom",
};

export const dateFormat = {
    DEFAULT_MOMENT: "YYYY-MM-DD hh:mm:ss",
    NATIVE: "YYYY-MM-DD",
    CHART_DATE: "YYYY/MM/DD",
    CHART_CUSTOM_DATE: "MMM_YYYY",
};

export const toastType = {
    ADD_TOAST: "ADD_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST",
    ERROR: "error",
};

export const Tokens = {
    ADMIN: "auth_token",
    USER: "user",
    FIRST_NAME: "first_name",
    LAST_NAME: "last_name",
    IMAGE: "image",
    REGISTER_USER: "register_user",
    GET_PERMISSIONS: "get_permissions",
    USER_IMAGE_URL: "user_image_url",
    UPDATED_EMAIL: "updated_email",
    UPDATED_FIRST_NAME: "updated_first_name",
    UPDATED_LAST_NAME: "updated_last_name",
    LANGUAGE: "language",
    UPDATED_LANGUAGE: "updated_language",
};

export const errorMessage = {
    TOKEN_NOT_PROVIDED: "Token not provided",
    TOKEN_EXPIRED: "Token has expired",
    TOKEN_INVALID:
        "Could not decode token: Error while decoding to JSON: Syntax error",
    TOKEN_INVALID_SIGNATURE: "Token Signature could not be verified.",
};

export const Permissions = {
    MANAGE_DASHBOARD: "manage_dashboard",
    MANAGE_ROLES: "manage_roles",
    MANAGE_BRANDS: "manage_brands",
    CREATE_BRAND: "create_brand",
    EDIT_BRAND: "edit_brand",
    DELETE_BRAND: "delete_brand",
    MANAGE_CURRENCY: "manage_currency",
    CREATE_CURRENCY: "create_currency",
    EDIT_CURRENCY: "edit_currency",
    DELETE_CURRENCY: "delete_currency",
    MANAGE_WAREHOUSES: "manage_warehouses",
    MANAGE_UNITS: "manage_units",
    CREATE_UNIT: "create_unit",
    EDIT_UNIT: "edit_unit",
    DELETE_UNIT: "delete_unit",
    MANAGE_PRODUCT_CATEGORIES: "manage_product_categories",
    CREATE_PRODUCT_CATEGORY: "create_product_category",
    EDIT_PRODUCT_CATEGORY: "edit_product_category",
    DELETE_PRODUCT_CATEGORY: "delete_product_category",
    MANAGE_VARIATIONS: "manage_variations",
    MANAGE_PRODUCTS: "manage_products",
    CREATE_PRODUCT: "create_product",
    EDIT_PRODUCT: "edit_product",
    DELETE_PRODUCT: "delete_product",
    MANAGE_SUPPLIERS: "manage_suppliers",
    MANAGE_CUSTOMERS: "manage_customers",
    CREATE_CUSTOMER: "create_customer",
    EDIT_CUSTOMER: "edit_customer",
    DELETE_CUSTOMER: "delete_customer",
    MANAGE_USER: "manage_users",
    MANAGE_EXPENSES_CATEGORIES: "manage_expense_categories",
    MANAGE_EXPENSES: "manage_expenses",
    MANAGE_SETTING: "manage_setting",
    MANAGE_PURCHASE: "manage_purchase",
    MANAGE_PURCHASE_RETURN: "manage_purchase_return",
    MANAGE_POS_SCREEN: "manage_pos_screen",
    MANAGE_SALE: "manage_sale",
    MANAGE_SALE_RETURN: "manage_sale_return",
    MANAGE_REPORT: "manage_report",
    MANAGE_PRINT_BARCODE: "manage_print_barcode",
    MANAGE_ADJUSTMENTS: "manage_adjustments",
    MANAGE_TRANSFERS: "manage_transfers",
    MANAGE_REPORTS: "manage_reports",
    MANAGE_EMAIL_TEMPLATES: "manage_email_templates",
    MANAGE_QUOTATION: "manage_quotations",
    MANAGE_SMS_API: "manage_sms_apis",
    MANAGE_SMS_TEMPLATES: "manage_sms_templates",
    MANAGE_LANGUAGES: "manage_language",
    EDIT_LANGUAGE: "edit_language",
    DELETE_LANGUAGE: "delete_language",
    MANAGE_DISTRIBUTORS:'manage_distributors',
    CREATE_DISTRIBUTOR:'create_distributor',
    EDIT_DISTRIBUTOR:"edit_ditributor",
    DELETE_DISTRIBUTOR:"delete_distributor",
    MANAGE_CASH:"manage_cash",
    ASIGN_CASH:"asign_cash",
    MANAGE_CHANNEL:"manage_channel",
    CREATE_CHANNEL:"create_channel",
    EDIT_CHANNEL:"edit_channel",
    DELETE_CHANNEL:"delete_channel",
    MANAGE_LOCATION :'manage_location',
    MANAGE_REGION:"manage_region",
    CREATE_REGION:"create_region",
    EDIT_REGION:"edit_region",
    DELETE_REGION:"delete_region",
    MANAGE_AREA:"manage_area",
    CREATE_AREA:"create_area",
    EDIT_AREA:"edit_area",
    DELETE_AREA:"delete_area",
    MANAGE_MILEAGE :"manage_mileage",
    MANAGE_COUPON:"manage_coupon",
    CREATE_COUPON:"create_coupon",
    EDIT_COUPON:"edit_coupon",
    DELETE_COUPON:"delete_coupon",
    MANAGE_SURVEY:"manage_survey",
    MANAGE_QUESTION:"manage_question",
    CREATE_QUESTION:"create_question",
    EDIT_QUESTION:"edit_question",
    DELETE_QUESTION:"delete_question",
    MANAGE_CHECKIN:"manage_checkin",
    MANAGE_CHECKOUT:"manage_checkout",
    MANAGE_CREDIT_COLLECTION:"manage_credit_collection",
    MANAGE_GIFTS:"manage_gifts",
    CREATE_GIFT:"create_gift",
    EDIT_GIFT:"edit_gift",
    DELETE_GIFT:"delete_gift",
    MANAGE_GIFT_HISTORY:"manage_gift_history",
    MANAGE_INVENTORY:"manage_inventory",
    MANAGE_ASSIGNED_CUSTOMER:"manage_assigned_customer",
    ASSIGN_CUSTOMER:"assign_customers",
    ASSIGN_PRODUCT:"assign_products",
    MANAGE_STOCKIN_PRODUCT:"manage_stockin_product",
    STOCKOUT_PRODUCT:"stockout_product",
    MANAGE_STOCKOUT_PRODUCT:"manage_stockout_product",
    STOCKIN_GIFT:"stockin_gift",
    MANAGE_STOCKIN_GIFT:"manage_stockin_gift",
    MANAGE_SALESMAN:"manage_salesman",
    CREATE_SALESMAN:"create_salesman",
    EDIT_SALESMAN:"edit_salesman",
    DELETE_SALESMAN:"delete_salesman",
    MANAGE_SUPERVISOR:"manage_supervisor",
    CREATE_SUPERVISOR:"create_supervisor",
    EDIT_SUPERVISOR:"edit_supervisor",
    DELETE_SUPERVISOR:"delete_supervisor",
    CREATE_WAREHOUSE:"create_warehouse",
    EDIT_WAREHOUSE:"edit_warehouse",
    DELETE_WAREHOUSE:"delete_warehouse",
    CREATE_ROLE:"create_role",
    EDIT_ROLE:"edit_role",
    DELETE_ROLE:"delete_role",
    CREATE_ROLE:"create_role",
    EDIT_ROLE:"edit_role",
    DELETE_ROLE:"delete_role",
    MANAGE_LANGUAGE_CONTENT:"manage_language_content",
    CREATE_LANGUAGE_CONTENT:"create_language_content",
    EDIT_LANGUAGE_CONTENT:"edit_language_content",
    DELETE_LANGUAGE_CONTENT:"delete_language_content",
    MANAGE_COUNTRY:"manage_country",
    CREATE_COUNTRY:"create_country",
    EDIT_COUNTRY:"edit_country",
    DELETE_COUNTRY:"delete_country",
    MANAGE_GIFT_INVENTORY:"manage_inventory_gift",
    UPDATE_GIFT_INVENTORY:"update_inventory_gift"

};

//POS Screen Constants
export const productActionType = {
    FETCH_PRODUCTS: "FETCH_PRODUCTS",
    FETCH_PRODUCT: "FETCH_PRODUCT",
    ADD_PRODUCT: "ADD_PRODUCT",
    EDIT_PRODUCT: "EDIT_PRODUCT",
    DELETE_PRODUCT: "DELETE_PRODUCT",
    FETCH_BRAND_CLICKABLE: "FETCH_BRAND_CLICKABLE",
    FETCH_ALL_PRODUCTS: "FETCH_ALL_PRODUCTS",
    FETCH_PRODUCTS_BY_WAREHOUSE: "FETCH_PRODUCTS_BY_WAREHOUSE",
    REMOVE_ALL_PRODUCTS: "REMOVE_ALL_PRODUCTS",
    ADD_IMPORT_PRODUCT: "ADD_IMPORT_PRODUCT",
    FETCH_ALL_MAIN_PRODUCTS: "FETCH_ALL_MAIN_PRODUCTS",
    FETCH_MAIN_PRODUCT: "FETCH_MAIN_PRODUCT",
    ADD_MAIN_PRODUCT: "ADD_MAIN_PRODUCT",
    EDIT_MAIN_PRODUCT: "EDIT_MAIN_PRODUCT",
    DELETE_MAIN_PRODUCT: "DELETE_MAIN_PRODUCT",
};

export const posProductActionType = {
    FETCH_PRODUCT: "FETCH_PRODUCT",
    POS_ALL_PRODUCT: "POS_ALL_PRODUCT",
    POS_ALL_PRODUCTS: "POS_ALL_PRODUCTS",
    POS_SEARCH_NAME_PRODUCT: "POS_SEARCH_NAME_PRODUCT",
    POS_SEARCH_CODE_PRODUCT: "POS_SEARCH_CODE_PRODUCT",
    FETCH_TODAY_SALE_OVERALL_REPORT: "FETCH_TODAY_SALE_OVERALL_REPORT",
};

export const posRegisterDetailsAction = {
    GET_REGISTER_DETAILS: "GET_REGISTER_DETAILS",
};

export const posRegisterReportDetailsAction = {
    GET_REGISTER_REPORT_DETAILS: "GET_REGISTER_REPORT_DETAILS",
};

export const posCashPaymentActionType = {
    POS_CASH_PAYMENT: "POS_CASH_PAYMENT",
};

export const settingsKey = {
    LANGUAGE: "language",
    DEFAULT_LOCALE: "en",
    LOCALE_ARABIC: "ar",
    LOCALE_PERSIAN: "pe",
    LOCAL_GERMAN: "gr",
};

export const languageOptions = [
    {
        id: "ar",
        name: "settings.select.language.arabic.label",
        display_name: "Arabic",
    },
    {
        id: "cn",
        name: "settings.select.language.chinese.label",
        display_name: "Chinese",
    },
    {
        id: "en",
        name: "settings.select.language.english.label",
        display_name: "English",
    },
    {
        id: "fr",
        name: "settings.select.language.french.label",
        display_name: "French",
    },
    {
        id: "gr",
        name: "settings.select.language.german.label",
        display_name: "German",
    },
    {
        id: "it",
        name: "settings.select.language.italian.label",
        display_name: "Italian",
    },
    {
        id: "pe",
        name: "settings.select.language.persian.label",
        display_name: "Persian",
    },
    {
        id: "po",
        name: "settings.select.language.portuguese.label",
        display_name: "Portuguese",
    },
    {
        id: "ru",
        name: "settings.select.language.russian.label",
        display_name: "Russian",
    },
    {
        id: "sp",
        name: "settings.select.language.spanish.label",
        display_name: "Spanish",
    },
    {
        id: "tr",
        name: "settings.select.language.turkish.label",
        display_name: "Turkish",
    },
];

export const baseUnitOptions = [
    { id: 0, name: "unit.filter.all.label" },
    { id: 1, name: "unit.filter.piece.label" },
    { id: 2, name: "unit.filter.meter.label" },
    { id: 3, name: "unit.filter.kilogram.label" },
];

export const statusOptions = [
    { id: 0, name: "unit.filter.all.label" },
    { id: 1, name: "status.filter.received.label" },
    { id: 2, name: "status.filter.pending.label" },
    { id: 3, name: "status.filter.ordered.label" },
];

export const saleStatusOptions = [
    { id: 1, name: "status.filter.complated.label" },
    { id: 2, name: "status.filter.pending.label" },
    { id: 3, name: "status.filter.ordered.label" },
];

export const purchaseStatusOptions = [
    { id: 1, name: "status.filter.received.label" },
    { id: 2, name: "status.filter.pending.label" },
    { id: 3, name: "status.filter.ordered.label" },
];

export const salePaymentStatusOptions = [
    { id: 1, name: "payment-status.filter.paid.label" },
    { id: 2, name: "payment-status.filter.unpaid.label" },
];

export const paymentStatusOptions = [
    { id: 0, name: "unit.filter.all.label" },
    { id: 1, name: "payment-status.filter.paid.label" },
    { id: 2, name: "payment-status.filter.unpaid.label" },
    { id: 3, name: "payment-status.filter.partial.label" },
];

export const unitOptions = [
    { id: 1, name: "unit.filter.piece.label" },
    { id: 2, name: "unit.filter.meter.label" },
    { id: 3, name: "unit.filter.kilogram.label" },
];

export const paymentMethodOptions = [
    { id: 1, name: "payment-type.filter.cash.label" },
    { id: 2, name: "payment-type.filter.cheque.label" },
    { id: 3, name: "payment-type.filter.bank-transfer.label" },
    { id: 4, name: "payment-type.filter.other.label" },
    { id: 5, name: "Credit Limit" },
];

export const paymentTypeOptions = [
    { id: 0, name: "unit.filter.all.label" },
    { id: 1, name: "payment-type.filter.cash.label" },
    { id: 2, name: "payment-type.filter.cheque.label" },
    // { id: 3, name: "payment-type.filter.bank-transfer.label" },
    { id: 5, name: "Credit Limit" },
];


export const mileageTypeOptions= [
    { id: 0, name: "Start" },
    { id: 1, name: "End" },
];

export const taxMethodOptions = [
    { id: 1, name: "tax-type.filter.exclusive.label" },
    { id: 2, name: "tax-type.filter.inclusive.label" },
];

export const productTypesOptions = [
    { id: 1, name: "products.type.single-type.label" },
    { id: 2, name: "variation.title" },
];

export const discountMethodOptions = [
    { id: 1, name: "discount-type.filter.percentage.label" },
    { id: 2, name: "discount-type.filter.fixed.label" },
];

export const discountType = {
    PERCENTAGE: 1,
    FIXED: 2,
}

export const quotationStatusOptions = [
    { id: 1, name: "status.filter.sent.label" },
    { id: 2, name: "status.filter.pending.label" },
];

export const transferStatusOptions = [
    { id: 0, name: "unit.filter.all.label" },
    { id: 1, name: "status.filter.complated.label" },
    { id: 2, name: "status.filter.sent.label" },
    { id: 3, name: "status.filter.pending.label" },
];

export const transferCreatStatusOptions = [
    { id: 1, name: "status.filter.complated.label" },
    { id: 2, name: "status.filter.sent.label" },
    { id: 3, name: "status.filter.pending.label" },
];

export const smsStatusOptions = [
    { id: 1, name: "active.status.lable" },
    { id: 2, name: "in-active.status.lable" },
];

export const saleReturnStatusOptions = [
    { id: 1, name: "status.filter.received.label" },
    { id: 2, name: "status.filter.pending.label" },
];

export const languageFileOptions = [
    { id: 1, name: "language.json" },
    { id: 2, name: "messages.php" },
    { id: 3, name: "Error Messages" },
    { id: 4, name: "Success Messages" },
    { id: 5, name: "Pdf Messages" },
];
