import CategoryRoutes from './Categories/routes.js'
import ItemRoutes from './Items/routes.js'
import express from 'express'
import mongoose from 'mongoose'

const app = express()
const port = 3001

mongoose
  .connect('mongodb://localhost:27017/')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err))

app.use(express.json())

app.get('/', (req, res) => res.send('API is running.'))

CategoryRoutes(app)
ItemRoutes(app)

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
)
