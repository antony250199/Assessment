const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const routes = require('./routes/facebook_auth.router')
const paymentApi = require('./routes/razorpay.router')
const convertApi = require('./routes/pdf_convert.router')
const config = require('./config/config')

const app = express()
const mongodb_url =
  'mongodb+srv://antonyraj250199:rajadhoni@cluster0.okr73.mongodb.net/relational_database?retryWrites=true&w=majority'
mongoose.connect(mongodb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', () => console.log('DB not connected'))
db.once('open', () => console.log('Db connected'))
var corsOptions = {
  origin: '*',
}
app.use(cors(corsOptions))
app.use(express.json())
app.set('view engine', 'ejs')

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET',
  }),
)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: true }))
passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
})

app.get('/welcome_page', (req, res) => {
  res.json({ message: 'Welcome to sample project services.' })
})

app.use('/', routes)
app.use('/paymentApi', paymentApi)
app.use('/convertApi', convertApi)
require('./routes/oneToOne.router')(app)
require('./routes/oneToMany.router')(app)
require('./routes/manyToMany.router')(app)

passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebook_api_key,
      clientSecret: config.facebook_api_secret,
      callbackURL: config.callback_url,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile)
    },
  ),
)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
