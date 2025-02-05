
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import { lazy, Suspense } from 'react'

const Login =lazy(()=>import("./auth/Login"))
const SignUp =lazy(()=>import("./auth/SignUp"))
function App() {
  return (
    <Router>
       <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      </Routes>
      </Suspense>
    </Router>
  )
}

export default App
