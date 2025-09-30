import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import routes from './routes/routes'
import { RouterProvider } from 'react-router-dom'
import { WorkoutProvider } from './contexts/WorkoutContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WorkoutProvider>
      <RouterProvider router={routes} />
    </WorkoutProvider>
  </StrictMode>,
)
