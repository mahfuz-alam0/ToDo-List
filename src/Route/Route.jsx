import { createBrowserRouter } from "react-router-dom";
import Home from "../Home/Home";
import Main from "../Main/Main";
import Create from "../Pages/Create/Create";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Signup/SignUp";
import Update from "../Pages/Update/Update";
import View from "../Pages/View/View";
import Private from "../Private/Private";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/signup",
            element: <SignUp />
        },
        {
            path: "/home",
            element: <Main />,
            children: [
                {
                    path: '/home',
                    element: <Home/>
                },
                {
                    path: '/home/create',
                    element: <Private><Create/></Private>
                },
                {
                    path: '/home/view',
                    element: <Private><View/></Private>
                },
                {
                    path: '/home/update',
                    element: <Private><Update/></Private>
                },
            ]
        }
    ]
)