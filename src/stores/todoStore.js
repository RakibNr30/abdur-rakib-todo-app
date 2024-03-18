import {create} from "zustand";
import TodoService from "../services/TodoService";
import maps from "../constants/maps";

const useTodoStore = create((set, get) => {
    const todoService = TodoService();

    return {
        todos: [],
        clonedTodos: [],
        getAllTodoFromStore: () => get().todos,
        addTodoToStore: (todo = {}) => set((state) => {
            todoService.saveTodo(todo);
            return {
                todos: [...state.todos, todo],
                clonedTodos: [...state.clonedTodos, todo],
            }
        }),
        addAllTodoToStore: (todolist = []) => set(() => {
            todoService.saveAllTodo(todolist);
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
                                return mappedObject[value] && mappedObject[value].toLowerCase().includes(query.toLowerCase());
                            }
                            return false;
                        }
                    )
                ),
            })),
        sortTodos: (field, direction) =>
            set((state) => {
                const sortedTodos = [...state.todos].sort((a, b) => {
                    const aFieldValue = a[field];
                    const bFieldValue = b[field];
                    if (aFieldValue < bFieldValue) return direction === 'asc' ? -1 : 1;
                    if (aFieldValue > bFieldValue) return direction === 'asc' ? 1 : -1;
                    return 0;
                });
                return {todos: sortedTodos};
            }),
    }
});

export default useTodoStore;