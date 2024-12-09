import React, { useEffect, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap-v5";
import { connect } from "react-redux";
import { getFormattedMessage } from "../../shared/sharedMethod";
import ReactSelect from "../../shared/select/reactSelect";
import { fetchCountry, updateCountry } from "../../store/action/countryAction";

const CountryModel = ({
    countryModel,
    onClickCountryModel,
    countries,
    fetchCountry,
    updateCountry,
}) => {
    const [countryValue, setCountryValue] = useState(null);

    useEffect(() => {
        fetchCountry();
    }, [fetchCountry]);

    const itemsValue =
        countries &&
        countries.length > 0 &&
        countries.map((country) => {
            return {
                id: country?.id,
                name: country?.name,
                label: country?.name,
                value: country?.id,
            };
        });

    const onCountryChange = (selectedCountry) => {
        setCountryValue(selectedCountry);
    };

    const handleSave = () => {
        if (countryValue) {
            updateCountry(countryValue.value);
            onClickCountryModel(false);
        } else {
            alert("Please select a country!");
        }
    };

    return (
        <Modal
            show={countryModel}
            onHide={() => onClickCountryModel(false)}
            keyboard={true}
        >
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>Change Country</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-12 mb-5">
                            {itemsValue && itemsValue.length > 0 ? (
                                <ReactSelect
                                    title="Country"
                                    multiLanguageOption={itemsValue}
                                    value={countryValue}
                                    onChange={onCountryChange}
                                />
                            ) : (
                                <p>Loading countries...</p>
                            )}
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer className="pt-0 justify-content-start">
                    <Button
                        variant="secondary"
                        onClick={() => onClickCountryModel(false)}
                    >
                        {getFormattedMessage("globally.cancel-btn")}
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

const mapStateToProps = (state) => {
    const { countries } = state;
    return { countries };
};

const mapDispatchToProps = {
    fetchCountry,
    updateCountry,
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryModel);
