import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { useNavigate } from 'react-router-dom'



import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom'

function Layout() {
  return (
    <>
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path:"", 
        element: <Login />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <SignUp />
      },{
        path:'home',
        element:<Home/>
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App