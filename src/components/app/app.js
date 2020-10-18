import React, {Component} from "react";
import './app.css'


import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import AppList from "../app-list";
import AppStatusFilter from "../app-status-filter";
import ItemAddFrom from "../item-add-form";
import AppSave from "../app-save/app-save";

export default class App extends Component {
    maxId = 100
    state = {
        listItems: [
            this.createItems('Go to Work'),
            this.createItems('Learn Js'),
            this.createItems('Learn React'),
        ],
        searchState: '',
        filter:'',
        ifAddFormEmpty:''
    }
    componentWillUnmount() {
        this.clearEmptyText(false)
    }

    clearEmptyText (mounted = true) {
        if(mounted) {
        setTimeout(()=>{
            this.setState(({ifAddFormEmpty:''}))
        },5000)
        }
    }

    listItemSave = () => {
        return   JSON.stringify(this.state.listItems);
    }


    listItemLoad = (loadedList) => {
        this.setState(()=> {
            return {
                listItems:loadedList
            }
        })
    }

    updateFilter = (filter) => {
        this.setState(({filter}))
    }

    filterItems(items,filter) {
        switch (filter) {
            case 'all' :
                return items
            case 'active':
                return items.filter(arr => arr.active)
            case 'done':
                return items.filter(arr => arr.done)
            default:
                return items
        }
    }


    search(items, text) {
        if (text === '') {
            return items;
        }
        return items.filter((el) => {
            return el.itemText.match(text);
        })

    }

    searchStateUpdate = (searchState) => {
        this.setState({searchState})
    }




     itemAddForm = (text) => {

        this.setState(({listItems,ifAddFormEmpty}) => {
            this.clearEmptyText();
            const newArray = [...listItems, this.createItems(text)]
            if(text === ''){
                console.log(ifAddFormEmpty)
                return {
                    listItems,
                    ifAddFormEmpty:'Input text cannot be empty'
                }
            }
            else if (listItems.some(item => item.itemText === text)){
                const newDuplicateTrue = [...listItems,this.createItems(text,true)]
                return {
                    listItems:newDuplicateTrue,
                }
            }
            else {
                return {
                    listItems: newArray,
                    ifAddFormEmpty:''
                }
            }
        })
    }

    forToggleActiveDone = (itemState, id, propInObj) => {
        const idx = this.findItems(itemState, id);
        const olbObj = itemState[idx]
        const newObj = {...olbObj, [propInObj]: !olbObj[propInObj]}
        const before = [...itemState.slice(0, idx)]
        const after = [...itemState.slice(idx + 1)]
        return [...before, newObj, ...after]
    }

    onToggleActive = (id) => {
        this.setState(({listItems}) => {
            return {
                listItems: this.forToggleActiveDone(listItems, id, 'active')
            }
        })
    }

    onToggleDone = (id) => {
        this.setState(({listItems}) => {
            return {
                listItems: this.forToggleActiveDone(listItems, id, 'done')
            }
        })
    }

    createItems(itemText,duplicated = false) {
        return {
            itemText,
            active: false,
            done: false,
            id: this.maxId++,
            duplicated,
        }
    }


    findItems(data, id) {
        return data.findIndex((el) => el.id === id);
    }

    deleteItem = (id) => {
        this.setState(({listItems}) => {
            const idx = this.findItems(listItems, id);
            const newArray = [...listItems.slice(0, idx), ...listItems.slice(idx + 1)]
            return {
                listItems: newArray
            }
        })
    }


    render() {

        let done = 0
        const {listItems, searchState , filter } = this.state
        listItems.forEach((item) => {
            if (item.done) {
                done++
            }
        })
        const listItemsCounter = listItems.length;
        const isVisible = this.filterItems(this.search(listItems, searchState),filter);
        return (
            <div className="todo-app">
                <AppSave listItemSave={this.listItemSave}
                         listItemLoad={this.listItemLoad}
                />

                <AppHeader
                    doneCounter={done}
                    listItemsCounter={listItemsCounter}
                />
                <div className="search-panel d-sm-flex">

                    <SearchPanel
                        onItemSearch={this.searchStateUpdate}
                    />
                    <AppStatusFilter filter={filter}
                    updateFilter={this.updateFilter}
                    />
                </div>
                <AppList itemsListState={isVisible}
                         onDelete={this.deleteItem}
                         onToggleActive={this.onToggleActive}
                         onToggleDone={this.onToggleDone}
                         duplicateItemList={this.duplicateItemList}
                />
                <ItemAddFrom itemAddForm={this.itemAddForm} filterSameItems={this.filterSameItems}
                />
                <h4 className="text-center text-danger">{this.state.ifAddFormEmpty}</h4>
            </div>
        )
    }
}