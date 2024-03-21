import {createContext, useContext, useEffect, useState} from "react";
import TodoService from "../services/TodoService";
import moment from "moment/moment";

const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    const todoService = TodoService();

    const [todos, setTodos] = useState([]);
    const [overdueTodos, setOverdueTodos] = useState([]);

    useEffect(() => {
        setTodos(todoService.findAllByDate(moment(), false));
        setOverdueTodos(todoService.findAllOverdueByDate(moment()));
    }, []);

    const addTodo = (todo) => {
        todoService.save(todo);
        setTodos(todoService.findAllByDate(moment(), false))
        setOverdueTodos(todoService.findAllOverdueByDate(moment()));
    }

    const updateTodo = (todo) => {
        todoService.update(todo);
        setTodos(todoService.findAllByDate(moment(), false))
        setOverdueTodos(todoService.findAllOverdueByDate(moment()));
    }

    return (
        <GlobalContext.Provider value={{todos, overdueTodos, addTodo, updateTodo}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);