import express from 'express'
import morgan from 'morgan'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'path'

import routes from './routes/cart.js'

const app = express()

const server = app.listen(process.env.PORT || 8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port);
})

app.use(express.json())
app.use(morgan('dev'))

app.use('/api', routes)

app.use(express.static('../mock_e-commerce/dist'))
app.get('/', (req, res) => {
  res.sendFile(resolve(dirname(dirname(fileURLToPath(import.meta.url)))), 'mock_e-commerce', 'dist', 'index.html')
})