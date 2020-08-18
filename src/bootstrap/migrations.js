
/**
 * @typedef { import("mongoose").Connection } Connection
 */

const migrationUsers = require('../migrations/users');
const migrationNews = require('../migrations/news');

/**
 * 
 * @param {Connection} conn 
 */
module.exports = async function(conn) {
  await migrationUsers(conn);
  await migrationNews(conn);
}