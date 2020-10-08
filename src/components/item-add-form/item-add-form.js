import React, {Component} from "react";
import './item-add-form.css'

export default class ItemAddFrom extends Component {

    state = {
        value:'',
    }


    onAddFrom = (event) => {
        event.preventDefault()
        this.props.itemAddForm(this.state.value);
        this.setState({value:''});
    }

    onChange = (e) => {
        this.setState({value:e.target.value});
    }


    render() {

        return (
           <>
            <form onSubmit={this.onAddFrom} className="d-flex d-inline-block">
                <input value={this.state.value} onChange={this.onChange} placeholder="Type New Task"
                       className="input-group-text"
                />
                <button className="btn btn-primary">Confirm</button>
            </form>
            </>
        )
    }
}