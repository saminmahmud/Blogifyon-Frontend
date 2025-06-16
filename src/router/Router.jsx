import { createBrowserRouter } from "react-router";
import Root from "../pages/Root";
import Home from "../pages/Home";
import PostDetails from "../pages/PostDetails";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import Search from "../pages/Search";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import PageNotFound from "../pages/PageNotFound";
import AddPost from "../pages/AddPost";
import NotShowRoute from "../components/RestrictedRoute/NotShowRoute";
import PrivateRoute from "../components/RestrictedRoute/PrivateRoute";
import About from "../pages/About";
import Contact from "../pages/Contact";


export const Router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/about", element: <About /> },
            { path: "/contact", element: <Contact /> },
            { path: "/post/:id", element: <PostDetails /> },
            { path: "/profile/:id", element: <Profile /> }, 
            { path: "/edit-profile/:id", element: <PrivateRoute><EditProfile /></PrivateRoute> }, 
            { path: "/search", element: <Search /> },
            { path: "/add-post", element: <PrivateRoute><AddPost /></PrivateRoute> },

            { path: "/login", element: <NotShowRoute><Login /></NotShowRoute> },
            { path: "/register", element: <NotShowRoute><Register /></NotShowRoute> },
            
            { path: "*", element: <PageNotFound /> },
        ]
    }
])