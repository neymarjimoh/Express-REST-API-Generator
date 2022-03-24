"use strict";
var express = require('express');
var router = express.Router();
var validator = require('../services/validator');
var articlesController = require('../controllers/Articles');

var service = 'articles';

// get articles or search articles
router.get('/'+service, articlesController.find);

// get article
router.get('/'+service+'/:id', articlesController.findOne);

// To add validation, add a middlewave like the below. Works for just POST calls only
// function(req,res,next){
//     req._required = [ // _required should contain all the fails that are required
//     'name',
//     'name2'
//     ];

//     next();
// }, validator,

// create article(s) a single article object will create one article while an array of articles will create multiple articles
router.post('/'+service, articlesController.create);

// update all records that matches the query
router.put('/'+service, articlesController.update);

// update a single record
router.patch('/'+service+'/:id', articlesController.updateOne);

// delete all records that matches the query
router.delete('/'+service, articlesController.delete);

// Delete a single record
router.delete('/'+service+'/:id', articlesController.deleteOne);

// restore a previously deleted record
router.post('/'+service+'/:id/restore', articlesController.restore);

module.exports = router;
