const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  _id: { type: Types.ObjectId },
  title: { type: String, required: true },
  sum: { type: Number, required: true },
  completed: { type: Boolean, required: true, default: true },
  owe: { type: Boolean, required: true, default: true },
  owner: { type: Types.ObjectId, ref: 'User' },
});

module.exports = model('Debt', schema);
