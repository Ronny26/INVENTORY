import mongoose from 'mongoose'
import Category from '../Categories/CategoryModel.js' // Adjust the path as needed

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  price: Number,
  quantity: Number
})

const Item = mongoose.model('Item', itemSchema)

export default Item
