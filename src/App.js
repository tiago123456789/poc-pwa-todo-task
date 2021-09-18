import { useEffect, useState } from 'react';
import todoService from "./services/Todo"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NewTodo from './components/NewTodo';
import ListTodo from './components/ListTodo';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState(null);

  const handlerInputValue = (value) => {
    setTodo(value);
  }

  const create = (event) => {
    event.preventDefault()
    todoService.create(todo);
    setTodos([...todos, todo])
    setTodo("");
  }

  const doneOrRemove = (index) => {
    const todos = todoService.deleteOrDone(index);
    setTodos(todos);
  }

  useEffect(() => {
    let todos = todoService.getAll();
    setTodos(todos);
  }, [])

  return (
    <>
      <div >
        <NewTodo handlerInputValue={handlerInputValue} todo={todo} create={create} />
      </div>
      <ListTodo todos={todos} doneOrRemove={doneOrRemove} />
    </>
  );
}

export default App;
