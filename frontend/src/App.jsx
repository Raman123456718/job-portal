import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Helper to retry lazy load on chunk/module fetch failures (usually due to a new deployment)
const lazyWithRetry = (componentImport) => {
  return lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      console.error("Failed to load chunk, retrying with page reload:", error);
      
      const lastReload = sessionStorage.getItem('chunk-last-reload');
      const now = Date.now();
      
      // Only reload if we haven't reloaded in the last 10 seconds to prevent infinite reload loops
      if (!lastReload || now - parseInt(lastReload, 10) > 10000) {
        sessionStorage.setItem('chunk-last-reload', now.toString());
        window.location.reload();
        return new Promise(() => {}); // Keep in loading state until page reloads
      }
      
      throw error;
    }
  });
};

// Eager load - needed as route wrapper
import ProtectedRoute from './components/admin/ProtectedRoute'

// Lazy load all page components with retry logic
const Home = lazyWithRetry(() => import('./components/Home'))
const Login = lazyWithRetry(() => import('./components/auth/Login'))
const Signup = lazyWithRetry(() => import('./components/auth/Signup'))
const Jobs = lazyWithRetry(() => import('./components/Jobs'))
const Browse = lazyWithRetry(() => import('./components/Browse'))
const Profile = lazyWithRetry(() => import('./components/Profile'))
const JobDescription = lazyWithRetry(() => import('./components/JobDescription'))
const Companies = lazyWithRetry(() => import('./components/admin/Companies'))
const CompanyCreate = lazyWithRetry(() => import('./components/admin/CompanyCreate'))
const CompanySetup = lazyWithRetry(() => import('./components/admin/CompanySetup'))
const AdminJobs = lazyWithRetry(() => import('./components/admin/AdminJobs'))
const PostJob = lazyWithRetry(() => import('./components/admin/PostJob'))
const Applicants = lazyWithRetry(() => import('./components/admin/Applicants'))

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