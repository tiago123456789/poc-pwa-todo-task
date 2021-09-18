export default {

    getAll() {
        let todos = localStorage.getItem("todos")
        if (!todos) {
            todos = [];
        }
        return JSON.parse(todos)
    },

    create(todo) {
        let todos = localStorage.getItem("todos")
        if (!todos) {
          localStorage.setItem("todos", JSON.stringify([todo]))
          return;
        }
    
        todos = JSON.parse(todos)
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos))
    },

    deleteOrDone(index) {
        let todos = localStorage.getItem("todos") || []
        todos = JSON.parse(todos);
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos))
        return todos
    }
}