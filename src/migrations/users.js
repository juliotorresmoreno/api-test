/**
 * @typedef { import("mongoose").Connection } Connection
 */

/**
 * 
 * @param {Connection} conn 
 */
module.exports = async function (conn) {
  Promise.all([
    conn.collection('users').createIndex({
      email: 'hashed'
    })
  ])
    .catch(function () { })
}