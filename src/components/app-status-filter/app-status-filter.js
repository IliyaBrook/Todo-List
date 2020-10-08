import React, {Component} from "react";
import './app-status.filter.css'

export default class AppStatusFilter extends Component {

    state = {
        buttons : [
            {name:'all',label:'all'},
            {name:'active',label:'active'},
            {name:'done',label:'done'},
        ]
    }


    render() {
        const {buttons} = this.state
        const { filter , updateFilter} = this.props
        const button =  buttons.map(({ name}) => {
            const isActive = filter === name;
            const className = isActive ? "btn btn-danger" : "btn btn-outline-secondary"
            return (
                <div key={name}>
                    <button onClick={()=>{updateFilter(name)}} className={className}>{name}</button>
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

