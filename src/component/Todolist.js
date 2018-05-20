import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Todolist.css';

class Todolist extends Component {

    constructor(props) {
        super(props);
        this.state = {todotext: ''};
    }

    getListItem() {
        let list = [];
        for(let i = 0; i < this.props.list.length; i += 1) {
            list[i] = <li key={i} onClick={this.props.markTask} id={i} 
                    className={(this.props.list[i].status === 'active') ? 'task-active' : 'task-complete'}>{this.props.list[i].task}</li>
        }
        return list;
    }

    render() {
        let list = <li></li>;
        console.log(this.props.list);
        if(Array.isArray(this.props.list)) {
            list = this.getListItem();
        }
        return(
             <React.Fragment>
                <div className="add-todo-wrapper">
                    <input type="text" value={this.state.todotext} onChange={this.changeTodoText.bind(this)} name="todotext" id="todotext"/>
                    <button type="button" onClick={this.addTasktoList.bind(this)}>Add Task</button>
                </div>
                <div className="todo-list-wrapper">
                    <ul className="todo-list">
                        {list}
                    </ul>
                    <button type="button" onClick={this.props.fetchTodo}>All</button>
                    <button type="button" onClick={this.props.fetchTodoComplete}>Complete</button>
                    <button type="button" onClick={this.props.fetchTodoActive}>Active</button> 
                </div>
             </React.Fragment>
        );
        
        //return (<div className="text-center">...Loading</div>);
    }
    componentDidMount() {
        console.log('In componentDidMount!!');
        this.props.fetchTodo();
    }

    changeTodoText(event) {
        this.setState({
            todotext: event.target.value.trim()
        });

        console.log('this.state.todotext: ', this.state.todotext);
    }
    
    addTasktoList() {
        this.props.addTodo(this.state.todotext);
        this.setState({
            todotext: ''
        })
        // this.state.todotext = '';
        document.getElementById('todotext').focus();

    }
}

const mapStateToProps = (state) => ({
    list: state.list
});


const mapDispatchToProps = (dispatch) => ({

     addTodo: (todotext) => {
         dispatch({
             type: 'ADD_TODO',
             payload: {
                 task: todotext,
                 status: 'active',
             },
         });
     },

    fetchTodo: () => {
        dispatch({
            type: 'FETCH_TODO_ALL'
        });        
    },

    fetchTodoActive: () => {
        dispatch({
            type: 'FETCH_TODO_ACTIVE'
        });
    },

    fetchTodoComplete: () => {
        dispatch({
            type: 'FETCH_TODO_COMPLETE'
        });
    },

    markTask: (event) => {

        if(event.target.className === 'task-active'){
            event.target.className = 'task-complete';
        }
        else{
            event.target.className = 'task-active';
        }
        
        dispatch({
            type: 'MARK_TASK',
            payload: event.target.id
        });
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);