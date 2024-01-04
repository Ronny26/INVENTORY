import Item from './ItemModel.js'

function ItemRoutes (app) {
  app.post('/items', async (req, res) => {
    const item = new Item(req.body)
    try {
      await item.save()
      res.status(201).send({ message: 'Item created successfully', item })
    } catch (error) {
      res.status(400).send(error)
    }
  })

  app.get('/items', async (req, res) => {
    try {
      const items = await Item.find().populate('category')
      res.send(items)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.get('/items/:id', async (req, res) => {
    try {
      const item = await Item.findById(req.params.id).populate('category')
      if (!item) {
        return res.status(404).send()
      }
      res.send(item)
    } catch (error) {
      res.status(500).send(error)
    }
  })

  app.patch('/items/:id', async (req, res) => {
    try {
      const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
      }).populate('category')
      if (!item) {
        return res.status(404).send()
      }
      res.send(item)
    } catch (error) {
      res.status(400).send(error)
    }
  })

  app.delete('/items/:id', async (req, res) => {
    try {
      const item = await Item.findByIdAndDelete(req.params.id)
      if (!item) {
        return res.status(404).send()
      }
      res.send({ message: 'Item deleted successfully' })
    } catch (error) {
      res.status(500).send(error)
    }
  })
}

export default ItemRoutes
