import React from "react";
import { Permissions } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPieChart,
    faUser,
    faTruck,
    faUserGroup,
    faHome,
    faBoxes,
    faPrint,
    faBookmark,
    faBoxOpen,
    faMoneyCheckDollar,
    faMoneyBills,
    faQuoteRight,
    faDollarSign,
    faReceipt,
    faArrowRight,
    faArrowLeft,
    faEnvelope,
    faCartShopping,
    faChartColumn,
    faGear,
    faMapLocation,
    faBasketShopping,
    faSms,
    faCube,
    faFile,
    faBox,
    faRulerHorizontal,
    faLanguage,
    faShieldHalved,
    faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { getFormattedMessage } from "../shared/sharedMethod";

export default [
    {
        title: "dashboard.title",
        name: "dashboard",
        fontIcon: <FontAwesomeIcon icon={faPieChart} />,
        to: "/app/dashboard",
        class: "d-flex",
        permission: Permissions.MANAGE_DASHBOARD,
        items: [
            {
                title: getFormattedMessage("dashboard.title"),
                to: "/app/dashboard",
            },
        ],
    },
    {
        title: "allusers.title",
        name: "All Users",
        fontIcon: <FontAwesomeIcon icon={faUser} />,
        to: "/app/suppliers",
        class: "d-flex",
        is_submenu: "true",
        subPath: {
            customerSubPath: "/app/customers",
            userSubPath: "/app/users",
            suppliareSubPath: "/app/suppliers",
        },
        permission:
            Permissions.MANAGE_CUSTOMERS ||
            Permissions.MANAGE_USER || Permissions.MANAGE_SALESMAN ||  Permissions.MANAGE_WAREHOUSES || Permissions.MANAGE_DISTRIBUTORS || Permissions.MANAGE_SUPERVISOR,
        subMenu: [
            {
                title: "alldistributor.title",
                name: "All distributors",
                fontIcon: <FontAwesomeIcon icon={faUser} />,
                to: "/app/distributor",
                class: "d-flex",
                permission: Permissions.MANAGE_DISTRIBUTORS,
            },
            {
                title: "allwarehouse.title",
                name: "All warehouses",
                fontIcon: <FontAwesomeIcon icon={faHome} />,
                to: "/app/warehouse",
                class: "d-flex",
                permission: Permissions.MANAGE_WAREHOUSES,
                items: [
                    {
                        title: getFormattedMessage("warehouse.title"),
                        to: "/app/warehouse",
                    },
                ],
            },
            {
                title: "allsupervisor.title",
                name: "All Supervisor",
                fontIcon: <FontAwesomeIcon icon={faHome} />,
                to: "/app/supervisor",
                class: "d-flex",
                permission: Permissions.MANAGE_SUPERVISOR,
                items: [
                    {
                        title: getFormattedMessage("superviser.title"),
                        to: "/app/supervisor",
                    },
                ],
            },
            {
                title: "allsalesman.title",
                name: "All Salesman",
                fontIcon: <FontAwesomeIcon icon={faHome} />,
                to: "/app/salesman",
                class: "d-flex",
                permission: Permissions.MANAGE_SALESMAN,
                items: [
                    {
                        title: getFormattedMessage("salesman.title"),
                        to: "/app/salesman",
                    },
                ],
            },
            {
                title: "alloutlets.title",
                name: "All Outlets",
                fontIcon: <FontAwesomeIcon icon={faUserGroup} />,
                to: "/app/customers",
                class: "d-flex",
                permission: Permissions.MANAGE_CUSTOMERS,
            },
            {
                title: "Chanels",
                name: "chanels",
                fontIcon: <FontAwesomeIcon icon={faTruck} />,
                to: "/app/chanels",
                class: "d-flex",
                permission: Permissions.MANAGE_CHANNEL,
            },
            // {
            //     title: "users.title",
            //     name: "users",
            //     fontIcon: <FontAwesomeIcon icon={faUser} />,
            //     to: "/app/users",
            //     class: "d-flex",
            //     permission: Permissions.MANAGE_USER,
            // },

        ],
    },
    {
        title: "products.title",
        name: "products",
        fontIcon: <FontAwesomeIcon icon={faBoxes} />,
        to: "/app/products",
        class: "d-flex",
        is_submenu: "true",
        permission: Permissions.MANAGE_PRODUCTS,
        subPath: {
            productsSubPath: "/app/products",
            categoriesSubPath: "/app/product-categories",
            variationsSubPath: "/app/variations",
            brandsSubPath: "/app/brands",
            unitsSubPath: "/app/units",
            baseUnitsSubPath: "/app/base-units",
            barcodeSubPath: "/app/print/barcode",
        },
        subMenu: [
            {
                title: "Products List",
                to: "/app/products",
                name: "products",
                class: "d-flex",
                fontIcon: <FontAwesomeIcon icon={faBoxes} />,
                permission: Permissions.MANAGE_PRODUCTS,
            },
            {
                title: "product.categories.title",
                name: "product categories",
                fontIcon: <FontAwesomeIcon icon={faBoxOpen} />,
                to: "/app/product-categories",
                class: "d-flex",
                permission: Permissions.MANAGE_PRODUCT_CATEGORIES,
            },
            // {
            //     title: "variations.title",
            //     name: "variations",
            //     fontIcon: <FontAwesomeIcon icon={faLayerGroup} />,
            //     to: "/app/variations",
            //     class: "d-flex",
            //     permission: Permissions.MANAGE_VARIATIONS,
            // },

            {
                title: "brands.title",
                name: "brands",
                fontIcon: <FontAwesomeIcon icon={faBookmark} />,
                to: "/app/brands",
                path: "/app/create-brand",
                class: "d-flex",
                permission: Permissions.MANAGE_BRANDS,
            },
            // {
            //     title: "units.title",
            //     name: "units",
            //     fontIcon: <FontAwesomeIcon icon={faQuoteRight} />,
            //     to: "/app/units",
            //     class: "d-flex",
            //     permission: Permissions.MANAGE_UNITS,
            // },
            {
                title: "base-units.title",
                name: "base units",
                fontIcon: <FontAwesomeIcon icon={faRulerHorizontal} />,
                to: "/app/base-units",
                class: "d-flex",
                permission: Permissions.MANAGE_UNITS,
            },

            {
                title: "Product Inventory",
                name: "Product Inventory",
                fontIcon: <FontAwesomeIcon icon={faArrowLeft} />,
                to: "/app/inventory",
                class: "d-flex",
                permission: Permissions.MANAGE_INVENTORY,
            },
            // {
            //     title: "print.barcode.title",
            //     name: "print barcode",
            //     fontIcon: <FontAwesomeIcon icon={faPrint} />,
            //     to: "/app/print/barcode",
            //     class: "d-flex",
            //     permission: Permissions.MANAGE_PRODUCTS,
            // },
        ],
    },
    {
        title: "Gifts",
        name: "Gifts",
        fontIcon: <FontAwesomeIcon icon={faReceipt} />,
        to: "/app/gift",
        class: "d-flex",
        is_submenu: "true",
        permission: Permissions.MANAGE_GIFTS ||Permissions.MANAGE_GIFT_HISTORY,
        subPath: {
            purchaseReturnSubPath: "/app/gifts",
            purchasesSubPath: "/app/gift-history",
        },
        subMenu: [
            {
                title: "gifts.title",
                name: "Gift List",
                fontIcon: <FontAwesomeIcon icon={faArrowLeft} />,
                to: "/app/gifts",
                class: "d-flex",
                permission: Permissions.MANAGE_GIFTS,
            },
            {
                title: "gifts.submitiion.title",
                name: "Gifts Submitted History",
                fontIcon: <FontAwesomeIcon icon={faReceipt} />,
                to: "/app/gift-history",
                class: "d-flex",
                permission: Permissions.MANAGE_GIFT_HISTORY,
            },
            {
                title: "Gift Inventory",
                name: "Gift Inventory",
                fontIcon: <FontAwesomeIcon icon={faBox} />,
                to: "/app/gift-inventory",
                class: "d-flex",
                permission: Permissions.MANAGE_GIFT_INVENTORY,
            },
        ],
    },
    {
        title: "Pos",
        name: "pos",
        fontIcon: <FontAwesomeIcon icon={faBoxes} />,
        class: "d-flex",
        is_submenu: "true",
        permission:Permissions.MANAGE_ASSIGNED_CUSTOMER || Permissions.MANAGE_STOCKIN_PRODUCT || Permissions.MANAGE_STOCKOUT_PRODUCT || Permissions.MANAGE_STOCKIN_GIFT,
        subPath: {
            assignCustomerSubPath: "/app/assign-customer",
            assignCustomerListSubPath: "/app/assign-customer-list",
            loadStockSubPath: "/app/load",
        },
        subMenu: [
            {
                title: "Assigned Customer",
                to: "/app/assign-customer-list",
                name: "Assingned Customer",
                class: "d-flex",
                fontIcon: <FontAwesomeIcon icon={faUserGroup} />,
                permission:Permissions.MANAGE_ASSIGNED_CUSTOMER,
                items: [
                    {
                        title:"Assign Customer List",
                        to: "/app/assign-customer-list",
                    },
                ],
            },

            // {
            //     title: "load stock",
            //     name: "Load Stock",
            //     fontIcon: <FontAwesomeIcon icon={faBox} />,
            //     to: "/app/load",
            //     class: "d-flex",
            //     permission:Permissions.MANAGE_DASHBOARD,
            //     items: [
            //         {
            //             title:"loadstock",
            //             to: "/app/load",
            //         },
            //     ],
            // },

            {
                title: "Load Product",
                name: "Load Product",
                fontIcon: <FontAwesomeIcon icon={faBox} />,
                to: "/app/assign-product-list",
                class: "d-flex",
                permission:Permissions.MANAGE_STOCKIN_PRODUCT,
                items: [
                    {
                        title:"Load Product",
                        to: "/app/assign-product-list",
                    },
                ],
            },
            {
                title: "StockOut Product",
                name: "Unload Product",
                fontIcon: <FontAwesomeIcon icon={faBox} />,
                to: "/app/stockout-product-list",
                class: "d-flex",
                permission:Permissions.MANAGE_STOCKOUT_PRODUCT,
                items: [
                    {
                        title:"Unload Product",
                        to: "/app/stockout-product-list",
                    },
                ],
            },
            {
                title: "Load Gift",
                name: "Load Gift",
                fontIcon: <FontAwesomeIcon icon={faBox} />,
                to: "/app/assigned-gift-list",
                class: "d-flex",
                permission:Permissions.MANAGE_STOCKIN_GIFT,
                items: [
                    {
                        title:"Assigned Gift List",
                        to: "/app/assigned-gift-list",
                    },
                ],
            },
        ]
    },

    {
        title: "Sales & Returns",
        name: "sales",
        fontIcon: <FontAwesomeIcon icon={faCartShopping} />,
        to: "/app/sales",
        class: "d-flex",
        is_submenu: "true",
        permission: Permissions.MANAGE_SALE,
        subPath: {
            salesSubPath: "/app/sales",
            salesReturnSubPath: "/app/sale-return",
        },
        subMenu: [
            {
                title: "sales.title",
                name: "sales",
                fontIcon: <FontAwesomeIcon icon={faCartShopping} />,
                to: "/app/sales",
                class: "d-flex",
                permission: Permissions.MANAGE_SALE,
            },
            {
                title: "sales-return.title",
                name: "sales return",
                fontIcon: <FontAwesomeIcon icon={faArrowRight} />,
                to: "/app/sale-return",
                class: "d-flex",
                permission: Permissions.MANAGE_SALE_RETURN,
            },
        ],
    },

    // {
    //     title: "inventory",
    //     name: "Inventory",
    //     fontIcon: <FontAwesomeIcon icon={faBox} />,
    //     to: "/app/inventory",
    //     class: "d-flex",
    //     permission:Permissions.MANAGE_INVENTORY,
    //     subPath: {
    //         purchaseReturnSubPath: "/app/inventory",
    //         // purchasesSubPath: "/app/gift-history",
    //     },
    //     subMenu: [
    //         {
    //             title: "Product Inventory",
    //             name: "Product Inventory",
    //             fontIcon: <FontAwesomeIcon icon={faArrowLeft} />,
    //             to: "/app/inventory",
    //             class: "d-flex",
    //             permission: Permissions.MANAGE_INVENTORY,
    //         },
    //         {
    //             title: "Gift Inventory",
    //             name: "Gift Inventory",
    //             fontIcon: <FontAwesomeIcon icon={faBox} />,
    //             to: "/app/gift-inventory",
    //             class: "d-flex",
    //             permission: Permissions.MANAGE_INVENTORY,
    //         },
    //     ],
    // },
    // {
    //     title: "adjustments.title",
    //     name: "adjustments",
    //     fontIcon: <FontAwesomeIcon icon={faMapLocation} />,
    //     to: "/app/adjustments",
    //     class: "d-flex",
    //     permission: Permissions.MANAGE_ADJUSTMENTS,
    //     items: [
    //         {
    //             title: getFormattedMessage("adjustments.title"),
    //             to: "/app/adjustments",
    //         },
    //     ],
    // },
    // {
    //     title: "quotations.title",
    //     name: "quotations.title",
    //     fontIcon: <FontAwesomeIcon icon={faBasketShopping} />,
    //     to: "/app/quotations",
    //     class: "d-flex",
    //     permission: Permissions.MANAGE_QUOTATION,
    //     items: [
    //         {
    //             title: getFormattedMessage("quotations.title"),
    //             to: "/app/quotations",
    //         },
    //     ],
    // },
    // {
    //     title: "purchases.title",
    //     name: "purchases",
    //     fontIcon: <FontAwesomeIcon icon={faReceipt} />,
    //     to: "/app/purchases",
    //     class: "d-flex",
    //     is_submenu: "true",
    //     permission: Permissions.MANAGE_PURCHASE,
    //     subPath: {
    //         purchasesSubPath: "/app/purchases",
    //         purchaseReturnSubPath: "/app/purchase-return",
    //     },
    //     subMenu: [
    //         {
    //             title: "purchases.title",
    //             name: "purchases",
    //             fontIcon: <FontAwesomeIcon icon={faReceipt} />,
    //             to: "/app/purchases",
    //             class: "d-flex",
    //             permission: Permissions.MANAGE_PURCHASE,
    //         },
    //         {
    //             title: "purchases.return.title",
    //             name: "purchases return",
    //             fontIcon: <FontAwesomeIcon icon={faArrowLeft} />,
    //             to: "/app/purchase-return",
    //             class: "d-flex",
    //             permission: Permissions.MANAGE_PURCHASE_RETURN,
    //         },
    //     ],
    // },

    {
        title: "cash.title",
        name: "Cash",
        fontIcon: <FontAwesomeIcon icon={faReceipt} />,
        to: "/app/gift",
        class: "d-flex",
        is_submenu: "true",
        permission: Permissions.MANAGE_CASH,
        subPath: {
            purchaseReturnSubPath: "/app/all-cash-list",
            // purchasesSubPath: "/app/gift-history",
        },
        subMenu: [
            {
                title: "cash.all.title",
                name: "Cash List",
                fontIcon: <FontAwesomeIcon icon={faArrowLeft} />,
                to: "/app/all-cash-list",
                class: "d-flex",
                permission: Permissions.MANAGE_CASH,
            },
            // {
            //     title: "gifts.submitiion.title",
            //     name: "Gifts Submitted History",
            //     fontIcon: <FontAwesomeIcon icon={faReceipt} />,
            //     to: "/app/gift-history",
            //     class: "d-flex",
            //     permission: Permissions.MANAGE_PURCHASE,
            // },
        ],
    },
    {
        title: "mileage.record.title",
        name: "Mileage Record",
        fontIcon: <FontAwesomeIcon icon={faReceipt} />,
        to: "/app/gift",
        class: "d-flex",
        is_submenu: "true",
        permission: Permissions.MANAGE_MILEAGE,
        subPath: {
            purchaseReturnSubPath: "/app/mileage-records",
            // purchasesSubPath: "/app/gift-history",
        },
        subMenu: [
            {
                title: "mileage.record.history.title",
                name: "Mileage history",
                fontIcon: <FontAwesomeIcon icon={faArrowLeft} />,
                to: "/app/mileage-records",
                class: "d-flex",
                permission: Permissions.MANAGE_MILEAGE,
            },
            // {
            //     title: "gifts.submitiion.title",
            //     name: "Gifts Submitted History",
            //     fontIcon: <FontAwesomeIcon icon={faReceipt} />,
            //     to: "/app/gift-history",
            //     class: "d-flex",
            //     permission: Permissions.MANAGE_PURCHASE,
            // },
        ],
    },

    // {
    //     title: "transfers.title",
    //     name: "transfers",
    //     fontIcon: <FontAwesomeIcon icon={faMapLocation} />,
    //     to: "/app/transfers",
    //     class: "d-flex",
    //     permission: Permissions.MANAGE_TRANSFERS,
    //     items: [
    //         {
    //             title: getFormattedMessage("transfers.title"),
    //             to: "/app/transfers",
    //         },
    //     ],
    // },
    // {
    //     title: "expenses.title",
    //     name: "expenses",
    //     fontIcon: <FontAwesomeIcon icon={faMoneyBills} />,
    //     to: "/app/expenses",
    //     class: "d-flex",
    //     is_submenu: "true",
    //     permission: Permissions.MANAGE_EXPENSES,
    //     subPath: {
    //         expensesSubPath: "/app/expenses",
    //         expenseCategoriesSubPath: "/app/expense-categories",
    //     },
    //     subMenu: [
    //         {
    //             title: "expenses.title",
    //             name: "expenses",
    //             fontIcon: <FontAwesomeIcon icon={faMoneyBills} />,
    //             to: "/app/expenses",
    //             class: "d-flex",
    //             permission: Permissions.MANAGE_EXPENSES,
    //         },
    //         {
    //             title: "expense.categories.title",
    //             name: "expense categories",
    //             fontIcon: <FontAwesomeIcon icon={faMoneyCheckDollar} />,
    //             class: "d-flex",
    //             permission: Permissions.MANAGE_EXPENSES_CATEGORIES,
    //             to: "/app/expense-categories",
    //         },
    //     ],
    // },


    {
        title: "location.title",
        name: "Location",
        fontIcon: <FontAwesomeIcon icon={faMapLocation} />,
        to: "/app/suppliers",
        class: "d-flex",
        is_submenu: "true",
        subPath: {
            customerSubPath: "/app/region"
        },
        permission:
            Permissions.MANAGE_LOCATION || Permissions.MANAGE_COUNTRY || Permissions.MANAGE_REGION || Permissions.MANAGE_AREA,
        subMenu: [
            {
                title: "country",
                name: "Country",
                fontIcon: <FontAwesomeIcon icon={faMapLocation} />,
                to: "/app/country",
                class: "d-flex",
                permission: Permissions.MANAGE_COUNTRY,
            },
            {
                title: "region.title",
                name: "Region",
                fontIcon: <FontAwesomeIcon icon={faMapLocation} />,
                to: "/app/region",
                class: "d-flex",
                permission: Permissions.MANAGE_REGION,
            },
            {
                title: "area.title",
                name: "Area",
                fontIcon: <FontAwesomeIcon icon={faMapLocation} />,
                to: "/app/area",
                class: "d-flex",
                permission: Permissions.MANAGE_AREA,
            },



        ],
    },
    // {
    //     title: "warehouse.title",
    //     name: "warehouse",
    //     fontIcon: <FontAwesomeIcon icon={faHome} />,
    //     to: "/app/warehouse",
    //     class: "d-flex",
    //     permission: Permissions.MANAGE_WAREHOUSES,
    //     items: [
    //         {
    //             title: getFormattedMessage("warehouse.title"),
    //             to: "/app/warehouse",
    //         },
    //     ],
    // },

    // {
    //     title: "template.title",
    //     name: "template",
    //     fontIcon: <FontAwesomeIcon icon={faFile} />,
    //     to: "/app/email-templates",
    //     class: "d-flex",
    //     is_submenu: "true",
    //     permission: Permissions.MANAGE_EMAIL_TEMPLATES,
    //     subPath: {
    //         emailTemplateSubPath: "/app/email-templates",
    //         smsTemplateSubPath: "/app/sms-templates",
    //         smsApiSubPath: "/app/sms-api",
    //     },
    //     subMenu: [
    //         {
    //             title: "email-template.title",
    //             name: "email-templates",
    //             fontIcon: <FontAwesomeIcon icon={faEnvelope} />,
    //             to: "/app/email-templates",
    //             class: "d-flex",
    //             permission: Permissions.MANAGE_EMAIL_TEMPLATES,
    //         },
    //         {
    //             title: "sms-template.title",
    //             name: "sms-templates",
    //             fontIcon: <FontAwesomeIcon icon={faSms} />,
    //             to: "/app/sms-templates",
    //             class: "d-flex",
    //             permission: Permissions.MANAGE_SMS_TEMPLATES,
    //         },
    //         {
    //             title: "sms-api.title",
    //             name: "sms-api",
    //             fontIcon: <FontAwesomeIcon icon={faCube} />,
    //             to: "/app/sms-api",
    //             class: "d-flex",
    //             permission: Permissions.MANAGE_SMS_API,
    //         },
    //     ],
    // },
    {
        to: "/app/pos",
        class: "d-none",
        name: "pos",
        title: "header.pos.title",
        permission: Permissions.MANAGE_POS_SCREEN,
    },
    {
        title: "coupons",
        name: "Coupons",
        fontIcon: <FontAwesomeIcon icon={faBox} />,
        to: "/app/coupons",
        class: "d-flex",
        permission:Permissions.MANAGE_COUPON,
        items: [
            {
                title:"coupons",
                to: "/app/coupons",
            },
        ],
    },
    {
        title: "checkin.checkout.title",
        name: "CheckIn & Checkout",
        fontIcon: <FontAwesomeIcon icon={faReceipt} />,
        to: "/app/checkin",
        class: "d-flex",
        is_submenu: "true",
        permission: Permissions.MANAGE_CHECKIN,
        subPath: {
            // purchaseReturnSubPath: "/app/checkin",
            // purchasesSubPath: "/app/gift-history",
        },
        subMenu: [
            {
                title: "CheckIn History",
                name: "CheckIn History",
                fontIcon: <FontAwesomeIcon icon={faArrowLeft} />,
                to: "/app/checkin",
                class: "d-flex",
                permission: Permissions.MANAGE_CHECKIN,
            },
            {
                title: "CheckOut History",
                name: "CheckOut History",
                fontIcon: <FontAwesomeIcon icon={faReceipt} />,
                to: "/app/checkout",
                class: "d-flex",
                permission: Permissions.MANAGE_CHECKOUT,
            },
        ],
    },
    {
        title: "credit.collection",
        name: "Collection",
        fontIcon: <FontAwesomeIcon icon={faBox} />,
        to: "/app/collections",
        class: "d-flex",
        permission:Permissions.MANAGE_CREDIT_COLLECTION,
        items: [
            {
                title:"collection",
                to: "/app/collections",
            },
        ],
    },

    {
        title: "survey.title",
        name: "Survey",
        fontIcon: <FontAwesomeIcon icon={faReceipt} />,
        to: "/app/survey",
        class: "d-flex",
        is_submenu: "true",
        permission: Permissions.MANAGE_SURVEY,
        subPath: {
            // purchaseReturnSubPath: "/app/all-cash-list",
            // purchasesSubPath: "/app/gift-history",
        },
        subMenu: [
            {
                title: "Survey Questions",
                name: "Survey questions",
                fontIcon: <FontAwesomeIcon icon={faReceipt} />,
                to: "/app/question",
                class: "d-flex",
                permission: Permissions.MANAGE_QUESTION,
            },
            {
                title: "Survey Reports",
                name: "Survey Reports",
                fontIcon: <FontAwesomeIcon icon={faArrowLeft} />,
                to: "/app/survey",
                class: "d-flex",
                permission: Permissions.MANAGE_SURVEY,
            },
        ],
    },

    // {
    //     title: "reports.title",
    //     name: "reports",
    //     // fontIcon: <FontAwesomeIcon icon={faBoxes} />,
    //     to: "/app/report/report-sale",
    //     class: "d-flex",
    //     is_submenu: "true",
    //     fontIcon: <FontAwesomeIcon icon={faChartColumn} />,
    //     to: "/app/report/report-warehouse",
    //     path: "/app/report/report-sale",
    //     stockPath: "/app/report/report-stock",
    //     purchasePath: "/app/report/report-purchase",
    //     topSellingPath: "/app/report/report-top-selling-products",
    //     stockDetailPath: "/app/report/report-detail-stock",
    //     productQuantityAlertPath: "/app/report/report-product-quantity",
    //     supplierReportPath: "/app/report/suppliers",
    //     profitLossReportPath: "/app/report/profit-loss",
    //     supplierReportDetailsPath: "/app/report/suppliers/details",
    //     bestCustomerReportPath: "/app/report/best-customers",
    //     customerReportPath: "/app/report/customers",
    //     customerReportDetailsPath: "/app/report/customers/details",
    //     registerReportPath: "/app/report/register",
    //     class: "d-flex",
    //     isSamePrefix: false,
    //     permission: Permissions.MANAGE_REPORTS,
    //     subMenu: [
    //         {
    //             title: "sale.reports.title",
    //             to: "/app/report/report-sale",
    //             name: "sale.reports.title",
    //             class: "d-flex",
    //             fontIcon: <FontAwesomeIcon icon={faBoxes} />,
    //             permission: Permissions.MANAGE_DASHBOARD,
    //         },
    //         {
    //             title: "stock.reports.title",
    //             name: "stock.reports.title",
    //             fontIcon: <FontAwesomeIcon icon={faBoxOpen} />,
    //             to: "/app/report/report-stock",
    //             class: "d-flex",
    //             permission: Permissions.MANAGE_DASHBOARD,
    //         },
    //         {
    //             title: "top-selling-product.reports.title",
    //             name: "top-selling-product.reports.title",
    //             fontIcon: <FontAwesomeIcon icon={faBookmark} />,
    //             to: "/app/report/report-top-selling-products",
    //             class: "d-flex",
    //             permission: Permissions.MANAGE_DASHBOARD,
    //         },           
    //         {
    //             title: "product.quantity.alert.reports.title",
    //             name: "product.quantity.alert.reports.title",
    //             fontIcon: <FontAwesomeIcon icon={faRulerHorizontal} />,
    //             to: "/app/report/report-product-quantity",
    //             class: "d-flex",
    //             permission: Permissions.MANAGE_DASHBOARD,
    //         },

    //         {
    //             title: "profit-loss.reports.title",
    //             name: "profit-loss.reports.title",
    //             fontIcon: <FontAwesomeIcon icon={faArrowLeft} />,
    //             to: "/app/report/profit-loss",
    //             class: "d-flex",
    //             permission: Permissions.MANAGE_DASHBOARD,
    //         },
    //         {
    //             title: "best-customer.report.title",
    //             name: "best-customer.report.title",
    //             fontIcon: <FontAwesomeIcon icon={faPrint} />,
    //             to: "/app/report/best-customers",
    //             class: "d-flex",
    //             permission: Permissions.MANAGE_DASHBOARD,
    //         },
    //         {
    //             title: "customer.report.title",
    //             name: "customer.report.title",
    //             fontIcon: <FontAwesomeIcon icon={faPrint} />,
    //             to: "/app/report/customers",
    //             class: "d-flex",
    //             permission: Permissions.MANAGE_DASHBOARD,
    //         },
    //     ],
    // },


    // {
    //     title: "reports.title",
    //     name: "reports",
    //     fontIcon: <FontAwesomeIcon icon={faChartColumn} />,
    //     // to: "/app/report/report-warehouse",
    //     // path: "/app/report/report-sale",
    //     // stockPath: "/app/report/report-stock",
    //     // purchasePath: "/app/report/report-purchase",
    //     topSellingPath: "/app/report/report-top-selling-products",
    //     stockDetailPath: "/app/report/report-detail-stock",
    //     productQuantityAlertPath: "/app/report/report-product-quantity",
    //     supplierReportPath: "/app/report/suppliers",
    //     profitLossReportPath: "/app/report/profit-loss",
    //     supplierReportDetailsPath: "/app/report/suppliers/details",
    //     bestCustomerReportPath: "/app/report/best-customers",
    //     customerReportPath: "/app/report/customers",
    //     customerReportDetailsPath: "/app/report/customers/details",
    //     registerReportPath: "/app/report/register",
    //     class: "d-flex",
    //     isSamePrefix: "true",
    //     permission: Permissions.MANAGE_REPORTS,
    //     subTitles: [
    //         { title: "warehouse.reports.title" },
    //         { title: "sale.reports.title" },
    //         { title: "stock.reports.title" },
    //         // { title: "purchase.reports.title" },
    //         { title: "top-selling-product.reports.title" },
    //         { title: "product.quantity.alert.reports.title" },
    //         { title: "supplier.report.title" },
    //         { title: "best-customer.report.title" },
    //         { title: "customer.report.title" },
    //         { title: "customer.report.title" },
    //         { title: "profit-loss.reports.title" },
    //         { title: "best-customer.report.title" },
    //         { title: "register.report.title" },
    //     ],
    //     items: [
    //         // {
    //         //     title: getFormattedMessage("warehouse.reports.title"),
    //         //     to: "/app/report/report-warehouse",
    //         // },
    //         {
    //             title: getFormattedMessage("sale.reports.title"),
    //             to: "/app/report/report-sale",
    //         },
    //         {
    //             title: getFormattedMessage("stock.reports.title"),
    //             to: "/app/report/report-stock",
    //             detail: "/app/report/report-detail-stock",
    //         },
    //         // {
    //         //     title: getFormattedMessage("purchase.reports.title"),
    //         //     to: "/app/report/report-purchase",
    //         // },
    //         {
    //             title: getFormattedMessage("top-selling-product.reports.title"),
    //             to: "/app/report/report-top-selling-products",
    //         },
    //         {
    //             title: getFormattedMessage(
    //                 "product.quantity.alert.reports.title"
    //             ),
    //             to: "/app/report/report-product-quantity",
    //         },
    //         // {
    //         //     title: "Supplier Report",
    //         //     to: '/app/report/suppliers',
    //         // },
    //         // {
    //         //     title: getFormattedMessage("supplier.report.title"),
    //         //     to: "/app/report/suppliers",
    //         //     detail: "/app/report/suppliers/details",
    //         // },
    //         {
    //             title: getFormattedMessage("profit-loss.reports.title"),
    //             to: "/app/report/profit-loss",
    //         },
    //         {
    //             title: getFormattedMessage("best-customer.report.title"),
    //             to: "/app/report/best-customers",
    //         },
    //         {
    //             title: getFormattedMessage("customer.report.title"),
    //             to: "/app/report/customers",
    //             detail: "/app/report/customers/details",
    //         },
    //         // {
    //         //     title: getFormattedMessage( "customer.report.title" ),
    //         //     to: '/app/report/customers',
    //         //     detail: '/app/report/customers/details'
    //         // },
    //         // {
    //         //     title: getFormattedMessage("register.report.title"),
    //         //     to: "/app/report/register",
    //         // },
    //     ],
    // },



    {
        title: "Language Settings",
        name: "Language Settings",
        fontIcon: <FontAwesomeIcon icon={faLanguage} />,
        to: "/app/languages",
        class: "d-flex",
        permission: Permissions.MANAGE_LANGUAGE_CONTENT || Permissions.MANAGE_LANGUAGES,
        subMenu: [
            {
                title: "Language Contents",
                name: "Language Contents",
                fontIcon: <FontAwesomeIcon icon={faArrowLeft} />,
                to: "/app/language-contents",
                class: "d-flex",
                permission: Permissions.MANAGE_LANGUAGE_CONTENT,
            },
            {
                title: "Language List",
                name: "Language List",
                fontIcon: <FontAwesomeIcon icon={faLanguage} />,
                to: "/app/languages",
                class: "d-flex",
                permission: Permissions.MANAGE_LANGUAGES,
                items: [
                    {
                        title: getFormattedMessage("languages.title"),
                        to: "/app/languages",
                    },
                ],
            },
        ],
    },

    {
        title: "currencies.title",
        name: "currencies",
        fontIcon: <FontAwesomeIcon icon={faDollarSign} />,
        to: "/app/currencies",
        class: "d-flex",
        permission: Permissions.MANAGE_CURRENCY,
        items: [
            {
                title: getFormattedMessage("currencies.title"),
                to: "/app/currencies",
            },
        ],
    },

    {
        title: "roles.permissions.title",
        name: "roles",
        fontIcon: <FontAwesomeIcon icon={faShieldHalved} />,
        to: "/app/roles",
        class: "d-flex",
        permission: Permissions.MANAGE_ROLES,
        items: [
            {
                title: getFormattedMessage("roles.title"),
                to: "/app/roles",
            },
        ],
    },

    {
        title: "settings.title",
        name: "Settings",
        fontIcon: <FontAwesomeIcon icon={faGear} />,
        // to: "/app/languages",
        class: "d-flex",
        permission: Permissions.MANAGE_SETTING,
        subMenu: [
            {
                title: "System Settings",
                name: "System Settings",
                fontIcon: <FontAwesomeIcon icon={faGear} />,
                to: "/app/settings",
                class: "d-flex",
                permission: Permissions.MANAGE_SETTING,
            },
            {
                title:"mail Settings",
                name: "Mail Settings",
                fontIcon: <FontAwesomeIcon icon={faSms} />,
                to: "/app/mail-settings",
                class: "d-flex",
                permission: Permissions.MANAGE_SETTING,
                // items: [
                //     {
                //         title: getFormattedMessage("languages.title"),
                //         to: "/app/languages",
                //     },
                // ],
            },
        ],
    },

    // {
    //     title: "Notifications",
    //     name: "Notification",
    //     fontIcon: <FontAwesomeIcon icon={faSms} />,
    //     // to: "/app/notification-templates/create",
    //     class: "d-flex",
    //     permission: Permissions.MANAGE_DASHBOARD,
    //     subMenu: [
    //         {
    //             title: "user Notification",
    //             name: "User Notification",
    //             fontIcon: <FontAwesomeIcon icon={faSms} />,
    //             to: "/app/user-notification-templates-list",
    //             class: "d-flex",
    //             permission: Permissions.MANAGE_DASHBOARD,
    //         },
    //         {
    //             title: "Admin Notification",
    //             name: "Admin Notification",
    //             fontIcon: <FontAwesomeIcon icon={faSms} />,
    //             to: "/app/admin-notification-templates-list",
    //             class: "d-flex",
    //             permission: Permissions.MANAGE_DASHBOARD,
    //         },
    //         {
    //             title: "email-template.title",
    //             name: "email-templates",
    //             fontIcon: <FontAwesomeIcon icon={faEnvelope} />,
    //             to: "/app/email-templates",
    //             class: "d-flex",
    //             permission: Permissions.MANAGE_DASHBOARD,
    //         },
    //     ],
    // },





];
