import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import routes from './routes/routes'
import { RouterProvider } from 'react-router-dom'
import { WorkoutProvider } from './contexts/WorkoutContext'
import { DashboardProvider } from './contexts/DashboardContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DashboardProvider>
      <WorkoutProvider>
        <RouterProvider router={routes} />
      </WorkoutProvider>
    </DashboardProvider>
  </StrictMode>,
)
