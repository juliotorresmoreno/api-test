
const mongoose = require('mongoose');
const { databaseDSN } = require('../config');

/**
 * @typedef { import("mongoose").Connection } Connection
 */

/**
 * @return {Connection}
 */
function createConn() {
  mongoose.connect(databaseDSN, { useNewUrlParser: true });
  const db = mongoose.connection;
  return db;
}

let connection;

/**
 * @return {Connection}
 */
function getOrCreateConn() {
  if (connection) return connection;
  connection = createConn();
  return connection;
}

module.exports.createConn = createConn;
module.exports.getOrCreateConn = getOrCreateConn;
