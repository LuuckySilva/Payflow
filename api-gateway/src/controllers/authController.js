const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body
  const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'E-mail já cadastrado' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )
    res.status(201).json({
      message: 'Usuário criado com sucesso',
      token,
      user: { id: user._id, name: user.name, email: user.email, plan: user.plan }
    })
    } catch (error) {
    res.status(500).json({ message: 'Erro interno', error: error.message })
  }
}
const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ message: 'Senha incorreta' })
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: { id: user._id, name: user.name, email: user.email, plan: user.plan }
    })

  } catch (error) {
    res.status(500).json({ message: 'Erro interno', error: error.message })
  }
}

module.exports = { register, login }