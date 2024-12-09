import React, { useState, useEffect, useRef } from "react";
import MasterLayout from "../MasterLayout";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import { fetchSalesmans } from "../../store/action/salesmanAction";
import { AreaList } from "../../store/action/areaAction";
import { fetchAllCustomer } from "../../store/action/customerAction";
import ModelFooter from "../../shared/components/modelFooter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { assignCustomer } from "../../store/action/assignCustomerAction";
import { useNavigate,useParams } from "react-router";
import axiosApi from "../../config/apiConfig";
import { Tokens } from "../../constants";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faLocationDot,
    faMobileAlt,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { GoogleMap, LoadScript, Marker, DirectionsRenderer,useJsApiLoader,DirectionsService } from '@react-google-maps/api';
import TopProgressBar from "../../shared/components/loaders/TopProgressBar";
import HeaderTitle from "../header/HeaderTitle";
import { fetchSingleAssignedCustomerSalesMan } from "../../store/action/assignCustomerAction";
import { Col, Row, Table } from "react-bootstrap-v5";
import {
  currencySymbolHandling,
  getFormattedMessage,
  placeholderText,
} from "../../shared/sharedMethod";
const containerStyle = {
    width: '100%',
    height: '600px'
  };
  
  // Center the map on a default location
  const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // San Francisco
