import {createBrowserRouter} from "react-router-dom";
import Home from "./pages/home/HomeIndex";
import About from "./pages/about/AboutIndex";
import Todo from "./pages/todo/TodoIndex";
import React from "react";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/about",
        element: <About />
    },
    {
        path: "/todo",
        element: <Todo />
    }
]);