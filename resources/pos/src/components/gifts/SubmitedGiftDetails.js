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
import { fetchSubmittedDetails } from "../../store/action/giftAction";
import Spinner from "../../shared/components/loaders/Spinner";

const SubmitedGiftDetails = (props) => {
    const {
        totalRecord,
        isLoading,
        frontSetting,
        fetchFrontSetting,
        allConfigData,
        giftHistory,
        fetchSubmittedDetails
    } = props;
    const navigate = useNavigate();
    const {id}=useParams();
   
    useEffect(() => {
        fetchFrontSetting();
        fetchSubmittedDetails(id);
    }, []);
        
    console.log("ff",giftHistory);
    
   
        return (
            <MasterLayout>
                <TopProgressBar />
                <HeaderTitle
                title="Details"
                to="/app/gift-history"
            />
            <TabTitle
                title="Details"
            />
             {isLoading ? <Spinner /> : <>             
                <div>
                    <Card>
                        <Card.Header as='h5'>{getFormattedMessage('user-details.table.title')}</Card.Header>
                        <Card.Body className='pt-0'>
                            <Table responsive>
                                <tbody>
                                <tr>
                                    <td className='py-4'>Delivery Id</td>
                                    <td className='py-4'>{giftHistory?.unique_id}</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>Description</td>
                                    <td className='py-4'>{giftHistory?.discription}</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>Quantity</td>
                                    <td className='py-4'>{giftHistory?.total_quantity}</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>Date</td>
                                    <td className='py-4'>{giftHistory?.uploaded_date}</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>Location</td>
                                    <td className='py-4'>{giftHistory?.location}</td>
                                </tr>                                                        
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
                <div className="pt-0 mt-5">
                    <Card>
                        <Card.Header as='h5'>Gift Details</Card.Header>
                        <Card.Body className='pt-0'>
                            <Table responsive>
                                <tbody>
                                <tr>
                                <td className='py-4'>Name</td>
                                <td className='py-4'>Quantity</td>
                                {/* <td className='py-4'>Description</td> */}
                                </tr>
                                {                                    
                                
                                          giftHistory?.gift_item && giftHistory?.gift_item.map((item)=>( 
                                            <>                                
                                            <tr key={item.id}>
                                                <td className='py-4'>{item?.gift_details?.title}</td>
                                                <td className='py-4'>{item?.quantity}</td>
                                                {/* <td className='py-4'>{item?.gitf_details?.discription}</td> */}
                                            </tr>                                           
                                            </>
                                          ))
                                    }                                                     
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
                <div className="pt-0 mt-5">
                    <Card>
                        <Card.Header as='h5'>Salesman Details</Card.Header>
                        <Card.Body className='pt-0'>
                            <Table responsive>
                                <tbody>
                                <tr>
                                    <td className='py-4'>Salesman Id</td>
                                    <td className='py-4'>{giftHistory.salesman && giftHistory?.salesman.unique_code}</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>Name</td>
                                    <td className='py-4'>{giftHistory.salesman && giftHistory?.salesman.first_name+' '+giftHistory?.salesman.last_name}</td>
                                </tr>
                                                                                    
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
                <div className="pt-0 mt-5">
                    <Card>
                        <Card.Header as='h5'>Customer Details</Card.Header>
                        <Card.Body className='pt-0'>
                            <Table responsive>
                                <tbody>
                                <tr>
                                    <td className='py-4'>Customer Id</td>
                                    <td className='py-4'>{giftHistory?.outlets?.unique_code}</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>Name</td>
                                    <td className='py-4'>{giftHistory?.outlets?.name}</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>Customer Type</td>
                                    <td className='py-4'>{giftHistory?.outlets?.channel_details?.name}</td>
                                </tr> 
                                <tr>
                                    <td className='py-4'>Country</td>
                                    <td className='py-4'>{giftHistory?.outlets?.country_details?.name}</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>City</td>
                                    <td className='py-4'>{giftHistory?.outlets?.city}</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>Address</td>
                                    <td className='py-4'>{giftHistory?.outlets?.address}</td>
                                </tr>                                                          
                                                                                         
                                <tr>
                                    <td className='py-4'>{getFormattedMessage('user.input.phone-number.label')}</td>
                                    <td className='py-4'>{giftHistory && giftHistory.outlets?.phone}</td>
                                </tr>                            
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
                <div className='pt-0 mt-5'>
                    <Card>
                        <Card.Body>
                            <div className='row'>                            
                                <div className='col-xxl-12 col-sm-12'>
                                    <div
                                        className='d-sm-flex align-items-center mb-5 mb-xxl-0 flex-row text-sm-start'>
                                            
                                        <div
                                            className='image ' style={{width:"100%"}}>
                                                
                                            {giftHistory && giftHistory.image ?
                                                <Image src={giftHistory.image} alt='User Profile'
                                                       className='object-fit-cover' style={{width:"100%",height:"500px"}}/> :
                                                <span className='user_avatar'>
                                                            {getAvatarName(giftHistory && giftHistory.sales_man?.first_name + ' ' + giftHistory.sales_man?.last_name)}
                                                        </span>
                                            }
                                        </div>                                      
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </>
            }                
            </MasterLayout>
        )};

const mapStateToProps = (state) => {
    const {giftHistory, totalRecord, isLoading, frontSetting, allConfigData } =
        state;
    return {giftHistory, totalRecord, isLoading, frontSetting, allConfigData };
};

export default connect(mapStateToProps, {fetchSubmittedDetails, fetchFrontSetting })(
    SubmitedGiftDetails
);
