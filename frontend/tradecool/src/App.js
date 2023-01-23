import React from "react";
import "./App.css"
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./components/pages/Home";
import Overview from "./components/pages/Overview";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Chat from "./components/Chat";
import {UserTokenContextProvider} from "./context/UserTokenContext";
import Product from "./components/Product";
import EditProduct from "./components/EditProduct";


const router = createBrowserRouter([

    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path:"/home",
                element: <Home />
            },
            {
                path:"/products",
                element: <Overview />,
                children: [
                    {
                        path:"/products/:productId",
                        element: <Product />
                    },
                    {
                        path:"/products/:productId",
                        element: <Product />
                    },
                    {
                        path:"/products/add",
                        element: <EditProduct />
                    },
                    {
                        path:"/products/:productId/edit",
                        element: <EditProduct />
                    },
                ]
            },

            {
                path:"/login",
                element:<Login />
            },
            {
                path:"/register",
                element:<Register />
            },
            {
                path:"/chat/:senderId/:productId/:receiverId",
                element:<Chat />
            }
        ]
    }


])
export default function App() {
    return (
        <UserTokenContextProvider>
            <RouterProvider router={router} />
        </UserTokenContextProvider>
    );
}
