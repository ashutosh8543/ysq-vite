import React, { useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { getFormattedMessage } from '../../shared/sharedMethod';
import { connect } from 'react-redux';

const GiftDetailModule = ({ gifts, onGiftUpdateInCart }) => {
  const [isOpenGiftDetailModal, setIsOpenGiftDetailModal] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);

  const openGiftDetailModal = () => {
    setIsOpenGiftDetailModal(!isOpenGiftDetailModal);
  };

  const onClickUpdateGiftInCart = (gift) => {
    setSelectedGift(gift);
    setIsOpenGiftDetailModal(true);
  };

  const onSaveDetailModal = () => {
    if (selectedGift) {
      onGiftUpdateInCart(selectedGift);
      openGiftDetailModal();
    }
  };

  return (
    <div>
      {gifts.map((gift) => (
        <div key={gift.id}>
          <h5>{gift.title}</h5>
          <Button onClick={() => onClickUpdateGiftInCart(gift)}>Edit Gift</Button>
        </div>
      ))}

      <Modal show={isOpenGiftDetailModal} onHide={openGiftDetailModal} className="pos-modal">
        <Modal.Header closeButton>
          <Modal.Title className="text-capitalize">{selectedGift?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicGiftName'>
              <Form.Label>{getFormattedMessage('gift.input.gift-name.label')}:</Form.Label>
              <Form.Control
                type='text'
                value={selectedGift?.title}
                onChange={(e) => setSelectedGift({ ...selectedGift, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicGiftQuantity'>
              <Form.Label>{getFormattedMessage('gift.input.gift-quantity.label')}:</Form.Label>
              <InputGroup>
                <Form.Control
                  type='number'
                  value={selectedGift?.quantity}
                  onChange={(e) => setSelectedGift({ ...selectedGift, quantity: e.target.value })}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicGiftDescription'>
              <Form.Label>{getFormattedMessage('gift.input.gift-description.label')}:</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                value={selectedGift?.description}
                onChange={(e) => setSelectedGift({ ...selectedGift, description: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={onSaveDetailModal}>
            {getFormattedMessage("globally.save-btn")}
          </Button>
          <Button variant='secondary' onClick={openGiftDetailModal}>
            {getFormattedMessage('globally.cancel-btn')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
      gifts: state.gifts
    };
  };

  export default connect(mapStateToProps, null)(GiftDetailModule);
