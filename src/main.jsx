import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './Register.jsx';
import { AuthProvider } from './Auth/authContext.jsx';
import TaskPage from './createEditTask.jsx';
import DashboardPage from './Dashboard.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/task" element={<TaskPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
