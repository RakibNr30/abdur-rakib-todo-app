import {create} from "zustand";
import {saveAllTodo, saveTodo} from "../repository/todoRepository";

const useTodoStore = create((set, get) => ({
    todos: [],
    getAllTodoFromStore: () => get().todos,
    addTodoToStore: (todo = {}) => set((state) => {
        saveTodo(todo);
        return {
            todos: [...state.todos, todo]
        }
    }),
    addAllTodoToStore: (todolist = []) => set(() => {
        saveAllTodo(todolist);
        return {
            todos: todolist
        }
    })
}));

export default useTodoStore;