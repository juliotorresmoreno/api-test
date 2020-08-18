
const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const uuid = require('uuid');
const multer = require('multer');
const New = require('../models/New');
const createS3Client = require('../services/s3').createS3Client;

const upload = multer({

});

/**
 * @typedef {import('./@types').NewsPOSTData} NewsPOSTData
 * @typedef {import('./@types').NewsGETData} NewsGETData
 * @typedef {import('./@types').NewsDELETEData} NewsDELETEData
 * @typedef {import('../models/@types').New} New
 */

/**
 * 
 * @param {NewsPOSTData} data 
 */
function checkNewsPOSTData(data) {
  if (!data.title) {
    throw new createError.BadRequest('title: El titulo es requerido.')
  }
  if (!data.content) {
    throw new createError.BadRequest('content: El contenido es requerido.')
  }
}

/**
 * 
 * @param {New} data 
 */
async function createNew(data) {
  try {
    /**
  * @type {New}
  */
    const record = {
      title: data.title,
      content: data.content,
      userId: data.userId,
      imageUrl: data.imageUrl,
      
      createdAt: data.createdAt,
      deleteAt: data.deleteAt,
      updatedAt: data.deleteAt,
      deleted: data.deleted
    }
    const result = await New.create(record);
    return result.id;
  } catch (error) {
    throw new createError.InternalServerError('La base de datos ha fallado.')
  }
}

/**
 * 
 * @param {Buffer} imageBuffer
 * @return {Promise<string>}
 */
async function uploadImage(contentType, imageBuffer) {
  try {
    const { AWS_BUCKET, AWS_UPLOAD_FOLDER, AWS_UPLOAD_URL } = process.env;
    const idv4 = uuid.v4();
    const clientS3 = createS3Client();
    await clientS3.putObject({
      ACL: 'public-read',
      Bucket: AWS_BUCKET,
      Key: `${AWS_UPLOAD_FOLDER}${idv4}`,
      ContentType: contentType,
      Body: imageBuffer
    }, function() {})
    return AWS_UPLOAD_URL + idv4;
  } catch (error) {
    console.log(error);
    throw new createError.InternalServerError('No se pudo subir la imagen.');
  }
}

/**
 * 
 * @param {import('../types/http').RequestWithSession} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function POST(req, res, next) {
  try {
    /**
    * @type {NewsPOSTData}
    */
    const data = req.body;
    checkNewsPOSTData(data);
    const imageUrl = await uploadImage(req.file.mimetype, req.file.buffer);
    console.log(imageUrl);
    const id = await createNew({
      ...data,
      userId: req.session.user.id,
      imageUrl: imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
      deleteAt: new Date(),
      deleted: false
    });
    res.json({
      success: true,
      id
    });
  } catch (error) {
    next(error);
  }
}

router.post('/', upload.single('image'), POST);

/**
 * @param {NewsGETData} data
 * @return {object}
 */
function queryBuilder(data) {
  const query = {
    deleted: false
  };
  if (data.userId) {
    query.userId = data.userId;
  }
  if (data.title && data.content) {
    query.$text = {
      $search: data.title + ' ' + data.content
    }
  } else if (data.title || data.content) {
    query.$text = {
      $search: data.title || data.content
    }
  }
  return query;
}

/**
 * 
 * @param {import('../types/http').RequestWithSession} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function GET(req, res, next) {
  try {
    /**
     * @type {NewsGETData}
     */
    const data = req.query;
    const secureFields = {
      title: 1,
      content: 1,
      userId: 1,
      imageUrl: 1
    }
    const page = parseInt(data.page) - 1;
    const pageSize = parseInt(data.pageSize);

    const query = queryBuilder(data);
    const posts = await New.find(query, secureFields)
      .skip(pageSize * page)
      .limit(pageSize);

    res.json({
      success: true,
      data: posts
    });
  } catch (error) {
    next(error);
  }
}

router.get('/', GET);


/**
 * 
 * @param {string} userId 
 */
async function findById(userId) {
  /**
   * @type {any}
   */
  const post = await New.findById(userId);
  /**
   * @type {import('../models/@types').NewDocument} NewDocument
   */
  const record = post;
  return record;
}

/**
 * 
 * @param {import('../types/http').RequestWithSession} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
async function DELETE(req, res, next) {
  try {
    /**
     * @type {NewsDELETEData}
     */
    const data = req.params;
    const post = await findById(data.postId);
    /**
     * @type {import('../models/@types').New}
     */
    const updatePost = {
      content: post.content,
      title: post.title,
      userId: post.userId,
      deleted: true,
      deleteAt: new Date(),
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    }
    await New.update(post, updatePost);

    res.status(200)
    res.json({
      success: true,
      id: post.id
    });
  } catch (error) {
    next(error);
  }
}

router.delete('/:postId', DELETE);

module.exports = router;
