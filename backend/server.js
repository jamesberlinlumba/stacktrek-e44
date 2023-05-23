import express from 'express'
import morgan from 'morgan'
import routes from './routes/cart.js'

const app = express()

const server = app.listen(process.env.PORT || 8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port);
})

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use(express.json())
app.use(morgan('dev'))

app.use('/api', routes)