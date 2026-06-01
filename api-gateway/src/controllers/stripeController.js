const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const User = require('../models/User')

const PLAN_PRICES = {
  pro: 'price_1TdaKhDIGOcIxLK80ivUJuce',
  enterprise: 'price_1TdaOSDIGOcIxLK85eZe8nK4'
}

const createCheckoutSession = async (req, res) => {
  try {
    const { planId, userId } = req.body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: PLAN_PRICES[planId],
          quantity: 1
        }
      ],
      success_url: 'http://localhost:4200/dashboard?payment=success',
      cancel_url: 'http://localhost:4200/dashboard?payment=cancelled',
      metadata: {
        userId,
        planId
      }
    })

    res.json({ url: session.url })

  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar sessão de pagamento', error: error.message })
  }
}

module.exports = { createCheckoutSession }