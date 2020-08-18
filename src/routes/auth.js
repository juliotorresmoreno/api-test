const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const createError = require('http-errors');
const secret = require('../config').secret;

/**
 * @typedef {import('./@types').LoginData} LoginData
 * @typedef {import('./@types').JWTokenPayload} JWTokenPayload
 */

/**
 * 
 * @param {LoginData} data 
 */
function checkLoginDataOfNullValues(data) {
  if (!data.email)
    throw new createError.BadRequest('email: El parametro email es requerido.');
  if (!data.password)
    throw new createError.BadRequest('Password: el parametro password es requerido.');
}

/**
 * 
 * @param {*} email 
 */
async function findUser(email) {
  const user = await User.findOne({
    email: email
  }, {
    email: 1,
    name: 1,
    lastName: 1,
    password: 1
  })
  if (!user) {
    throw new createError.NotFound('El usuario no existe');
  }
  return user;
}

/**
 * 
 * @param {string} password 
 * @param {string} hashedPassword 
 */
function comparePassword(password, hashedPassword) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(password, hashedPassword, function (err, result) {
      if (err || !result) {
        reject(new createError.BadRequest('La contraseña no es valida.'));
      }
      resolve(result);
    });
  });
}

/**
 * @param {JWTokenPayload} opts
 * @return {Promise<string>}
 */
async function createJWToken(opts) {
  const token = jwt.sign(opts, secret, {
    expiresIn: 1440
  });
  return token;
}

/* GET home page. */
router.post('/login', async function (req, res, next) {
  try {
    /**
     * @type {LoginData}
     */
    const data = req.body;
    checkLoginDataOfNullValues(data);
    /**
     * @type {any}
     */
    const user = await findUser(data.email);
    await comparePassword(data.password, user.password);
    const profile = {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email
    }

    res.json({
      success: 'ok',
      token: await createJWToken({
        id: user._id,
        email: user.email,
        iat: Date.now(),
        expire: Date.now() + 60 * 1000
      }),
      profile
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

