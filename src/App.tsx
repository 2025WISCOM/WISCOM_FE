import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import MainPage from './pages/MainPage'
import NotFoundPage from './pages/NotFoundPage'
import SplashPage from './pages/SplashPage'
import AboutIntroductionPage from './pages/About/Introduction'
import AboutCongratulationPage from './pages/About/Congratulation'
import AboutDeveloperPage from './pages/About/Developer'
import AboutMapPage from './pages/About/Map'
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
        element: <SplashPage />,
      },
      {
        path: 'main',
        element: <MainPage />,
      },
      {
        path: 'about/introduction',
        element: <AboutIntroductionPage />,
      },
      {
        path: 'about/congratulation',
        element: <AboutCongratulationPage />,
      },
      {
        path: 'about/developer',
        element: <AboutDeveloperPage />,
      },
      {
        path: 'about/map',
        element: <AboutMapPage />,
      },
      {
        path: 'works',
        element: <WorksPage />,
      },
      {
        path: 'works/:category/:id',
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
