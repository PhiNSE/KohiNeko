const mongoose = require('mongoose');
const { ImageSchema } = require('./imageModel');

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: false,
      // validate: {
      //   validator: async function (v) {
      //     const count = await this.model('items').countDocuments({
      //       name: v,
      //       coffeeShopId: this.coffeeShopId,
      //     });
      //     return count === 0;
      //   },
      //   message: 'Item with this name already exists in the same coffee shop',
      // },
      required: [true, 'Item must have a name'],
    },
    itemTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'item_types',
      required: [true, 'Item must have a type'],
    },
    price: {
      type: Number,
      required: [true, 'Item must have a price'],
    },
    description: {
      type: String,
      required: [true, 'Item must have a description'],
    },
    images: {
      type: [ImageSchema],
      required: false,
    },
    status: {
      type: String,
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// itemSchema.pre('save', async function (next) {
//   try {
//     const itemTypePromise = ItemType.find({ _id: this.itemType });
//     this.itemType = await Promise.all(itemTypePromise);
//     next();
//   } catch (error) {
//     next(error);
//   }
//

const Item = mongoose.model('items', itemSchema);

module.exports = Item;
