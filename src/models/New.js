
const mongoose = require('mongoose');
const db = require('../db');

const NewSchema = new mongoose.Schema({
  title: String,
  content: String,
  userId: String,
  imageUrl: String,

  deleted: Boolean,
  createdAt: Date,
  updatedAt: Date,
  deleteAt: Date
});

const conn = db.getOrCreateConn();

const New = conn.model('News', NewSchema);

module.exports = New;
