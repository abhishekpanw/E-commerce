import React from "react";
import { Redirect } from "react-router-dom";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
// import ForgetPwd from "../pages/Authentication/ForgetPassword";
import AuthLockScreen from "../pages/Authentication/AuthLockScreen";

// Dashboard
import Dashboard from "../pages/Dashboard/index";

// Inner Authentication
// import Login1 from "../pages/AuthenticationInner/Login";
// import Register1 from "../pages/AuthenticationInner/Register";
// import ForgetPwd1 from "../pages/AuthenticationInner/ForgetPassword";
import AddUser from "../pages/Users/AddUser";
import Users from "../pages/Users/UserListing";
import CMS from "../pages/CMS";
import Category from "../pages/Categories/Listing";
import SubCategory from "../pages/SubCategories/Listing";
import Product from "../pages/Products/Listing";
import AddProduct from "../pages/Products/AddProduct";


const authProtectedRoutes = [

	{ path: "/dashboard", component: Dashboard },
	{ path: "/users", component: Users },
	{ path: "/addUser", component: AddUser },
	{ path: "/categories", component: Category },
	{ path: "/subCategories", component: SubCategory },
	{ path: "/addProduct", exact: true,component: AddProduct },
	{ path: "/products", exact: true, component: Product },
	{ path: "/cms", component: CMS },

	// this route should be at the end of all other routes
	{ path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
	
];

const publicRoutes = [
	{ path: "/logout", component: Logout },
	{ path: "/login", component: Login },

	{ path: "/register", component: Register },
	{ path: "/lock-screen", component: AuthLockScreen },

	// Authentication Inner
	

];

export { authProtectedRoutes, publicRoutes };
