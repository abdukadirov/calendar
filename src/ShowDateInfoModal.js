import React from 'react';
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';

const ShowDateInfoModal = props => {
    console.log(props.dayInfo)
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>You clicked:</strong> {props.dayInfo.month}&nbsp;{props.dayInfo.day}</p>
                    <p><strong>Color:</strong> {props.dayInfo.color}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ShowDateInfoModal;