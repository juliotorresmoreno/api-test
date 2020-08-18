
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/User');
const secret = require('../config').secret;

/**
 * @typedef {import('./@types').DecodeJWT} DecodeJWT
 * @typedef {import('../models/@types').UserDocument} UserDocument
 */

/**
 * @return {Promise<DecodeJWT>}
 */
function verifyToken(token) {
  return new Promise(function (resolve, reject) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log("error", token)
        reject(new createError.BadRequest(err.message));
        return;
      } else {
        resolve(decoded);
      }
    });
  })
}

/**
 * @param {string} userId
 * @return {Promise<UserDocument>}
 */
async function findUserById(userId) {
  /**
   * @type {any}
   */
  const user = await User.findById(userId);
  /**
   * @type {UserDocument}
   */
  const userDocument = user;
  userDocument.password = '';
  return user;
}

/**
 * 
 * @param {import('../types/http').RequestWithSession} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
async function authMiddleware(req, res, next) {
  let authorization = req.headers.authorization;
  if (!authorization) {
    next(new createError.Unauthorized('No estas autorizado'));
  }
  if (authorization.indexOf('bearer') === 0) {
    authorization = authorization.split(' ')[1]
  }

  const decoded = await verifyToken(authorization);
  
  const user = await findUserById(decoded.id);
  req.session = {
    token: decoded,
    user: user
  }

  next();
}

module.exports = authMiddleware;
