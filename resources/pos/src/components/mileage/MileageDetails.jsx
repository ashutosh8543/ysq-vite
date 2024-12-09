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

const MileageDetails = (props) => {
    const {
        totalRecord,
        isLoading,
        frontSetting,
        fetchFrontSetting,
        allConfigData,
        mileageDetail,
        fetchMileage
    } = props;
    const navigate = useNavigate();
    const {id}=useParams();
   
    useEffect(() => {
        fetchFrontSetting();
        fetchMileage(id);
    }, []);

   
        return (
            <MasterLayout>
                <TopProgressBar />
                <HeaderTitle
                title={getFormattedMessage("mileage.mileage-details.title")}
                to="/app/mileage-records"
            />
            <TabTitle
                title={placeholderText("mileage.mileage-details.title")}
            />
             {isLoading ? <Spinner /> : <>             
                <div>
                    <Card>
                        <Card.Header as='h5'>{getFormattedMessage('user-details.table.title')}</Card.Header>
                        <Card.Body className='pt-0'>
                            <Table responsive>
                                <tbody>
                                <tr>
                                    <td className='py-4'>Type</td>
                                    <td className='py-4'>{mileageDetail?.type}</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>Mileage</td>
                                    <td className='py-4'>{mileageDetail?.mileage}  KM</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>Date</td>
                                    <td className='py-4'>{mileageDetail?.uploaded_date}</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>Location</td>
                                    <td className='py-4'>{mileageDetail?.location}</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>{getFormattedMessage('user.input.first-name.label')}</td>
                                    <td className='py-4'>{mileageDetail && mileageDetail.sales_man?.first_name}</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>{getFormattedMessage('user.input.last-name.label')}</td>
                                    <td className='py-4'>{mileageDetail && mileageDetail.sales_man?.last_name}</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>{getFormattedMessage('user.input.email.label')}</td>
                                    <td className='py-4'>{mileageDetail && mileageDetail.sales_man?.email}</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>{getFormattedMessage('user.input.phone-number.label')}</td>
                                    <td className='py-4'>{mileageDetail && mileageDetail.sales_man?.phone}</td>
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
                                <div className='col-xxl-6 col-sm-6'>
                                    <div
                                        className='d-sm-flex align-items-center mb-5 mb-xxl-0 flex-row text-sm-start'>
                                             
                                        <div
                                            className='image' style={{width:"100%"}}>
                                                <h2>Vehicle Image</h2>
                                            {mileageDetail && mileageDetail.vehicle_image ?
                                                <Image src={mileageDetail.vehicle_image} alt='User Profile'
                                                       className='object-fit-cover'/> :
                                                <span className='user_avatar'>
                                                            {getAvatarName(mileageDetail && mileageDetail.sales_man?.first_name + ' ' + mileageDetail.sales_man?.last_name)}
                                                        </span>
                                            }
                                        </div>                                      
                                    </div>
                                </div>
                                <div className='col-xxl-6 col-sm-6'>
                                    <div
                                        className='d-sm-flex align-items-center mb-5 mb-xxl-0 flex-row text-sm-start'>
                                            
                                        <div
                                            className='image ' style={{width:"100%"}}>
                                                <h2>Mileage Image</h2>
                                            {mileageDetail && mileageDetail.vehicle_image ?
                                                <Image src={mileageDetail.vehicle_image} alt='User Profile'
                                                       className='object-fit-cover'/> :
                                                <span className='user_avatar'>
                                                            {getAvatarName(mileageDetail && mileageDetail.sales_man?.first_name + ' ' + mileageDetail.sales_man?.last_name)}
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
    const {mileageDetail, totalRecord, isLoading, frontSetting, allConfigData } =
        state;
    return {mileageDetail, totalRecord, isLoading, frontSetting, allConfigData };
};

export default connect(mapStateToProps, {fetchMileage, fetchFrontSetting })(
    MileageDetails
);
