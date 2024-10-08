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
import SuccessPage from "../pages/SuccessPage";
import CancelPage from "../pages/CancelPage";
import OrderPage from "../pages/OrderPage";
import CategoryPage from "../pages/CategoryPage";
import CartPage from "../pages/CartPage";
import ProfilePage from "../pages/ProfilePage";

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
                path: "/categories/:slug",
                element: <CategoryPage />
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
                path: "/dashboard/cart",
                element: <CartPage />
            },
            {
                path: "/dashboard/orders",
                element: <OrderPage />
            },
            {
                path: "/dashboard/profile",
                element: <ProfilePage />
            },
        ]
    },
    {
        path: "/success",
        element: <SuccessPage />
    },
    {
        path: "/cancel",
        element: <CancelPage />
    },
    {
        path: "*",
        element: <ErrorPage />
    }
]);

export default router;