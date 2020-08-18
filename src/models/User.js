
const mongoose = require('mongoose');
const db = require('../db');

/**
 * @typedef { import("mongoose").Model } Model
 * @typedef { import("mongoose").Document } Document
 */


const UserSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  email: String,
  password: String,
  deleted: Boolean
});

const conn = db.getOrCreateConn();

const User = conn.model('Users', UserSchema);

module.exports = User;
