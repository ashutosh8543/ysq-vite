import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Modal } from 'react-bootstrap-v5';
import { getFormattedMessage, placeholderText } from "../../shared/sharedMethod";
import { editLanguage, fetchLanguages, fetchLanguage } from '../../store/action/languageAction';
import ModelFooter from '../../shared/components/modelFooter';
import ImagePicker from "../../shared/image-picker/ImagePicker";

const LanguageForm = ( props ) => {
    
    const { handleClose, show, title, singleLanguage, addLanguageData, editLanguage } = props;
    const [ languageValue, setLanguageValue ] = useState( {
        name: singleLanguage ? singleLanguage.name : '',
        iso_code: singleLanguage ? singleLanguage.iso_code : '',
        lang_image:singleLanguage ? singleLanguage.image : ''
    } );
    const [ errors, setErrors ] = useState( {
        name: '',
        iso_code: '',
        lang_image:''
    } );
    const [imagePreviewUrl, setImagePreviewUrl] = useState();
    const [disable, setDisable] = React.useState(true);
    const [checked, setChecked] = useState(false);
    const [logoChecked, setLogoChecked] = useState(false);
    const disabled = singleLanguage && singleLanguage.name === languageValue.name.trim() && singleLanguage.iso_code === languageValue.iso_code && singleLanguage.lang_image === imagePreviewUrl

    const handleValidation = () => {
        let errorss = {};
        let isValid = false;
        if ( !languageValue[ 'name' ].trim() && languageValue[ 'name' ].length > 20 ) {
            errorss[ 'name' ] = getFormattedMessage( "globally.input.name.validate.label" );
        } else if ( !languageValue[ 'iso_code' ] ) {
            errorss[ 'iso_code' ] = getFormattedMessage( "globally.input.iso-code.validate.label" );
        } else if ( languageValue[ 'iso_code' ] && languageValue[ 'iso_code' ].length !== 2 ) {
            errorss[ 'iso_code' ] = getFormattedMessage( 'globally.input.iso-code.character.validate.label' );
        }else if (!imagePreviewUrl) {
            errorss[ 'lang_image' ] = "Image required";
        }
         else {
            isValid = true;
        }
        setErrors( errorss );
        return isValid;
    };

    const onChangeInput = ( e ) => {
        e.preventDefault();
        setLanguageValue( inputs => ( { ...inputs, [ e.target.name ]: e.target.value } ) )
        setErrors( '' );
    };

    const prepareFormData = ( data ) => {
        const params = new URLSearchParams();
        params.append( 'name', data.name );
        params.append( 'iso_code', data.iso_code );
        if (selectImg) {
            params.append('lang_image', imagePreviewUrl);
        }
        return params;
    };
    const [defaultDate, setDefaultDate] = useState(null);
    const [selectImg, setSelectImg] = useState(null);
   
    const handleImageChange = (e) => {
        e.preventDefault();
        setDisable(false);
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.type === "image/jpeg" || file.type === "image/png") {
                setSelectImg(file);
                const fileReader = new FileReader();
                fileReader.onloadend = () => {
                    setImagePreviewUrl(fileReader.result);
                };
                if (file) {
                    fileReader.readAsDataURL(file);
                }
                setErrors("");
            }
        }
    };
   
    const onEdit = (event) => {
        event.preventDefault();
        const valid = handleValidation();
        languageValue.lang_image = selectImg;
        if (valid) {
            editSetting(prepareFormData(languageValue), true, setDefaultDate);
            setDisable(true);
        }
    };



    const onSubmit = ( event ) => {
        event.preventDefault();
        const valid = handleValidation();
        if ( singleLanguage && valid ) {
            if ( !disabled ) {
                editLanguage( singleLanguage.id, prepareFormData( languageValue ), handleClose );
                clearField( false );
            }
        } else {
            if ( valid ) {
                setLanguageValue( languageValue );
                addLanguageData( prepareFormData( languageValue ) );
                clearField( false );
            }
        }
    };

    const clearField = () => {
        setLanguageValue( {
            name: '',
            iso_code: '',
            lang_image:'',
            imagePreviewUrl:''
            
        } );
        setErrors( '' );
        handleClose( false );
    };

    return (
        <Modal show={show}
            onHide={clearField}
            keyboard={true}
        >
            <Form onKeyPress={( e ) => {
                if ( e.key === 'Enter' ) {
                    onSubmit( e )
                }
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-12 mb-3'>
                            <label
                                className='form-label'>{getFormattedMessage( "globally.input.name.label" )}: </label>
                            <span className='required' />
                            <input type='text' name='name' value={languageValue.name} maxLength={20}
                                placeholder={placeholderText( "globally.input.name.placeholder.label" )}
                                className='form-control' autoComplete='off'
                                onChange={( e ) => onChangeInput( e )} />
                            <span className='text-danger d-block fw-400 fs-small mt-2'>{errors[ 'name' ] ? errors[ 'name' ] : null}</span>
                        </div>
                        <div className='col-md-12 mb-3'>
                            <label className='form-label'>
                                {getFormattedMessage( 'react-data-table.iso-date.column.label' )}:
                            </label>
                            <span className='required' />
                            <input type='text' name='iso_code' maxLength={2} value={languageValue.iso_code}
                                placeholder={placeholderText( 'react-data-table.iso-date.column.label' )}
                                className='form-control' autoFocus={true}
                                onChange={( e ) => onChangeInput( e )} />
                            <span
                                className='text-danger d-block fw-400 fs-small mt-2'>{errors[ 'iso_code' ] ? errors[ 'iso_code' ] : null}</span>
                        </div>
                        <div className="col-lg-6 mb-3">
                                    <ImagePicker 
                                        imageTitle={placeholderText(
                                            "languages.image"
                                        )}
                                        imagePreviewUrl={
                                            imagePreviewUrl
                                                ? imagePreviewUrl
                                                : languageValue.lang_image &&
                                                languageValue.lang_image
                                        }
                                        handleImageChange={handleImageChange}
                                    />
                                <span  className='text-danger d-block fw-400 fs-small mt-2'>{errors[ 'lang_image' ] ? errors[ 'lang_image' ] : null}</span>

                                </div>
                    </div>
                </Modal.Body>
            </Form>
            <ModelFooter onEditRecord={singleLanguage} onSubmit={onSubmit} editDisabled={disabled}
                clearField={clearField} addDisabled={!languageValue.name.trim()} />
        </Modal>
    )
};

export default connect( null, { fetchLanguage, fetchLanguages, editLanguage } )( LanguageForm );
