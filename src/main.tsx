import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home";
import './output.css'
import { AuthProvider } from "./providers/AuthProvider"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
