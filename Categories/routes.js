import Category from './CategoryModel.js'

function CategoryRoutes (app) {
  app.post('/categories', async (req, res) => {
    if (req.query['id']) {
      const reqcat = await Category.findOne({ _id: req.query['id'] })
      const status = await Category.updateOne(
        { _id: reqcat.id },
        {
          name: req.body.name ? req.body.name : reqcat.name,
          description: req.body.description
            ? req.body.description
            : reqcat.description
        }
      )
      res.send('Updated Catagory with status: ' + status.acknowledged)
    } else {
      const category = new Category({
        name: req.body.name,
        description: req.body.description
      })
      await category.save()
      res.send('Created Catagory with id: ' + category.id)
    }
  })

  app.get('/categories', async (req, res) => {
    if (req.query['id']) cat = await Category.findOne({ _id: req.query['id'] })
    else {
      cat = await Category.find()
      cat.unshift({ 'Total entries in Catagory: ': cat.length })
    }
    res.send(cat)
  })

  app.delete('/categories', async (req, res) => {
    const id = req.query['id']
    reqcat = await Category.findOne({ _id: id })
    if (reqcat) {
      await Category.deleteOne({ _id: id })
      res.send('Deleted Category with id: ' + id)
    }
  })
}

export default CategoryRoutes
