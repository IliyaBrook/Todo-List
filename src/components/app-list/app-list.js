import React from "react";
import './app-list.css';
import AppListItem from "../app-list-item";

const AppList = ({itemsListState,onDelete , onToggleActive , onToggleDone }) => {
    const allList = itemsListState.map((items) =>{
        const {id , ...allProps} = items


        return (

            <div key={id} className='m-1'>
                <li className="list-group-item">
                    <ul className="todo-list list-group">
                        <AppListItem {...allProps}
                                     onDelete={()=>{onDelete(id)}}
                                     onToggleActive={()=>{onToggleActive(id)}}
                                     onToggleDone={()=>{onToggleDone(id)}}
                        />
                    </ul>
                </li>
            </div>

        )
    })

    return <div>{allList}</div>
}
export default AppList;