import {create} from "zustand";
import {saveAllTodo, saveTodo} from "../repository/todoRepository";
import maps from "../constants/maps";

const useTodoStore = create((set, get) => ({
    todos: [],
    clonedTodos: [],
    getAllTodoFromStore: () => get().todos,
    addTodoToStore: (todo = {}) => set((state) => {
        saveTodo(todo);
        return {
            todos: [...state.todos, todo],
            clonedTodos: [...state.clonedTodos, todo],
        }
    }),
    addAllTodoToStore: (todolist = []) => set(() => {
        saveAllTodo(todolist);
        return {
            todos: todolist,
            clonedTodos: todolist,
        }
    }),
    searchTodos: (query) =>
        set((state) => ({
            todos: state.clonedTodos.filter((todo) =>
                Object.entries(todo).some(([key, value]) => {
                        if (typeof value === "string") {
                            return value.toLowerCase().includes(query.toLowerCase());
                        } else if (typeof value === "number") {
                            const mappedObject = maps[key];
                            return mappedObject && mappedObject[value].toLowerCase().includes(query.toLowerCase());
                        }
                        return false;
                    }
                )
            ),
        })),
}));

export default useTodoStore;