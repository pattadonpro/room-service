const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title:        {type: String, required: true, unique: true},
    price:        {type: Number, required: true},
    priceType:    {type: String, required: true, enum: ['DAILY', 'MONTHLY', 'SALE']},
    imageUrl:     {type: String, required: true},
    description:  {type: String, required: false}
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Room', schema);
