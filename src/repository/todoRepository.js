const getAllTodo = () => {
    const items = localStorage.getItem("todos");
    return items ? JSON.parse(items) : [];
}

const saveTodo = (todo = {}) => {
    localStorage.setItem("todos", JSON.stringify([...getAllTodo(), todo]));
}

const saveAllTodo = (todos = []) => {
    localStorage.setItem("todos", JSON.stringify(todos));
}

export {getAllTodo, saveTodo, saveAllTodo}