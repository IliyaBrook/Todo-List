import React from "react";
import './app-header.css'

const AppHeader = ({doneCounter, listItemsCounter}) => {



    return (
        <div className="app-header d-flex card-header">
            <h1 className="header font-italic font-weight-bold">Todo List</h1>
            <h2 className="header2">  {listItemsCounter} more to do, {doneCounter} done</h2>
        </div>
    )
}
export default AppHeader;