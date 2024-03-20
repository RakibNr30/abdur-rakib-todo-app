import React from "react";
import {createBrowserRouter} from "react-router-dom";
import HomeIndex from "./pages/home/HomeIndex";
import AboutIndex from "./pages/about/AboutIndex";
import TodoIndex from "./pages/todo/TodoIndex";
import TodoView from "./pages/todo/TodoView";
import Error404 from "./pages/error/Error404";
import TodoToday from "./pages/todo/TodoToday";
import TodoUpcoming from "./pages/todo/TodoUpcoming";
import TodoCompleted from "./pages/todo/TodoCompleted";
import TodoExpired from "./pages/todo/TodoExpired";

export const routes = createBrowserRouter([
    {
        path: "*",
        element: <Error404 />
    },
    {
        path: "/",
        element: <HomeIndex />
    },
    {
        path: "/about",
        element: <AboutIndex />
    },
    {
        path: "/todo",
        element: <TodoIndex />
    },
    {
        path: "/todo/:id",
        element: <TodoView />
    },
    {
        path: "/app/today",
        element: <TodoToday />
    },
    {
        path: "/app/upcoming",
        element: <TodoUpcoming />
    },
    {
        path: "/app/completed",
        element: <TodoCompleted />
    },
    {
        path: "/app/expired",
        element: <TodoExpired />
    }
]);