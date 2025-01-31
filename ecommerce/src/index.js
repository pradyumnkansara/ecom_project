import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './media.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'react-notifications/lib/notifications.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/web_pages/Home';
import Product from './pages/web_pages/Product';
import Contactus from './pages/web_pages/Contactus';
import Login from './pages/web_pages/Login';
import ProductDetail from './pages/web_pages/ProductDetail';
import Register from './pages/web_pages/Register';
import AboutUs from './pages/web_pages/AboutUs';
import Cart from './pages/web_pages/Cart';
import AdminPage from './pages/admin_pages/AdminPage';
import AdminContext from './context.jsx/AdminContext';
import AddCategory from './pages/admin_pages/AddCategory';
import ViewCategory from './pages/admin_pages/ViewCategory';
import AddSubcategory from './pages/admin_pages/AddSubcategory';
import AddProduct from './pages/admin_pages/AddProduct';
import ViewSubcategory from './pages/admin_pages/ViewSubcategory';
import ViewProduct from './pages/admin_pages/ViewProduct';
import AddBanner from './pages/admin_pages/AddBanner';
import ViewBanner from './pages/admin_pages/ViewBanner';
import ViewUser from './pages/admin_pages/ViewUser';
import AdminLogin from './pages/admin_pages/AdminLogin';
import AddBestSeller from './pages/admin_pages/AddBestSeller';
import AddNewlyLaunched from './pages/admin_pages/AddNewlyLaunched';
import ViewBestSeller from './pages/admin_pages/ViewBestSeller';
import ViewNewlyLaunched from './pages/admin_pages/ViewNewlyLaunched';
import Profile from './pages/web_pages/Profile';

let routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/product/:id?',
    element: <Product />
  },
  {
    path: '/contact-us',
    element: <Contactus />
  },
  {
    path: '/log-in',
    element: <Login />
  },
  {
    path: '/product-detail/:id?',
    element: <ProductDetail />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/about-us',
    element: <AboutUs />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/profile/:id',
    element: <Profile />
  },
  // admin pages
  {
    path: '/admin-login',
    element: <AdminLogin />
  },
  {
    path: '/admin-page',
    element: <AdminPage />
  },
  {
    path: '/add-category/:id?',
    element: <AddCategory />
  },
  {
    path: '/add-subcategory/:id?',
    element: <AddSubcategory />
  },
  {
    path: '/add-product/:id?',
    element: <AddProduct />
  },
  {
    path: '/add-banner/:id?',
    element: <AddBanner />
  },
  {
    path: '/add-bestsell/:id?',
    element: <AddBestSeller  />
  },
  {
    path: '/add-newlaunch/:id?',
    element: <AddNewlyLaunched  />
  },
  {
    path: '/view-bestsell',
    element: <ViewBestSeller/>
  },
  {
    path: '/view-newlaunch',
    element: <ViewNewlyLaunched/>
  },
  {
    path: '/view-category',
    element: <ViewCategory />
  },
  {
    path: '/view-subcategory',
    element: <ViewSubcategory />
  },
  {
    path: '/view-product',
    element: <ViewProduct />
  },
  {
    path: '/view-banner',
    element: <ViewBanner />
  },
  {
    path: '/view-user',
    element: <ViewUser />
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AdminContext>
      <RouterProvider router={routes} />
    </AdminContext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
