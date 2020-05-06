import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControl from 'react-bootstrap/FormControl';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import "./AddRecords.css";
import { SAVE_OR_MODIFY } from './actions/wod';
import { OPEN_MODAL, CLOSE_MODAL, UPDATE_DATE, UPDATE_TYPE, UPDATE_TIME, UPDATE_METCON, UPDATE_RESULT, UPDATE_COMMENT, RESET_ALL } from './actions/modal';

function AddRecord({id, show, date, wodType, time, metcon, result,
    comment, openModal, closeModal, updateDate, updateType, updateTime, updateMetcon, updateResult, updateComment, saveOrUpdate, clearModal}) {
    return (
        <>
            <Button variant="dark" className="float-right" onClick={openModal}>+</Button>

            <Modal show={show} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>New record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup size="sm" className="mb-4">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Date</InputGroup.Text>
                        </InputGroup.Prepend>
                        <DatePicker
                            dateFormat={'dd/MM/yyyy'}
                            selected={date}
                            onSelect={date => updateDate(date)} />
                    </InputGroup>
                    <div class="row">
                        <div class="col">
                            <InputGroup size="sm" className="mb-4">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-sm">Wod type</InputGroup.Text>
                                </InputGroup.Prepend>
                                <DropdownButton
                                    as={InputGroup.Append}
                                    variant="outline-secondary"
                                    title={wodType}
                                    id="input-group-dropdown-2"
                                    onSelect={wodType => updateType(wodType)}>
                                    <Dropdown.Item eventKey='AMRAP'>Select ..</Dropdown.Item>
                                    <Dropdown.Item eventKey='AMRAP'>AMRAP</Dropdown.Item>
                                    <Dropdown.Item eventKey='For time'>For time</Dropdown.Item>
                                </DropdownButton>
                            </InputGroup>
                        </div>
                        <div class="col">
                            <InputGroup size="sm" className="mb-4">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-sm">Time</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={time} onChange={time => { updateTime(time.target.value) }} />
                            </InputGroup>
                        </div>
                    </div>
                    <InputGroup size="sm" className="mb-4">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Metcon</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl as="textarea" aria-label="With textarea" style={{ maxHeight: "10%" }} value={metcon} onChange={metcon => updateMetcon(metcon.target.value)} />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-4">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroup-sizing-sm">Result</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" value={result} onChange={result => updateResult(result.target.value)} />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-4">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Comment</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl as="textarea" aria-label="With textarea" style={{ maxHeight: "10%" }} value={comment} onChange={comment => updateComment(comment.target.value)} />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
            </Button>
                    <Button variant="primary" onClick={() => {
                        (typeof(id) === 'undefined' ?
                        saveOrUpdate({date: date, wodType: wodType, time: time, metcon: metcon, result: result, comment: comment })
                        : saveOrUpdate({id: id, date: date, wodType: wodType, time: time, metcon: metcon, result: result, comment: comment }))
                        closeModal()
                        clearModal()
                    }}>
                        Save
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        id: state.modalReducer.id,
        show: state.modalReducer.show,
        date: state.modalReducer.date,
        wodType: state.modalReducer.wodType,
        time: state.modalReducer.time,
        metcon: state.modalReducer.metcon,
        result: state.modalReducer.result,
        comment: state.modalReducer.comment
    }
}

const mapDispatchtoProps = (dispatch) => ({
    openModal: (item) => dispatch({ type: OPEN_MODAL, item: item }),
    closeModal: () => dispatch({ type: CLOSE_MODAL }),
    clearModal: () => dispatch({ type: RESET_ALL }),
    updateDate: (date) => dispatch({ type: UPDATE_DATE, date: date }),
    updateType: (wodType) => dispatch({ type: UPDATE_TYPE, wodType: wodType }),
    updateTime: (time) => dispatch({ type: UPDATE_TIME, time: time }),
    updateMetcon: (metcon) => dispatch({ type: UPDATE_METCON, metcon: metcon }),
    updateComment: (comment) => dispatch({ type: UPDATE_COMMENT, comment: comment }),
    updateResult: (result) => dispatch({ type: UPDATE_RESULT, result: result }),

    saveOrUpdate: (item) => dispatch({ type: SAVE_OR_MODIFY, item: item }),

})
export default connect(mapStateToProps, mapDispatchtoProps)(AddRecord)