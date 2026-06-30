import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Eager load - needed as route wrapper
import ProtectedRoute from './components/admin/ProtectedRoute'

// Lazy load all page components
const Home = lazy(() => import('./components/Home'))
const Login = lazy(() => import('./components/auth/Login'))
const Signup = lazy(() => import('./components/auth/Signup'))
const Jobs = lazy(() => import('./components/Jobs'))
const Browse = lazy(() => import('./components/Browse'))
const Profile = lazy(() => import('./components/Profile'))
const JobDescription = lazy(() => import('./components/JobDescription'))
const Companies = lazy(() => import('./components/admin/Companies'))
const CompanyCreate = lazy(() => import('./components/admin/CompanyCreate'))
const CompanySetup = lazy(() => import('./components/admin/CompanySetup'))
const AdminJobs = lazy(() => import('./components/admin/AdminJobs'))
const PostJob = lazy(() => import('./components/admin/PostJob'))
const Applicants = lazy(() => import('./components/admin/Applicants'))

// Loading fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
  </div>
)

const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
)

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <SuspenseWrapper><Home /></SuspenseWrapper>
  },
  {
    path: '/login',
    element: <SuspenseWrapper><Login /></SuspenseWrapper>
  },
  {
    path: '/signup',
    element: <SuspenseWrapper><Signup /></SuspenseWrapper>
  },
  {
    path: "/jobs",
    element: <SuspenseWrapper><Jobs /></SuspenseWrapper>
  },
  {
    path: "/description/:id",
    element: <SuspenseWrapper><JobDescription /></SuspenseWrapper>
  },
  {
    path: "/browse",
    element: <SuspenseWrapper><Browse /></SuspenseWrapper>
  },
  {
    path: "/profile",
    element: <SuspenseWrapper><Profile /></SuspenseWrapper>
  },
  // admin ke liye yha se start hoga
  {
    path:"/admin/companies",
    element: <SuspenseWrapper><ProtectedRoute><Companies/></ProtectedRoute></SuspenseWrapper>
  },
  {
    path:"/admin/companies/create",
    element: <SuspenseWrapper><ProtectedRoute><CompanyCreate/></ProtectedRoute></SuspenseWrapper>
  },
  {
    path:"/admin/companies/:id",
    element: <SuspenseWrapper><ProtectedRoute><CompanySetup/></ProtectedRoute></SuspenseWrapper>
  },
  {
    path:"/admin/jobs",
    element: <SuspenseWrapper><ProtectedRoute><AdminJobs/></ProtectedRoute></SuspenseWrapper>
  },
  {
    path:"/admin/jobs/create",
    element: <SuspenseWrapper><ProtectedRoute><PostJob/></ProtectedRoute></SuspenseWrapper>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element: <SuspenseWrapper><ProtectedRoute><Applicants/></ProtectedRoute></SuspenseWrapper>
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App