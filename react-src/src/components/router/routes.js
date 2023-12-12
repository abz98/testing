import App from "../App/App";
import { ProtectedRoute } from "./protectedRoute";

const publicRoutes = [
    {
        path: "/service",
        element: <div>Service Page</div>,
    },

    {
        path: "/about-us",
        element: <div>About Us</div>,
    },
];


const authenticatedRoutes = [
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                path: "/dashboard",
                element: <App/>,
            },

        ],
    },
]

export { authenticatedRoutes, publicRoutes }