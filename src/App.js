import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null);

  const handlerInputValue = (value) => {
    setTodo(value);
  }


  const create = (event) => {
    event.preventDefault()
    if (isOffline) {
      storeInLocalDb(todo)
    }
    setTodos([...todos, todo])
    setTodo("");

  }

  const isOffline = () => {
    return navigator.onLine === false
  }

  const storeInLocalDb = (todo) => {
    let todos = localStorage.getItem("todos")
    if (!todos) {
      localStorage.setItem("todos", JSON.stringify([todo]))
      return;
    }

    todos = JSON.parse(todos)
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const doneOrRemove = (index) => {
    let todos = localStorage.getItem("todos") || []
    todos = JSON.parse(todos);
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos))
    setTodos(todos);
  }
  window.Notification.requestPermission(() => {
    
  });

  return (
    <>
      <div >
         <input type="text" value={todo} onChange={(event) => handlerInputValue(event.target.value)} />
         <button type="submit" onClick={(event) => create(event)}>Save</button>
      </div>
      <ul>
        {
          todos.map((todo, index) => {
            return (
              <li>{todo} <a onClick={() => doneOrRemove(index)}>Done or Remove</a></li>
            )
          })
        }
      </ul>
    </>
  );
}

export default App;
