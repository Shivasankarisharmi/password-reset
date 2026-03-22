import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  const userEmail = localStorage.getItem('userEmail')

  useEffect(() => {
   
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}>
      <div className="bg-white shadow-2xl rounded-3xl p-12 w-full max-w-md text-center">

        
        <div className="text-8xl mb-6">😊</div>

       
        <h1 className="text-4xl font-extrabold text-purple-600 mb-3">
          Login Successful!
        </h1>
        <p className="text-gray-500 text-lg mb-2">
          Welcome back!
        </p>
        <p className="text-gray-400 text-sm mb-8">
          {userEmail}
        </p>

        
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition duration-200"
        >
          Logout
        </button>

        
        <div className="flex justify-center gap-2 mt-8">
          <span className="w-3 h-3 bg-purple-300 rounded-full"></span>
          <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
          <span className="w-3 h-3 bg-purple-700 rounded-full"></span>
        </div>

      </div>
    </div>
  )
}

export default Dashboard
