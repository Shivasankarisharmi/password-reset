const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
dotenv.config()

const User = require('./models/User')

const createUser = async () => {
  await mongoose.connect(process.env.MONGO_URI)

  const hashedPassword = await bcrypt.hash('test123', 10)

  const user = new User({
    email: 'shivasankarisharmi@gmail.com',  
    password: hashedPassword
  })

  await user.save()
  console.log('✅ Test user created successfully!')
  process.exit()
}

createUser()