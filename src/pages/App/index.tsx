// import { BrowserRouter, useRoutes, Route, Routes } from 'react-router-dom';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ShoppingCartProvider } from '../../context';
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SignIn from '../SignIn'
import Navbar from '../../components/Navbar'
import './App.css'
import CheckoutSideMenu from '../../components/CheckoutSideMenu';

//PRIMERA FORMA DE ENRUTAR

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/clothes', element: <Home /> },
    { path: '/electronics', element: <Home /> },
    { path: '/furnitures', element: <Home /> },
    { path: '/toys', element: <Home /> },
    { path: '/others', element: <Home /> },
    { path: '/my-orders', element: <MyOrders /> },
    { path: '/my-orders/last', element: <MyOrder /> },
    { path: '/my-orders/:id', element: <MyOrder /> },
    { path: '/my-account', element: <MyAccount /> },
    { path: '*', element: <NotFound /> },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/my-order', element: <MyOrder /> },
  ])

  return routes;
}

const  App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

//SEGUNDA FORMA DE ENRUTAR

// const  App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/my-orders" element={<MyOrders />} />
//         <Route path="/my-account" element={<MyAccount />} />
//         <Route path="*" element={<NotFound />} />
//         <Route path="/sign-in" element={<SignIn />} />
//         <Route path="/my-order" element={<MyOrder />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

export default App
