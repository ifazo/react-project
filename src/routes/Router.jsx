import { createBrowserRouter } from "react-router-dom";
import RootLayout from '../layouts/RootLayout';
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import DashboardLayout from "../layouts/DashboardLayout";
import ProductsPage from "../pages/ProductsPage";
import ProductPage from "../pages/ProductPage";
import CategoriesPage from "../pages/CategoriesPage";
import DashboardPage from "../pages/DashboardPage";
import CheckoutPage from "../pages/CheckoutPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/products",
                element: <ProductsPage />
            },
            {
                path: "/products/:id",
                element: <ProductPage />
            },
            {
                path: "/categories",
                element: <CategoriesPage />
            },
            {
                path: "/sign-in",
                element: <SignIn />
            },
            {
                path: "/sign-up",
                element: <SignUp />
            },
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "/dashboard",
                element: <DashboardPage />
            },
            {
                path: "/dashboard/checkout",
                element: <CheckoutPage />
            }
        ]
    },
    {
        path: "*",
        element: <ErrorPage />
    }
]);

export default router;