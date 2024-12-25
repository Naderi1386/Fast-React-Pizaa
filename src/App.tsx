
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./ui/Home"
import Menu from "./features/menu/Menu"
import Cart from "./features/card/Cart"
import CreateOrder from "./features/order/CreateOrder"
import Order from "./features/order/Order"
import AppLayout from "./ui/AppLayout"
import { loader as menuLoader } from "./features/menu/Menu"
import Error from './ui/Error'
import {loader as orderLoader} from './features/order/Order'
import {action as createOrderAction} from './features/order/CreateOrder'
import {action as orderUpdateAction} from './features/order/UpdateOrder'


const router = createBrowserRouter([
  {
    element: <AppLayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action:createOrderAction
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action:orderUpdateAction
      },
    ],
    errorElement: <Error />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router}/>
    
  )
}

export default App