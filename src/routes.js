import React from "react";
import {createBrowserRouter} from "react-router-dom";
import HomeIndex from "./pages/home/HomeIndex";
import AboutIndex from "./pages/about/AboutIndex";
import TodoIndex from "./pages/todo/TodoIndex";
import TodoView from "./pages/todo/TodoView";
import Error404 from "./pages/error/Error404";

export const routes = createBrowserRouter([
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
        path: "*",
        element: <Error404 />
    }
]);