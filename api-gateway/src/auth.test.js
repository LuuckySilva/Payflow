const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

describe('Autenticação', () => {
  
  test('bcrypt deve criptografar a senha corretamente', async () => {
    const senha = 'MinhaSenh@123'
    const hash = await bcrypt.hash(senha, 10)
    
    expect(hash).not.toBe(senha)
    expect(hash).toMatch(/^\$2[ab]\$/)
  })

  test('bcrypt deve validar senha correta', async () => {
    const senha = 'MinhaSenh@123'
    const hash = await bcrypt.hash(senha, 10)
    const valido = await bcrypt.compare(senha, hash)
    
    expect(valido).toBe(true)
  })

  test('bcrypt deve rejeitar senha incorreta', async () => {
    const senha = 'MinhaSenh@123'
    const hash = await bcrypt.hash(senha, 10)
    const invalido = await bcrypt.compare('senhaErrada', hash)
    
    expect(invalido).toBe(false)
  })

  test('JWT deve gerar token válido', () => {
    const payload = { id: '123', email: 'teste@teste.com' }
    const secret = 'secret_de_teste'
    const token = jwt.sign(payload, secret, { expiresIn: '1h' })
    
    expect(token).toBeDefined()
    expect(typeof token).toBe('string')
  })

  test('JWT deve decodificar payload corretamente', () => {
    const payload = { id: '123', email: 'teste@teste.com' }
    const secret = 'secret_de_teste'
    const token = jwt.sign(payload, secret, { expiresIn: '1h' })
    const decoded = jwt.verify(token, secret)
    
    expect(decoded.id).toBe('123')
    expect(decoded.email).toBe('teste@teste.com')
  })

})