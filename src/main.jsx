import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './Register.jsx';
import Dashboard from "./Dashboard.jsx";
import { AuthProvider } from './Auth/authContext.jsx';
import TaskPage from './createEditTask.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <AuthProvider>
      <BrowserRouter>
      {/* Routes */}
      <Routes>
        <Route path="/" element={ <App />} />
        < Route path="/register" element={ <RegisterPage />} />
        <Route path="/dashboard" element={ <DashboardPage />} />
        <Route path="/task" element={ <TaskPage />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)