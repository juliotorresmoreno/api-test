const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const validator = require('validator').default;
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { seedSalt } = require('../config');

const logger = {
  info: console.log
}

/**
 * @typedef { import("./@types").RegisterData } RegisterData
 */

/**
 * 
 * @param {RegisterData} data 
 */
function checkRegisterDataOfNullValues(data) {
  if (!data.name)
    throw new createError.BadRequest('name: El parametro name es requerido.');
  if (!data.lastName)
    throw new createError.BadRequest('lastName: el parametro lastName es requerido.');
  if (!data.email)
    throw new createError.BadRequest('email: El parametro email es requerido.');
  if (!data.password)
    throw new createError.BadRequest('Password: el parametro password es requerido.');
}

/**
 * 
 * @param {string} value
 */
function checkSecurePassword(value) {
  if (value.match(/[a-z]/g) &&
    value.match(/[A-Z]/g) &&
    value.match(/[0-9]/g) &&
    value.match(/[#$%&*-_!]/g) &&
    value.length >= 8)
    return;

  throw new createError.BadRequest('password: La contraseña es insegura')
}

/**
 * 
 * @param {string} email
 */
async function checkUniqueEmail(email) {
  const user = await User.findOne({
    email
  });
  if (user !== null) {
    throw new createError.BadRequest('email: El correo electronico esta duplicado');
  }
}

/**
 * 
 * @param {string} pass 
 * @return {Promise<string>}
 */
async function securePassword(pass) {
  return new Promise(function (resolve, reject) {
    try {
      bcrypt.hash(pass, seedSalt, function (err, hash) {
        if (err) {
          reject(new createError.InternalServerError('No se pudo proteger la contraseña'));
          return;
        }
        resolve(hash)
      });
    } catch (error) {
      reject(new createError.InternalServerError('No se pudo proteger la contraseña'));
    }
  });
}

/**
 * 
 * @param {string} name
 */
function checkValidName(name) {
  if (!/^([A-Za-z]{3,}(\s)?)+/.test(name)) {
    throw new createError.BadRequest('name: El nombre no es valido');
  }
}

/**
 * 
 * @param {string} email
 */
function checkValidEmail(email) {
  if (!validator.isEmail(email)) {
    throw new createError.BadRequest('email: El correo electronico no es valido');
  }
}

/**
 * 
 * @param {RegisterData} data 
 */
async function createUser(data) {
  try {
    /**
     * @type {import('../models/@types').User}
     */
    const record = {
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      password: await securePassword(data.password)
    }
    const r = await User.create(record);
    return r.id;
  } catch (error) {
    throw new createError.InternalServerError('La base de datos ha fallado.')
  }
}

/* GET users listing. */
router.post('/', async function (req, res, next) {
  try {
    /**
    * @type {RegisterData}
    */
    const data = req.body;
    checkRegisterDataOfNullValues(data);
    checkValidName(data.name);
    checkValidName(data.lastName);
    checkValidEmail(data.email);
    checkSecurePassword(data.password);
    await checkUniqueEmail(data.email);

    const id = await createUser(data);

    res.json({
      success: true,
      _id: id
    })
  } catch (error) {
    next(error);
  }
});

module.exports = router;
