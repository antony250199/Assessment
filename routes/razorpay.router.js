const { instance } = require('../helpers/razorpay')
const crypto = require('crypto')
const express = require('express')
var router = express.Router()

router.post('/order', async (req, res) => {
  var options = {
    amount: req.body.amount, //* 100 for amount in the smallest currency unit
    currency: 'INR',
    receipt: req.body.email,
    payment_capture: '0',
  }
  instance.orders.create(options, (err, order) => {
    if (err) {
      console.log(err)
      // next(err);
      res.json({ error: err })
    }
    if (order) {
      res.json({
        success: true,
        status: 'Order Created Successfully',
        value: order,
        key: instance.key_id,
      })
    }
  })
})

router.post('/payment', async (req, res) => {
  let order = {
    Razorpay_order_id: req.body.razorpayOrderId,
    payment_id: req.body.razorpayPaymentId,
    Razorpay_signature: req.body.razorpaySignature,
    order_status: 'Paid',
    payment_method: req.body.PaymentType,
  }
  let body = order.Razorpay_order_id + '|' + order.payment_id
  var expectedSignature = crypto
    .createHmac('sha256', instance.key_secret)
    .update(body.toString())
    .digest('hex')
  if (expectedSignature === order.Razorpay_signature) {
    log.orderLogger.info(`Payment signature verification success`)
    res.json({
      status: 'ok',
      message: 'Transaction successfully',
    })
  } else {
    res.status(400).send('Invalid signature')
  }
})

module.exports = router
