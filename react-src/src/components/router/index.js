import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { authenticatedRoutes, publicRoutes } from "./routes";
import { useAuth } from "../../provider/userContext";
import LoginForm from "../Login";
import RegisterForm from "../Register";


const Routes = () => {
    const { token } = useAuth();


    const routesForNotAuthenticatedOnly = [

        {
            path: "/login",
            element: <LoginForm />,
        },
        {
            path: "/register",
            element: <RegisterForm />,
        },
    ];

    const renderProtectedRoutes = () =>
        authenticatedRoutes.map((route) => ({
            ...route,
            element: (
                <>{route.element}</>
            ),
        }));

    const router = createBrowserRouter([
        ...publicRoutes,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...renderProtectedRoutes(),
    ]);

    return <RouterProvider router={router} />;
};

export default Routes;