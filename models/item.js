const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: String, required: true, maxlength: 100 },
    category: { type: Schema.Types.ObjectId, ref: 'category', required: true },
    description: { type: String, required: true, maxlength: 140 },
    price: { type: Number, required: true },
    stock_available: { type: Number, required: true },
});

ItemSchema.virtual('url').get(function () {
    return '/catalog/item/' + this._id;
});

ItemSchema.virtual('similar_items').get(function () {
    return '/catalog/category/' + this.category;
});

module.exports = mongoose.model('Item', ItemSchema);
