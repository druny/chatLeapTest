const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const types = [
  'local',
  'global',
];

const status = [
  'inQueue',
  'inProcess',
  'rejected',
];

let JobSchema = new Schema({
  type: { type: String, required: true },
  status: { type: String, default: 'waiting' },
  message: { type: String, default: 'message' },
  pushTime: { type: Array, default: [9, 0, 0] },
  users: [{ type:  Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now(), required: true },
  updatedAt: { type: Date, default: Date.now(), required: true },
});

module.exports = mongoose.model('Job', JobSchema);
