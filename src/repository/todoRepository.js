const KEY = "todos"

const getAllTodo = () => {
    const items = localStorage.getItem(KEY);
    return items ? JSON.parse(items) : [];
}

const saveTodo = (todo = {}) => {
    localStorage.setItem(KEY, JSON.stringify([...getAllTodo(), todo]));
}

const saveAllTodo = (todos = []) => {
    localStorage.setItem(KEY, JSON.stringify(todos));
}

export {getAllTodo, saveTodo, saveAllTodo}