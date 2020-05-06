import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FaPen } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import {connect} from 'react-redux';
import {REMOVE_WOD} from '../actions/wod';
import {OPEN_MODAL} from '../actions/modal'

function RecordsComponent({wods, openModal, removeItem}) {
    return (
        <Table striped hover response variant="dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Time</th>
                    <th>Metcon</th>
                    <th>Result</th>
                    <th>Comment</th>
                    <th style={{width: "15%"}}></th>
                </tr>
            </thead>
            <tbody>
                {wods && wods.map((w, i) =>
                    <tr key={i}>
                        <td>{w.id}</td>
                        <td>{w.date.toLocaleDateString("fr-FR")}</td>
                        <td>{w.wodType}</td>
                        <td>{w.time}</td>
                        <td>{w.metcon}</td>
                        <td>{w.result}</td>
                        <td>{w.comment}</td>
                        <td>
                            <div className="row">
                                <div className="col">
                                    <Button variant="outline-info" onClick={() => openModal(w)}><FaPen /></Button>
                                </div>
                                <div className="col">
                                    <Button variant="outline-danger" onClick={() => removeItem(w)}><FaTrash /></Button>
                                </div>
                            </div>
                        </td>
                    </tr>
                )
                }
            </tbody>
        </Table>
    );
}

RecordsComponent.propTypes = {
    date: PropTypes.any,
    wodType: PropTypes.string,
    time: PropTypes.string,
    metcon: PropTypes.string,
    result: PropTypes.string,
    comment: PropTypes.string
};

const mapStatetoProps = (state) => {
    return {
        wods: state.wodReducer.wods
    }
}

const openModalForEdition = (item) => {
    item['edition'] = true;
    return {type: OPEN_MODAL, item: item}
}

const mapDispatchToProps = (dispatch) => ({
    openModal: item => dispatch(openModalForEdition(item)),
    removeItem: item => dispatch({type: REMOVE_WOD, item: item})
})
export default connect(mapStatetoProps, mapDispatchToProps)(RecordsComponent);