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
  pushTime: { type: String },
  type: { type: String, required: true },
  status: { type: String, default: 'waiting' },
  users: [{ type:  Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now(), required: true },
  updatedAt: { type: Date, default: Date.now(), required: true },
});

module.exports = mongoose.model('Job', JobSchema);
