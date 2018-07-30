import React, { Component } from 'react';
import { observable, computed, action } from 'mobx';
import {observer} from 'mobx-react';
//import Button from 'antd/lib/button';
import { Button } from 'antd';
// import './App.css';

// class Todo {
//     id = Math.random();
//     @observable title = "";
//     @observable finished = false;
// }


// class ToDoList {
//   @observable todos = [];
//   @computed get unfinishedTodoCount() {
//     return this.todos.filter(todo => !todo.finishd).length;
//   }
// }


// @observer
// class ToDoListView extends Component {
//   render() {
//     return (
//       <div>
//         <ul>
//           {this.props.todoList.todos.map(todo => <ToDoView todo={todo} key={todo.id} />)}
//         </ul>
//         Tasks left: {this.props.todoList.unfinishedTodoCount}
//       </div>
//     );
//   }
// }

// const ToDoView = observer(({todo}) =>
//     <li>
//       <input
//         type="checkbox"
//         checked={todo.finished}
//         onClick={() => todo.finished = !todo.finished}
//       />{todo.title}
//     </li>
//   );


// const store = new ToDoList();

// store.todos.push(
//   new Todo('Learning'),
//   new Todo('Sleeping')
// );

// store.todos[0].finished = true;


// export default ToDoListView;
