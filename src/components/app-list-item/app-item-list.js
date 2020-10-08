import React from "react";
import './app-item-list.css'


const AppListItem = ({ itemText ,onDelete , onToggleDone , onToggleActive , ...allProps}) =>  {
    const { active , done } = allProps
        const doneStyle =  done ? 'todo-list-item-label todo-list-item done' : "todo-list-item-label todo-list-item"
        const activeStyle =  active ? 'btn btn-outline-success btn-sm float-right active' : "btn btn-outline-success btn-sm float-right"
        return(
            <span>
                <span className={doneStyle}
                onClick={onToggleDone}>{itemText}</span>

                    <button type="button" className={activeStyle}
                    onClick={onToggleActive}
                    >
                    <i className="fa fa-exclamation"/>Active</button>

                    <button type="button" className="btn btn-outline-danger btn-sm float-right"
                      onClick={onDelete}
                    >
                    <i className="fa fa-trash-o"/>Delete</button>
            </span>
        )
}

export default AppListItem;