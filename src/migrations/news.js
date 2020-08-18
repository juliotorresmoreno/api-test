/**
 * @typedef { import("mongoose").Connection } Connection
 */

const collectionName = 'news';

/**
 * 
 * @param {Connection} conn 
 */
module.exports = function (conn) {
  return Promise.all([
    conn.collection(collectionName).createIndex({
      userId: 'hashed'
    }),
    conn.collection(collectionName).createIndex({
      title: 'text',
      content: 'text'
    }, {
      default_language: 'spanish'
    })
  ])
  .catch(function(error) {
    console.log(error)
  })
}