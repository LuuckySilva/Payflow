const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const { connectMongo } = require('./config/database')
const authRoutes = require('./routes/authRoutes')
const stripeRoutes = require('./routes/stripeRoutes')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/stripe', stripeRoutes)

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'api-gateway' })
})

const PORT = process.env.PORT || 3000

connectMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`API Gateway rodando na porta ${PORT}`)
  })
})