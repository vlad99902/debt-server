const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  debts: [{ type: Types.ObjectId, ref: 'Debt' }],
});

module.exports = model('User', schema);
