import maps from "../constants/maps";
import useTodoStore from "../stores/todoStore";
import moment from "moment";

const TodoService = () => {

    const {
        getAllTodoFromStore,
        addTodoToStore,
        addAllTodoToStore,
        updateTodoToStore,
        deleteTodoFromStore
    } = useTodoStore();

    const findAll = () => {
        return getAllTodoFromStore();
    }

    const findAllByStatus = (status) => {
        return getAllTodoFromStore().filter((item) => item.status === status);
    }

    const findAllOverdueByDate = (date) => {
        return getAllTodoFromStore().filter((item) => {
            const overdueDate = date.startOf('day');
            return moment(item.end_time).isSame(overdueDate, 'day') && moment(item.end_time).isBefore(moment());
        });
    }

    const findAllOverdueUntilDate = (date) => {
        return getAllTodoFromStore().filter((item) => {
            return moment(item.end_time).isBefore(date, 'day');
        });
    }

    const findAllByDate = (date, withOverdue = true) => {
        const now = moment();
        return getAllTodoFromStore().filter((item) => {
            return moment(item.end_time).isSame(date, 'day') &&
                (withOverdue ? true : moment(item.end_time).isAfter(now));
        });
    }

    const findAllUpcoming = (sortField, sortDirection) => {
        const now = moment();
        const groupedTodos = getAllTodoFromStore().reduce((acc, item) => {
            const endTimeDate = moment(item.end_time).startOf('day');
            if (moment(item.end_time).isAfter(now)) {
                acc[endTimeDate] = acc[endTimeDate] || [];
                acc[endTimeDate].push(item);
            }
            return acc;
        }, {});

        const next7Days = Array.from({ length: 7 }, (_, i) => moment().add(i, 'days').startOf('day'));

        next7Days.forEach(date => {
            if (!groupedTodos[date]) {
                groupedTodos[date] = [];
            }
        });

        const sortedTodos = Object.entries(groupedTodos).map(([date, todos]) => ({
            date,
            todos
        })).sort((a, b) => moment(a.date).diff(moment(b.date)));

        if (sortField && sortDirection) {
            return sortedTodos.map(group => ({
                ...group,
                todos: sort(sortField, sortDirection, group.todos)
            }));
        }

        return sortedTodos;
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

    const search = (query = "", todos = null) => {
        const items = todos === null ? getAllTodoFromStore() : todos;

        return items.filter((todo) =>
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

    const sort = (field, direction, todos = null) => {
        const items = todos === null ? getAllTodoFromStore() : todos;

        return items.sort((a, b) => {
            const aFieldValue = a[field];
            const bFieldValue = b[field];
            if (aFieldValue < bFieldValue) return direction === 'asc' ? -1 : 1;
            if (aFieldValue > bFieldValue) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    }

    return {
        findAll,
        findAllByStatus,
        findAllByDate,
        findAllOverdueByDate,
        findAllOverdueUntilDate,
        findAllUpcoming,
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
