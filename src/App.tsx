import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import MainPage from './pages/MainPage'
import NotFoundPage from './pages/NotFoundPage'
import SplashPage from './pages/SplashPage'
import AboutPage from './pages/AboutPage'
import WorksPage from './pages/WorksPage'
import GuestBookPage from './pages/GuestBookPage'
import StampPage from './pages/StampPage'
import WorksDetailPage from './pages/WorksDetailPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'splash',
        element: <SplashPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'works',
        element: <WorksPage />,
      },
      {
        path: 'works/:id',
        element: <WorksDetailPage />,
      },
      {
        path: 'guestbook',
        element: <GuestBookPage />,
      },
      {
        path: 'stamp',
        element: <StampPage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
