import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../Layouts/DashboardLayout";
import Main from "../../Layouts/Main";
import Blog from "../../Pages/Blog/Blog";
import AddCategory from "../../Pages/Dashboard/AddCategory/AddCategory";
import AddProduct from "../../Pages/Dashboard/AddProduct/AddProduct";
import AllAdmins from "../../Pages/Dashboard/AllAdmins/AllAdmins";
import AllBuyers from "../../Pages/Dashboard/AllBuyers/AllBuyers";
import AllCategories from "../../Pages/Dashboard/AllCategories/AllCategories";
import AllSellers from "../../Pages/Dashboard/AllSellers/AllSellers";
import MyBuyers from "../../Pages/Dashboard/MyBuyers/MyBuyers";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../../Pages/Dashboard/MyProducts/MyProducts";
import MyWishlist from "../../Pages/Dashboard/MyWishlist/MyWishlist";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import ReportedItems from "../../Pages/Dashboard/ReportedItems/ReportedItems";
import CategoryProducts from "../../Pages/Home/CategoryProducts/CategoryProducts";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import PageNotFound from "../../Pages/PageNotFound/PageNotFound";
import Register from "../../Pages/Register/Register";
import DisplayError from "../../Pages/SharedPages/DisplayError/DisplayError";
import AdminRoute from "../AdminRoute/AdminRoute";
import BuyerRoute from "../BuyerRoute/BuyerRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute/SellerRoute";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/category/:id',
                element: <PrivateRoute><CategoryProducts></CategoryProducts></PrivateRoute>,
                loader: ({ params }) => fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/category/${params.id}`)
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/dashboard/myOrders',
                element: <BuyerRoute><MyOrders></MyOrders></BuyerRoute>
            },
            {
                path: '/dashboard/myWishlist',
                element: <BuyerRoute><MyWishlist></MyWishlist></BuyerRoute>
            },
            {
                path: '/dashboard/myProducts',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/dashboard/addProduct',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: '/dashboard/myBuyers',
                element: <SellerRoute><MyBuyers></MyBuyers></SellerRoute>
            },
            {
                path: '/dashboard/addCategory',
                element: <SellerRoute><AddCategory></AddCategory></SellerRoute>
            },
            {
                path: '/dashboard/allBuyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/allSellers',
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            {
                path: '/dashboard/allAdmins',
                element: <AdminRoute><AllAdmins></AllAdmins></AdminRoute>
            },
            {
                path: '/dashboard/allCategories',
                element: <AdminRoute><AllCategories></AllCategories></AdminRoute>
            },
            {
                path: '/dashboard/reportedItems',
                element: <AdminRoute><ReportedItems></ReportedItems></AdminRoute>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`https://b612-used-products-resale-server-side-shourovhasan.vercel.app/bookings/${params.id}`)
            },
        ]

    },
    {
        path: '*',
        element: <PageNotFound></PageNotFound>
    }
])