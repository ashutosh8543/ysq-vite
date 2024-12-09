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
import { fetchSurveyDetalis } from "../../store/action/surveyAction";

const SurveyDetails = (props) => {
    const {
        totalRecord,
        isLoading,
        frontSetting,
        fetchFrontSetting,
        allConfigData,
        surveys,
        fetchSurveyDetalis
    } = props;
    const navigate = useNavigate();
    const {id}=useParams();
   
    useEffect(() => {
        fetchSurveyDetalis(id);
    }, []);

     
        return (
            <MasterLayout>
                <TopProgressBar />
                <HeaderTitle
                title="Survey details"
                to="/app/survey"
            />
            <TabTitle
                title="Survey details"
            />
             {isLoading ? <Spinner /> : <>             
                <div>
                    <Card>
                        <Card.Header as='h5'>{getFormattedMessage('user-details.table.title')}</Card.Header>
                        <Card.Body className='pt-0'>
                            <Table responsive>
                                <tbody>
                                <tr>
                                    <td className='py-4'>Name</td>
                                    <td className='py-4'>{surveys && surveys?.salesman_details?.first_name+' '+surveys?.salesman_details?.last_name}</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>Survey On</td>
                                    <td className='py-4'>{ surveys && surveys?.order_id}</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>Date</td>
                                    <td className='py-4'>{surveys?.survey_date}</td>
                                </tr>
                                <tr>
                                    <td className='py-4'>Question</td>
                                    <td className='py-4'>Answer</td>
                                </tr>
                                { surveys && surveys.survey_history && surveys.survey_history.map((item)=>
                                  
                                       <tr key={item.id}>
                                        <td className='py-4'>{item.question}</td>
                                        <td className='py-4'>{item?.option}</td>
                                        </tr>
                                        )                              
                                }    
                          
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </div>
              
            </>
                      }               
            </MasterLayout>
        )};

const mapStateToProps = (state) => {
    const {surveys, totalRecord, isLoading, frontSetting, allConfigData } =
        state;
    return {surveys, totalRecord, isLoading, frontSetting, allConfigData };
};

export default connect(mapStateToProps, {fetchSurveyDetalis, fetchFrontSetting })(
    SurveyDetails
);
