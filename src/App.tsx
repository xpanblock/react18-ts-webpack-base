import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './styles.css'

const Home = React.lazy(async () => await import('./pages/home'))
const Dashboard = React.lazy(async () => await import('./pages/dashboard'))
const Settings = React.lazy(async () => await import('./pages/settings'))

export const App = (): JSX.Element => {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
      <React.Suspense fallback="Loading...">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </React.Suspense>
    </>
  )
}
