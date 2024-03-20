import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";
import moment from "moment/moment";

const useTodoStore = create(
    persist((set, get) => ({
            todos: [],
            getAllTodoFromStore: () => get().todos,
            getAllTodoByDateFromStore: (date) => get().todos.filter((item) => {
                return moment(item.end_time).isSame(date, "day");
            }),
            addTodoToStore: (todo = {}) => set((state) => {
                return {
                    todos: [...state.todos, todo],
                }
            }),
            addAllTodoToStore: (todolist = []) => set(() => {
                return {
                    todos: todolist,
                }
            }),
            updateTodoToStore: (todo = {}) => set((state) => {
                const existingTodoIndex = state.todos.findIndex((item) => item.id === todo.id);
                if (existingTodoIndex !== -1) {
                    const updatedTodos = [...state.todos];
                    updatedTodos[existingTodoIndex] = todo;
                    return {
                        todos: updatedTodos,
                    };
                } else {
                    return state;
                }
            }),
            deleteTodoFromStore: (id) => set((state) => {
                const remainingTodos = state.todos.filter((item) => item.id !== id);
                return {
                    todos: remainingTodos,
                };
            }),
        }),
        {
            name: "todos",
            storage: createJSONStorage(() => localStorage)
        }
    )
)

export default useTodoStore;