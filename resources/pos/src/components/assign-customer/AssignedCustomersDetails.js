import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {Card, Table} from 'react-bootstrap';
import moment from 'moment';
import {Image} from 'react-bootstrap-v5';
import MasterLayout from "../MasterLayout";
import { useNavigate,useParams } from "react-router-dom";
import HeaderTitle from "../header/HeaderTitle";
import ReactDataTable from "../../shared/table/ReactDataTable";
import TabTitle from "../../shared/tab-title/TabTitle";
import {
    currencySymbolHandling,
    getFormattedDate,
    getFormattedMessage,
    placeholderText,getAvatarName,
} from "../../shared/sharedMethod";
import  ModalAction from "../../shared/action-buttons/ActionButton";

import { fetchFrontSetting } from "../../store/action/frontSettingAction";
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import {fetchMileage}  from "../../store/action/mileageAction";
import Spinner from "../../shared/components/loaders/Spinner";
import { fetchSingleAssignedCustomer,assignedCustomer } from "../../store/action/assignCustomerAction";
import { Button, Col } from "react-bootstrap-v5";

const AssignedCustomersDetails = (props) => {
    const {
        totalRecord,
        isLoading,
        frontSetting,
        fetchFrontSetting,
        allConfigData,
        assignedCustomerList,
        fetchSingleAssignedCustomer
    } = props;
    const navigate = useNavigate();
    const {id}=useParams();

    useEffect(() => {
        fetchFrontSetting();
        fetchSingleAssignedCustomer(id);
    }, []);

    const onChange = (filter) => {
        // fetchSingleAssignedCustomer(filter, true);
    };
    const itemsValue =
    assignedCustomerList && assignedCustomerList.assign_customers &&
    assignedCustomerList.assign_customers.map((item) => ({
            salesman_name: item?.salesman_name,
            assigned_date: item.assigned_date,
            customer_names: item.customer?.name,
            customer_phone: item.customer?.phone,
            customer_email: item.customer?.email,
            customer_address: item.customer?.address,
            customer_type:item.customer?.channel_details?.name,
            status:item.status,
            id: item.id,
        }));

        function backToLoadMainPage(){
            window.location.href="#/app/assign-product-list"
        }

        const onMileageClick = (item) => {
            const assined_id = item.id;
            // navigate(`app/track-salesman/${id}`);
            window.location.href = "#app/track-salesman/"+id+"/"+assined_id;
        };

    const columns = [
        // {
        //     name: "Assigned Date",
        //     selector: (row) => row.assigned_date,
        //     sortable: false,

        //     cell: (row) => {
        //         return (
        //             row.assigned_date && (
        //                 <span className="badge bg-light-info">
        //                     <div className="mb-1">{row.time}</div>
        //                     <div>{moment(row.assigned_date).format("DD-MM-yyyy")}</div>
        //                 </span>
        //             )
        //         );
        //     },
        // },
        // {
        //     name: "Salesman Name",
        //     sortable: false,
        //     selector: (row) => row.salesman_name,
        // },
        {
            name: "Customer",
            sortable: false,
            selector: (row) => row.customer_names,
            cell: (row) => {
                return (
                    row?.customer_email && (
                        <span className="badge bg-light-info">
                            <div className="mb-1">{row?.customer_names}</div>
                            <div className="mb-1">{row?.customer_email}</div>
                            <div>{row?.customer_phone}</div>
                        </span>
                    )
                );
            },
        },
        {
            name: "Type",
            sortable: false,
            selector: (row) => row.customer_type           
        },
        {
            name: "Address",
            sortable: false,
            selector: (row) => row.customer_address
        },
        {
            name: "Salesman Visit",
            sortable: false,
            cell: (row) => (                       
                <span
                    className="btn btn-sm btn-primary"
                    variant="primary"                  
                >
                  {row.status<2?"Not Visited":"Visited"}
                </span>            
            ),
        },
        {
            name: "Salesman Trip Status",
            sortable: false,
            cell: (row) => (
                <>
                <span
                    className="btn btn-sm btn-warning"
                    variant="primary"                  
                >
                  {row.status==0?"Not Started":row.status==1?"On the way":"Visited"}
                </span>
                {/* <span
                    className="btn btn-sm btn-primary"
                    variant="primary"                  
                >
                  {row.status<2?"Not Visited":"Visited"}
                </span> */}
                </>
            ),
        },
        {
            name: "Action",
            right: true,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            cell: (row) => (
                <>
                
                {row.status==1?
                <button
                    className="btn btn-sm btn-primary"
                    variant="primary"
                    onClick={() => onMileageClick(row)}
                >
                   Track
                </button>
                :""
                 }
                </>
            ),
        },
    ];

        return (
            <MasterLayout>
                <TopProgressBar />
                <HeaderTitle
                title="Customers Details"
                to="/app/assign-customer-list"
               />
            <TabTitle
                title="Customers Details"
            />
             {isLoading ? <Spinner /> : <>
                <div>

                    <Card>
                        <Card.Header as='h5'>Salesman Details</Card.Header>
                        <Card.Body className='pt-0'>
                            <Table responsive>
                                <tbody>
                                <tr>
                                    <td className='py-4'>Assigned Date</td>
                                    <td className='py-4'>{moment(assignedCustomerList.assigned_date).format("DD-MM-yyyy")}</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>{getFormattedMessage('user.input.first-name.label')}</td>
                                    <td className='py-4'>{assignedCustomerList && assignedCustomerList.salesman?.first_name}</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>{getFormattedMessage('user.input.last-name.label')}</td>
                                    <td className='py-4'>{assignedCustomerList && assignedCustomerList.salesman?.last_name}</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>{getFormattedMessage('user.input.email.label')}</td>
                                    <td className='py-4'>{assignedCustomerList && assignedCustomerList.salesman?.email}</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>{getFormattedMessage('user.input.phone-number.label')}</td>
                                    <td className='py-4'>{assignedCustomerList && assignedCustomerList.salesman?.phone}</td>
                                </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
                <ReactDataTable
                    isShowSearch={true}
                    columns={columns}
                    items={itemsValue}
                    onChange={onChange}
                    isLoading={isLoading}
                    totalRows={totalRecord}
                 />
            </>
            }
            </MasterLayout>
        )};

const mapStateToProps = (state) => {
    const {assignedCustomerList, totalRecord, isLoading, frontSetting, allConfigData } =
        state;
    return {assignedCustomerList, totalRecord, isLoading, frontSetting, allConfigData };
};

export default connect(mapStateToProps, {fetchSingleAssignedCustomer, fetchFrontSetting ,assignedCustomer})(
    AssignedCustomersDetails
);
