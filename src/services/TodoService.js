import useStorageStore from "../stores/storageStore";
import * as storages from "../constants/storages";

const TodoService = () => {
    const KEY = 'todos';
    const storage = useStorageStore.getState().storage;

    const getAllTodo = () => {
        if (storage === storages.TYPE.LOCAL) {
            const items = localStorage.getItem(KEY);
            return items ? JSON.parse(items) : [];
        } else {
            return [];
        }
    };

    const getTodo = (id) => {
        if (storage === storages.TYPE.LOCAL) {
            return getAllTodo().find((todo) => todo.id === id);
        } else {
            return {};
        }
    };

    const saveTodo = (todo = {}) => {
        if (storage === storages.TYPE.LOCAL) {
            localStorage.setItem(KEY, JSON.stringify([...getAllTodo(), todo]));
        }
    };

    const saveAllTodo = (todos = []) => {
        if (storage === storages.TYPE.LOCAL) {
            localStorage.setItem(KEY, JSON.stringify(todos));
        }
    };

    return {getAllTodo, getTodo, saveTodo, saveAllTodo};
};

export default TodoService;
