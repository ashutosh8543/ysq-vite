import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as EmailValidator from "email-validator";
import {
    editSupervisor,
    fetchDistributors,
} from "../../store/action/userAction";
import ImagePicker from "../../shared/image-picker/ImagePicker";
import {
    getAvatarName,
    getFormattedMessage,
    placeholderText,
    numValidate,
} from "../../shared/sharedMethod";
import user from "../../assets/images/avatar.png";
import ModelFooter from "../../shared/components/modelFooter";
import { fetchAllRoles } from "../../store/action/roleAction";
import {
    fetchSetting,
    editSetting,
    fetchCacheClear,
    fetchState,
} from "../../store/action/settingAction";
import { fetchCurrencies } from "../../store/action/currencyAction";
import { fetchAllCustomer } from "../../store/action/customerAction";
import { fetchAllWarehouses } from "../../store/action/warehouseAction";
import { fetchRoles } from "../../store/action/roleAction";

const SupervisorForm = (props) => {
    const {
        distributors,
        fetchDistributors,
        addUserData,
        id,
        singleUser,
        isEdit,
        isCreate,
        fetchAllRoles,
        roles,
        defaultCountry,
        fetchSetting,
        fetchCurrencies,
        warehouses,
        fetchAllWarehouses,
    } = props;
    const Dispatch = useDispatch();
    const navigate = useNavigate();
    const [filteredData, setFilteredData] = useState(warehouses);
    const [countries, setCountries] = useState([]);
    const [userValue, setUserValue] = useState({
        first_name: singleUser ? singleUser[0].first_name : "",
        last_name: singleUser ? singleUser[0].last_name : "",
        email: singleUser ? singleUser[0].email : "",
        phone: singleUser ? singleUser[0].phone : "",
        password: "",
        confirm_password: "",
        role_id: singleUser ? singleUser[0].role_id : "",
        image: singleUser ? singleUser[0].image : "",
        distributor_id: singleUser ? singleUser[0].distributor_id : "",
        ware_id: singleUser ? singleUser[0].ware_id : "",
        country: singleUser ? singleUser[0].country : "",
    });
    const [errors, setErrors] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
        role_id: "",
        distributor_id: "",
        ware_id: "",
        country: "",
    });
    const avatarName = getAvatarName(
        singleUser &&
            singleUser[0].image === "" &&
            singleUser[0].first_name &&
            singleUser[0].last_name &&
            singleUser[0].first_name + " " + singleUser[0].last_name
    );
    const newImg =
        singleUser &&
        singleUser[0].image &&
        singleUser[0].image === null &&
        avatarName;
    const [imagePreviewUrl, setImagePreviewUrl] = useState(newImg && newImg);
    const [selectImg, setSelectImg] = useState(null);
    const disabled = selectImg
        ? false
        : singleUser &&
          singleUser[0].first_name === userValue.first_name &&
          singleUser[0].last_name === userValue.last_name &&
          singleUser[0].email === userValue.email &&
          singleUser[0].phone === userValue.phone &&
          singleUser[0].image === userValue.image &&
          singleUser[0]?.distributor_id === userValue.distributor_id &&
          singleUser[0]?.ware_id === userValue?.ware_id &&
          singleUser[0].role_id.label[0] === userValue.role_id.label[0] &&
          singleUser[0].password === userValue.password &&
          singleUser[0].confirm_password === userValue.confirm_password;

    const [selectedRole] = useState(
        singleUser && singleUser[0]
            ? [
                  {
                      label: singleUser[0].role_id.label[0],
                      value: singleUser[0].role_id.value[0],
                  },
              ]
            : null
    );

    useEffect(() => {
        fetchSetting();
        fetchAllWarehouses();
        fetchDistributors();
    }, []);

    useEffect(() => {
        setImagePreviewUrl(
            singleUser ? singleUser[0].image && singleUser[0].image : user
        );
    }, []);
    
    console.log("warehouses",warehouses);    

    useEffect(() => {
        const warehouse = warehouses && warehouses.filter((item)=>{
            return   item?.attributes?.user_id == userValue?.distributor_id
          }
       )
        setFilteredData(warehouse);
        if (defaultCountry) {
            const countries =
                defaultCountry &&
                defaultCountry.countries &&
                defaultCountry.countries.filter(
                    (country) => country.name === defaultCountry.country
                );
        }
    }, [defaultCountry]);

    // const onCountryChange = (e) => {
    //     setFilteredData([]);
    //     setUserValue.ware_id="";
    //     setUserValue(inputs => ({ ...inputs, [e.target.name]: e.target.value }))
    //     setFilteredData(warehouses.filter(item => item.attributes?.user_id === e.target.value))
    //     setErrors("");
    // };

    const onCountryChange = (e) => {
        const selectedDistributorId = e.target.value;
        setUserValue((prevValue) => ({
            ...prevValue,
            distributor_id: selectedDistributorId,
            ware_id: "",
        }));

        // console.log("Distributor selected:", selectedDistributorId);

        const selectedDistributor = distributors.find(
            (item) => item.id === parseInt(selectedDistributorId)
        );

        if (selectedDistributor) {
            console.log("Selected distributor details:", selectedDistributor);

            const country = selectedDistributor.attributes?.countryDetails;
            if (country) {
                console.log("Country details:", country);

                setUserValue((prevValue) => ({
                    ...prevValue,
                    country: country.id,
                }));

                setCountries([country]);
            }

            const warehousesForDistributor =

                // selectedDistributor.attributes?.warehouse || [];
                    
                warehouses && warehouses.filter((item)=>{
                     return   item?.attributes?.user_id == selectedDistributorId
                   }
                )            

            console.log(
                "Warehouses for the selected distributor:",
                warehousesForDistributor
            );

            setFilteredData(warehousesForDistributor);
        } else {
            console.log("No distributor found for the selected ID");
        }
        setErrors({});
    };

    const handleValidation = () => {
        let errorss = {};
        let isValid = true;

        // Check for required fields
        if (!userValue.first_name) {
            errorss.first_name = getFormattedMessage(
                "user.input.first-name.validate.label"
            );
            isValid = false;
        }
        if (!userValue.last_name) {
            errorss.last_name = getFormattedMessage(
                "user.input.last-name.validate.label"
            );
            isValid = false;
        }
        if (!userValue.email) {
            errorss.email = getFormattedMessage(
                "user.input.email.validate.label"
            );
            isValid = false;
        } else if (!EmailValidator.validate(userValue.email)) {
            errorss.email = getFormattedMessage(
                "user.input.email.valid.validate.label"
            );
            isValid = false;
        }
        if (!userValue.phone) {
            errorss.phone = getFormattedMessage(
                "user.input.phone-number.validate.label"
            );
            isValid = false;
        }
        if (!userValue.distributor_id) {
            errorss.distributor_id = "Please select distributor ";
            isValid = false;
        }
        if (!userValue.ware_id) {
            errorss.ware_id = "Please select warehouse ";
            isValid = false;
        }
        if (userValue.password !== userValue.confirm_password) {
            errorss.confirm_password = "Passwords do not match";
            isValid = false;
        }

        setErrors(errorss);
        return isValid;
    };

    const onChangeInput = (e) => {
        e.preventDefault();
        setUserValue((inputs) => ({
            ...inputs,
            [e.target.name]: e.target.value,
        }));
        setErrors("");
    };

    const handleImageChanges = (e) => {
        e.preventDefault();
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type === "image/jpeg" || file.type === "image/png") {
                setSelectImg(file);
                const fileReader = new FileReader();
                fileReader.onloadend = () => {
                    setImagePreviewUrl(fileReader.result);
                };
                fileReader.readAsDataURL(file);
                setErrors("");
            }
        }
    };

    const prepareFormData = (data) => {
        const formData = new FormData();
        formData.append("first_name", data.first_name);
        formData.append("last_name", data.last_name);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("country", data.country);
        formData.append("region", data.region);
        formData.append("role_id", 5);
        formData.append("distributor_id", data.distributor_id);
        formData.append("ware_id", data.ware_id);

        if (isEdit) {
            formData.append("supervisor_id", singleUser[0].supervisor_id);
        }

        if (data.password) {
            formData.append("password", data.password);
        }
        if (data.confirm_password) {
            formData.append("confirm_password", data.confirm_password);
        }
        if (selectImg) {
            formData.append("image", data.image);
        }
        return formData;
    };

    const onSubmit = (event) => {
        const formData = prepareFormData(userValue);
        console.log("Prepared form data:", formData);
        event.preventDefault();
        userValue.image = selectImg;

        const valid = handleValidation();
        if (valid) {
            if (singleUser) {
                if (!disabled) {
                    Dispatch(
                        editSupervisor(id, prepareFormData(userValue), navigate)
                    );
                }
            } else {
                addUserData(prepareFormData(userValue));
                setImagePreviewUrl(imagePreviewUrl ? imagePreviewUrl : user);
            }
        }
    };

    

    return (
        <div className="card">
            <div className="card-body">
                <Form>
                    <div className="row">
                        <div className="mb-4">
                            <ImagePicker
                                user={user}
                                isCreate={isCreate}
                                avtarName={avatarName}
                                imageTitle={placeholderText(
                                    "globally.input.change-image.tooltip"
                                )}
                                imagePreviewUrl={imagePreviewUrl}
                                handleImageChange={handleImageChanges}
                            />
                        </div>
                        {/* Distributor */}
                        <div className="col-md-6">
                            <label className="form-label">
                                Distributors :<span className="required" />
                            </label>
                            <select
                                className="form-control"
                                autoFocus={true}
                                name="distributor_id"
                                value={userValue?.distributor_id}
                                onChange={(e) => onCountryChange(e)}
                            >
                                <option value="">
                                    Please select distributor
                                </option>
                                {distributors &&
                                    distributors?.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.attributes?.first_name +
                                                "  " +
                                                item.attributes?.last_name}
                                        </option>
                                    ))}
                            </select>
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["distributor_id"]
                                    ? errors["distributor_id"]
                                    : null}
                            </span>
                        </div>

                        {/* country */}
                        <div className="col-md-6">
                            <label htmlFor="country" className="form-label">
                                Country :<span className="required" />
                            </label>
                            <select
                                className="form-control"
                                name="country"
                                value={userValue?.country || ""}
                                onChange={onChangeInput}
                                disabled                            >
                                <option value="">Please select country</option>
                                {defaultCountry &&
                                    defaultCountry.countries &&
                                    defaultCountry.countries.map((item) => (
                                        <option key={item.id} value={item?.id}>
                                            {item?.name}
                                        </option>
                                    ))}
                            </select>
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["country_id"]
                                    ? errors["country_id"]
                                    : null}
                            </span>
                        </div>

                        {/* warehouse */}
                        <div className="col-md-6">
                            <label htmlFor="ware_id" className="form-label">
                                Warehouse :<span className="required" />
                            </label>
                            <select
                                className="form-control"
                                name="ware_id"
                                value={userValue?.ware_id || ""}
                                onChange={onChangeInput}
                            >
                                <option value="">
                                    Please select warehouse
                                </option>
                                {filteredData.length > 0 ? (
                                    filteredData.map((warehouse) => (
                                        <option
                                            key={warehouse.id}
                                            value={warehouse?.attributes?.ware_id}
                                        >
                                            {warehouse?.attributes?.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>
                                        No warehouses available
                                    </option>
                                )}
                            </select>
                            {/* Error handling */}
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["ware_id"] ? errors["ware_id"] : null}
                            </span>
                        </div>
                        {/* warehouse */}

                        <div className="col-md-6 mb-3">
                            <label
                                htmlFor="exampleInputEmail1"
                                className="form-label"
                            >
                                {getFormattedMessage(
                                    "user.input.first-name.label"
                                )}{" "}
                                :<span className="required" />
                            </label>
                            <input
                                type="text"
                                name="first_name"
                                value={userValue.first_name}
                                placeholder={placeholderText(
                                    "user.input.first-name.placeholder.label"
                                )}
                                className="form-control"
                                autoFocus={true}
                                onChange={(e) => onChangeInput(e)}
                            />
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["first_name"]
                                    ? errors["first_name"]
                                    : null}
                            </span>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                {getFormattedMessage(
                                    "user.input.last-name.label"
                                )}
                                :
                            </label>
                            <span className="required" />
                            <input
                                type="text"
                                name="last_name"
                                className="form-control"
                                placeholder={placeholderText(
                                    "user.input.last-name.placeholder.label"
                                )}
                                onChange={(e) => onChangeInput(e)}
                                value={userValue.last_name}
                            />
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["last_name"]
                                    ? errors["last_name"]
                                    : null}
                            </span>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                {getFormattedMessage("user.input.email.label")}:
                            </label>
                            <span className="required" />
                            <input
                                type="text"
                                name="email"
                                className="form-control"
                                placeholder={placeholderText(
                                    "user.input.email.placeholder.label"
                                )}
                                onChange={(e) => onChangeInput(e)}
                                value={userValue.email}
                            />
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["email"] ? errors["email"] : null}
                            </span>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                {getFormattedMessage(
                                    "user.input.phone-number.label"
                                )}
                                :
                            </label>
                            <span className="required" />
                            <input
                                type="text"
                                name="phone"
                                value={userValue.phone}
                                placeholder={placeholderText(
                                    "user.input.phone-number.placeholder.label"
                                )}
                                className="form-control"
                                pattern="[0-9]*"
                                min={0}
                                onKeyPress={(event) => numValidate(event)}
                                onChange={(e) => onChangeInput(e)}
                            />
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["phone"] ? errors["phone"] : null}
                            </span>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                {getFormattedMessage(
                                    "user.input.password.label"
                                )}
                                :
                            </label>
                            <span className="required" />
                            <input
                                type="password"
                                name="password"
                                placeholder={placeholderText(
                                    "user.input.password.placeholder.label"
                                )}
                                className="form-control"
                                value={userValue.password}
                                onChange={(e) => onChangeInput(e)}
                            />
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["password"] ? errors["password"] : null}
                            </span>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                {getFormattedMessage(
                                    "user.input.confirm-password.label"
                                )}
                                :
                            </label>
                            <span className="required" />
                            <input
                                type="password"
                                name="confirm_password"
                                className="form-control"
                                placeholder={placeholderText(
                                    "user.input.confirm-password.placeholder.label"
                                )}
                                onChange={(e) => onChangeInput(e)}
                                value={userValue.confirm_password}
                            />
                            <span className="text-danger d-block fw-400 fs-small mt-2">
                                {errors["confirm_password"]
                                    ? errors["confirm_password"]
                                    : null}
                            </span>
                        </div>
                        {/* <div className='col-md-6'>
                            <ReactSelect title={getFormattedMessage("user.input.role.label")} placeholder={placeholderText("user.input.role.placeholder.label")} defaultValue={selectedRole}
                                data={roles} onChange={onRolesChange} errors={errors['role_id']} />
                        </div> */}
                        <ModelFooter
                            onEditRecord={singleUser}
                            onSubmit={onSubmit}
                            editDisabled={disabled}
                            link="/app/supervisor"
                            addDisabled={!userValue.first_name}
                        />
                    </div>
                </Form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    const {
        roles,
        customers,
        warehouses,
        settings,
        currencies,
        countryState,
        dateFormat,
        defaultCountry,
        distributors,
    } = state;
    return {
        roles,
        customers,
        warehouses,
        settings,
        currencies,
        countryState,
        dateFormat,
        defaultCountry,
        distributors,
    };
};

export default connect(mapStateToProps, {
    fetchAllRoles,
    fetchSetting,
    fetchCurrencies,
    fetchCacheClear,
    fetchAllCustomer,
    fetchAllWarehouses,
    editSetting,
    fetchState,
    fetchDistributors,
})(SupervisorForm);
