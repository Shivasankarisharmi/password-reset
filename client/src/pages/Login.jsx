import { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // ✅ Call the backend login API
      const response = await fetch('https://password-reset-backend-i7pr.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        // ✅ Only set loggedIn if backend says password is correct
        setLoggedIn(true)
      } else {
        // ✅ Show error if wrong password or wrong email
        setError(data.message || 'Invalid email or password!')
      }
    } catch (err) {
      setError('Server error. Please try again.')
    }

    setLoading(false)
  }

  // Success Screen
  if (loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}>
        <div className="bg-white shadow-2xl rounded-3xl p-12 w-full max-w-md text-center animate-bounce">

          {/* Smiley Emoji */}
          <div className="text-8xl mb-6">😊</div>

          {/* Success Text */}
          <h1 className="text-4xl font-extrabold text-purple-600 mb-3">
            Login Successful!
          </h1>
          <p className="text-gray-500 text-lg">
            Welcome back! You are now logged in.
          </p>

          {/* Decorative dots */}
          <div className="flex justify-center gap-2 mt-8">
            <span className="w-3 h-3 bg-purple-300 rounded-full"></span>
            <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
            <span className="w-3 h-3 bg-purple-700 rounded-full"></span>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">

        {/* User Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-purple-100 p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-600"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Login to your account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 text-xs"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* ✅ Error Message */}
          {error && (
            <p className="text-red-600 text-sm text-center bg-red-50 py-2 rounded-lg">
              {error}
            </p>
          )}

          {/* Forgot Password Link */}
          <div className="text-right">
            <a href="/forgot-password" className="text-sm text-purple-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

      </div>
    </div>
  )
}

export default Login
