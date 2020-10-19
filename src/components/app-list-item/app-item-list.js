import React,{Component} from "react";
import './app-item-list.css'

export default class AppListItem extends Component {

    state = {
        duplicated:this.props.duplicated
    }


    updateDuplicateState = () => {
           setTimeout(()=>this.setState({duplicated:false}),1000)
    }
    render() {
        const {itemText ,onDelete , onToggleDone , onToggleActive , ...allProps} = this.props
        const { active , done } = allProps
        const {duplicated} = this.state
        const doneStyle = () => {
            if(duplicated) {
                return 'ifDuplicate'
            }
            else if (done) {
                return 'todo-list-item-label todo-list-item done mySpan'
            }else if (!done){
                return 'todo-list-item-label todo-list-item mySpan'
            }
        }
        let ifDuplicatedText = duplicated ? 'Duplicated!' : false

        const activeStyle =  active ? 'btn btn-outline-success btn-sm float-right active' : "btn btn-outline-success btn-sm float-right myImportant"
        return (

            <span>
                <span className={doneStyle()}
                      onClick={onToggleDone}>{itemText}
                </span>
                <span className="text-center text-danger same">{ifDuplicatedText}</span>

                    <button type="button myImportant" className={activeStyle}
                            onClick={onToggleActive}>Important</button>

                    <button type="button" className="btn btn-outline-danger btn-sm float-right myImportant"
                            onClick={onDelete}
                    >
                    <i className="fa fa-trash-o"/>Delete</button>
            </span>

        )
    }
}