"use strict";
var express = require('express');
var router = express.Router();
var validator = require('../services/validator');
var booksController = require('../controllers/Books');

var service = 'books';

// get books or search books
router.get('/'+service, booksController.find);

// get book
router.get('/'+service+'/:id', booksController.findOne);

// To add validation, add a middlewave like the below. Works for just POST calls only
// function(req,res,next){
//     req._required = [ // _required should contain all the fails that are required
//     'name',
//     'name2'
//     ];

//     next();
// }, validator,

// create book(s) a single book object will create one book while an array of books will create multiple books
router.post('/'+service, function(req,res,next){
    req._required = [ // _required should contain all the fails that are required
    'name',
    'name2'
    ];

    next();
}, validator, booksController.create);

// update all records that matches the query
router.put('/'+service, booksController.update);

// update a single record
router.patch('/'+service+'/:id', booksController.updateOne);

// delete all records that matches the query
router.delete('/'+service, booksController.delete);

// Delete a single record
router.delete('/'+service+'/:id', booksController.deleteOne);

// restore a previously deleted record
router.post('/'+service+'/:id/restore', booksController.restore);

module.exports = router;
