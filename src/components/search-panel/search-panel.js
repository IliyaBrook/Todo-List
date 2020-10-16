import React, {Component} from "react";
import './search-panel.css'

export default class SearchPanel extends Component {


    state = {
        value: ''
    }

    onInputValue = (e) => {
        const value = e.target.value;
        this.setState({value})
        this.props.onItemSearch(value)
    }



    render() {
        return (
            <div>
                <input className="form-control search-input"  placeholder="Type Here To Search"
                       onChange={this.onInputValue}
                 value={this.state.value}/>
            </div>
        )
    }
}

