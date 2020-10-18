import React, {Component} from "react";
import './app.save.css'
import {Button, Modal} from 'react-bootstrap';

export default class AppSave extends Component {

    state = {
        modalSave: false,
        modalLoad: false,
        modalSaveValue: '',
        allLists: []
    }

    onSave = (listName) => {
        const {listItemSave} = this.props
        localStorage.setItem(`${listName}`, listItemSave())
        this.setState({modalSaveValue: ''})
    }


    modalSaveShow = () => {
        this.setState({modalSave: !this.state.modalSave})

    }
    modalLoadShow = () => {
        this.setState({modalLoad: !this.state.modalLoad})
    }

    modalSaveValueChange = (e) => {
        this.setState({modalSaveValue: e.target.value})
    }
    submitList = (e) => {
        const {modalSaveValue} = this.state
        this.onSave(modalSaveValue)
        this.setState({modalSaveInput: ''})
        e.preventDefault()
    }

    clearAllList = () => {
        localStorage.clear()
    }


    chooseList = (e) => {
        const id = e.target.id
        console.log(id)
        const {listItemLoad} = this.props
        console.log(JSON.parse(localStorage.getItem(id)))
        return listItemLoad(JSON.parse(localStorage.getItem(id)))
    }

    allListsName() {
        let key = Object.keys(localStorage);
        let id = 0
        return key.map((keys) => {
            id++
            return (
                <li onClick={this.chooseList} className="list-group-item myList"
                    key={id} id={keys}>
                    {keys}
                </li>
            )
        })
    }

    render() {
        const {modalSave, modalSaveValue, modalLoad} = this.state
        return (
            <div className='savePanel'>
                <div className="modalBtn d-flex justify-content-between">
                    <Button onClick={this.modalSaveShow} className="btn myBtn">Save List</Button>
                    <Button onClick={this.modalLoadShow} className="btn myBtn">Load List</Button>
                    <button className="btn btn-danger myBtn" onClick={this.clearAllList}>Clear all lists</button>
                </div>

                <Modal show={modalSave} onHide={this.modalSaveShow}>
                    <form onSubmit={this.submitList}>
                        <Modal.Header closeButton onClick={this.modalSaveShow}>
                            <Modal.Title>Save List</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>List Name:
                            <input type="text" value={modalSaveValue} onChange={this.modalSaveValueChange}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.modalSaveShow}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" onClick={this.modalSaveShow}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>

                <Modal show={modalLoad} onHide={this.modalLoadShow}>
                    <Modal.Header closeButton onClick={this.modalLoadShow}>
                        <Modal.Title>Load List</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <ul className="list-group">
                                {this.allListsName()}
                            </ul>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.modalLoadShow}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}