var docxConverter = require('docx-pdf')
const express = require('express')
var router = express.Router()

router.post('/convert', async (req, res) => {
  docxConverter(
    './uploads/sample.docx',
    `./uploads/sample-${Date.now()}.pdf`,
    function (err, result) {
      if (err) {
        console.log(err)
        res.status(400).json({ message: 'error occured' })
      }
      console.log('result' + result)
      res.json({ message: 'File converted' })
    },
  )
})

router.get('/', async (req, res) => {
  res.send('welcome')
})

module.exports = router
