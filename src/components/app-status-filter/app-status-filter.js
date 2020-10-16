import React, {Component} from "react";
import './app-status.filter.css'

export default class AppStatusFilter extends Component {

    state = {
        buttons : [
            {name:'all',label:'all'},
            {name:'active',label:'Important'},
            {name:'done',label:'done'},
        ]
    }


    render() {
        const {buttons} = this.state
        const { filter , updateFilter} = this.props
        const button =  buttons.map(({ name,label}) => {
            const isActive = filter === name;
            const className = isActive ? "btn btn-danger btns" : "btn btn-outline-secondary btns"
            return (
                <div key={name}>
                    <button onClick={()=>{updateFilter(name)}} className={className}>{label}</button>
                </div>
            )
        })
        return (
            <>
                {button}
            </>
        )
    }
}

