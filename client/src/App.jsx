import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Navigate to="/login" />} />

        
        <Route path="/login" element={<Login />} />

        
        <Route path="/forgot-password" element={<ForgotPassword />} />

        
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App