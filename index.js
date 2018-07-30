import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { observable, computed, action, autorun } from 'mobx';
import {observer} from 'mobx-react';

// let appState1 = observable({
//   timer: 0
// });
// console.log(appState1.timer);


// class Todo {
//     id = Math.random();
//     @observable title = "";
//     @observable finished = false;

//     constructor(title) {
//       this.title = title;
//     }
// }


// class ToDoList {
//   @observable todos = [];
//   @computed get unfinishedTodoCount() {
//     return this.todos.filter(todo => !todo.finished).length;
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
// );


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


// const store = new ToDoList();

// store.todos.push(
//   new Todo('Learning'),
//   new Todo('Sleeping')
// );

// store.todos[0].finished = true;


// ReactDOM.render(<ToDoListView todoList={store} />, document.getElementById('root'));


var todoStore = observable({
  todos: [],

  get completedCount() {
    return this.todos.filter(todo => todo.completed).length;
  }

});

autorun(function() {
  console.log("Completed %d of %d items",
    todoStore.completedCount,
    todoStore.todos.length
  );
});

todoStore.todos.push({
  tile: "take a break",
  completed: false
});

todoStore.todos.push({
  tile: "sleeping",
  completed: false
});

todoStore.todos[0].completed = true;


