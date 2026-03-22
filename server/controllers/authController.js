const User = require('../models/User')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

 
const register = async (req, res) => {
  const { email, password } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered!' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({ email, password: hashedPassword })
    await user.save()
    res.status(201).json({ message: 'Account created successfully! You can now login.' })
  } catch (error) {
    console.error('Register Error:', error)
    res.status(500).json({ message: 'Something went wrong. Please try again.' })
  }
}


const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ message: 'Invalid email or password!' })
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password!' })
    res.status(200).json({ message: 'Login successful!', userId: user._id })
  } catch (error) {
    console.error('Login Error:', error)
    res.status(500).json({ message: 'Something went wrong. Please try again.' })
  }
}


const forgotPassword = async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found with this email!' })

    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = Date.now() + 15 * 60 * 1000
    user.resetToken = resetToken
    user.resetTokenExpiry = resetTokenExpiry
    await user.save()

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: { name: 'Password Reset', email: process.env.EMAIL_USER },
        to: [{ email: user.email }],
        subject: 'Password Reset Request',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
            <h2 style="color: #3b82f6;">Password Reset Request</h2>
            <p>Hi there,</p>
            <p>We received a request to reset your password. Click the button below:</p>
            <a href="${resetLink}" style="background-color: #3b82f6; color: white; padding: 12px 24px;
              text-decoration: none; border-radius: 6px; display: inline-block; margin: 16px 0;">
              Reset Password
            </a>
            <p style="color: red;">This link expires in <strong>15 minutes</strong>.</p>
            <p>If you did not request this, please ignore this email.</p>
          </div>
        `
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Brevo API Error:', errorData)
      return res.status(500).json({ message: 'Failed to send email. Please try again.' })
    }

    res.status(200).json({ message: 'Password reset link sent to your email!' })
  } catch (error) {
    console.error('Forgot Password Error:', error)
    res.status(500).json({ message: 'Something went wrong. Please try again.' })
  }
}


const resetPassword = async (req, res) => {
  const { token } = req.params
  const { password } = req.body
  try {
    const user = await User.findOne({ resetToken: token })
    if (!user) return res.status(400).json({ message: 'Invalid reset link!' })
    if (user.resetTokenExpiry < Date.now()) return res.status(400).json({ message: 'Reset link has expired! Please request a new one.' })
    const hashedPassword = await bcrypt.hash(password, 10)
    user.password = hashedPassword
    user.resetToken = null
    user.resetTokenExpiry = null
    await user.save()
    res.status(200).json({ message: 'Password reset successfully! You can now login.' })
  } catch (error) {
    console.error('Reset Password Error:', error)
    res.status(500).json({ message: 'Something went wrong. Please try again.' })
  }
}

module.exports = { register, login, forgotPassword, resetPassword }