const SalesmanTracker = (props) => {
    const {
        salesmans,
        customers,
        assignedCustomerList,
        fetchSingleAssignedCustomerSalesMan
    } = props;

    const { id, assined_id } = useParams();
    console.log("segment",assined_id);
    
    // const { isLoaded } = useJsApiLoader({
    //     googleMapsApiKey: "AIzaSyD6lpgvCGHSvAInVE7wbZ2-OrwJPyVn0OA",
    // });

    const [salesman, setSalesman] = useState([]);
    const navigate = useNavigate();
    const [currentLocation, setCurrentLocation] = useState({ lat:null, lng:null }); // default location
    const [destination, setDestination] = useState({ lat:null, lng:null }); // default destination
    const [directions, setDirections] = useState(null);
    const [googleMaps, setGoogleMaps] = useState(null); // Store the google object
    const [destinationName, setDestinationName] = useState("Customer"); // default destination
    const [sourceName, setSourceName] = useState("Salesman"); // default destination
    const [distance, setDistance] = useState(null); // default destination
    const [duration, setDuration] = useState(null); // default destination
    const [arrivalTime, setArrivalTime] = useState(null);

    useEffect(()=>{       
      fetchSingleAssignedCustomerSalesMan(assined_id)
    },[])
    console.log("assignedCustomerList",assignedCustomerList);  
    // Simulating salesman position updates
    useEffect(() => {
      const interval = setInterval(() => {
        fetchSingleAssignedCustomerSalesMan(assined_id)
        // In a real scenario, you would fetch this from an API or device
        const lat = assignedCustomerList && Number(assignedCustomerList?.salesman?.latitude);  // Simulate movement
        const lng = assignedCustomerList && Number(assignedCustomerList?.salesman?.longitude) ; // Simulate movement
        setCurrentLocation({ lat, lng });
      }, 5000); // Update position every 5 seconds  
      return () => clearInterval(interval);
    }, [currentLocation]);  
    // Fetch directions from source to destination once googleMaps is initialized
    useEffect(() => {
      if (assignedCustomerList && googleMaps && currentLocation && destination) {
        // const lat = currentLocation.lat + (Math.random() - 0.5) * 0.01; // Simulate movement
        // const lng = currentLocation.lng + (Math.random() - 0.5) * 0.01; // Simulate movement
        // setCurrentLocation({ lat, lng });
        
        setDestinationName(assignedCustomerList?.customer?.name);  
        setSourceName(assignedCustomerList?.salesman?.first_name+" "+assignedCustomerList?.salesman?.last_name); 
        setDestination({
          lat:Number(assignedCustomerList?.customer?.latitude),
          lng:Number(assignedCustomerList?.customer?.longitude),
         });      
        const directionsService = new google.maps.DirectionsService();
        const request = {
          origin: currentLocation,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        };  
        directionsService.route(request, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);            
            // Extract distance and duration
            const leg = result.routes[0].legs[0]; // Get the first leg of the route
            console.log("leg:",leg);
            
             setDistance(leg.distance.text); // e.g., "5.0 km"
            setDuration(leg.duration.text); // e.g., "15 mins"
             
            const durationInSeconds =
            result.routes[0].legs[0].duration.value;

          // Calculate estimated arrival time
          const currentTime = new Date();
          const arrivalTime = new Date(currentTime.getTime() + durationInSeconds * 1000);

          setArrivalTime(arrivalTime.toLocaleTimeString());


            console.log("duration",distance,duration)
          }
        });
      }
    }, [googleMaps, currentLocation]);
  
    // Load the Google Maps API and set the global google object
    const handleLoad = (google) => {
      setGoogleMaps(google); // Set the global google object when the API is loaded
    };
    // if (!isLoaded) return <div>Loading...</div>;

    const backUrl= "/app/assing-customers-details/"+id;

    return (
        <MasterLayout>
                 <TopProgressBar />
                <HeaderTitle
                title="Tracking Details"
                to={backUrl}
            />
             <Row className="custom-line-height">
                            <Col md={3}>
                                <h5 className="text-gray-600 bg-light p-4 mb-0 text-uppercase">
                                    {getFormattedMessage(
                                        "sale.detail.customer.info"
                                    )}
                                </h5>
                                <div className="p-4">
                                    <div className="d-flex align-items-center pb-1">
                                        <FontAwesomeIcon
                                            icon={faUser}
                                            className="text-primary me-2 fs-5"
                                        />
                                        {assignedCustomerList?.customer &&
                                            assignedCustomerList?.customer?.name}
                                    </div>
                                    <div className="d-flex align-items-center pb-1">
                                        <FontAwesomeIcon
                                            icon={faEnvelope}
                                            className="text-primary me-2 fs-5"
                                        />
                                        {assignedCustomerList?.customer &&
                                            assignedCustomerList?.customer?.email}
                                    </div>
                                    <div className="d-flex align-items-center pb-1">
                                        <FontAwesomeIcon
                                            icon={faMobileAlt}
                                            className="text-primary me-2 fs-5"
                                        />
                                        {assignedCustomerList?.customer &&
                                            assignedCustomerList?.customer?.phone}
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <FontAwesomeIcon
                                            icon={faLocationDot}
                                            className="text-primary me-2 fs-5"
                                        />
                                        {assignedCustomerList?.customer &&
                                            assignedCustomerList.customer?.address}
                                    </div>
                                </div>
                            </Col>
                            <Col md={3}>
                                <h5 className="text-gray-600 bg-light p-4 mb-0 text-uppercase">
                                    {getFormattedMessage(
                                        "globally.detail.salesman.info"
                                    )}
                                </h5>
                                <div className="p-4">
                                    <div className="d-flex align-items-center pb-1">
                                        <FontAwesomeIcon
                                            icon={faUser}
                                            className="text-primary me-2 fs-5"
                                        />
                                        {assignedCustomerList.salesman &&
                                            assignedCustomerList?.salesman?.first_name+' '+assignedCustomerList?.salesman?.last_name}
                                    </div>
                                    <div className="d-flex align-items-center pb-1">
                                        <FontAwesomeIcon
                                            icon={faEnvelope}
                                            className="text-primary me-2 fs-5"
                                        />
                                        {assignedCustomerList.salesman &&
                                            assignedCustomerList?.salesman?.email}
                                    </div>
                                    <div className="d-flex align-items-center pb-1">
                                        <FontAwesomeIcon
                                            icon={faMobileAlt}
                                            className="text-primary me-2 fs-5"
                                        />
                                        {assignedCustomerList.salesman &&
                                            assignedCustomerList?.salesman?.phone}
                                    </div>
                                   
                                </div>
                            </Col>
                            <Col md={2}>
                                <h5 className="text-gray-600 bg-light p-4 mb-0 text-uppercase">
                                  Arrival time
                                </h5>
                                <div className="p-4">
                                    <div className="pb-1">
                                        <span className="me-2">
                                         Arrival time:
                                         </span>
                                        <span>
                                         {arrivalTime}
                                        </span>
                                    </div>
                                   
                                </div>
                            </Col>
                            <Col md={2}>
                                <h5 className="text-gray-600 bg-light p-4 mb-0 text-uppercase">
                                   Duration
                                </h5>
                                <div className="p-4">
                                    <div className="pb-1">
                                        <span className="me-2">
                                         Duration:
                                        </span>
                                        <span>
                                        {duration}
                                        </span>
                                    </div>
                                   
                                </div>
                            </Col>
                            <Col md={2}>
                                <h5 className="text-gray-600 bg-light p-4 mb-0 text-uppercase">
                                  Distance
                                </h5>
                                <div className="p-4">
                                    <div className="pb-1">
                                        <span className="me-2">
                                            Distance:
                                        </span>
                                        <span>
                                          {distance}
                                        </span>
                                    </div>
                                   
                                </div>
                            </Col>
                        </Row>
            <div className="container mt-4">
                <LoadScript
      googleMapsApiKey="AIzaSyD6lpgvCGHSvAInVE7wbZ2-OrwJPyVn0OA"
      onLoad={() => handleLoad(window.google)} // Ensure google object is available
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={15}
      >
        {/* Marker for Salesman current location */}
        <Marker position={currentLocation} label={sourceName} />

        {/* Marker for Destination */}
        <Marker position={destination} label={destinationName} />

        {/* Show directions from source to destination */}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              preserveViewport: true,
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: "#0000FF",  // Set the color of the direction line (red in this case)
                strokeWeight: 10,          // Set the thickness of the direction line
                strokeOpacity: 0.8       // Set the opacity of the direction line
              }
            }}
          />
        )}
      </GoogleMap>
          </LoadScript>          
                  
            </div>
        </MasterLayout>
    );
};

const mapStateToProps = (state) => {
    const {assignedCustomerList ,areas, customers } = state;
    return {assignedCustomerList, areas, customers };
};

export default connect(mapStateToProps, {
    AreaList,
    fetchAllCustomer,
    fetchSingleAssignedCustomerSalesMan,
})(SalesmanTracker);
