import maps from "../constants/maps";
import useTodoStore from "../stores/todoStore";

const TodoService = () => {

    const {getAllTodoFromStore, getAllTodoByDateFromStore, addTodoToStore, addAllTodoToStore, updateTodoToStore, deleteTodoFromStore} = useTodoStore();

    const findAll = () => {
        return getAllTodoFromStore();
    }

    const findAllByDate = (date) => {
        return getAllTodoByDateFromStore(date);
    }

    const save = (todo = {}) => {
        addTodoToStore(todo);
    }

    const saveAll = (todos = []) => {
        addAllTodoToStore(todos);
    }

    const find = (id) => {
        return getAllTodoFromStore().find((todo) => todo.id === id);
    }

    const update = (todo = {}) => {
        updateTodoToStore(todo);
    }

    const destroy = (id) => {
        deleteTodoFromStore(id);
    }

    const search = (query = "") => {
        return getAllTodoFromStore().filter((todo) =>
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
        );
    };

    const sort = (field, direction) => {
        return getAllTodoFromStore().sort((a, b) => {
            const aFieldValue = a[field];
            const bFieldValue = b[field];
            if (aFieldValue < bFieldValue) return direction === 'asc' ? -1 : 1;
            if (aFieldValue > bFieldValue) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    }

    return {
        findAll,
        findAllByDate,
        save,
        saveAll,
        update,
        destroy,
        find,
        search,
        sort
    };
};

export default TodoService;
