// implement your posts router here
const express = require('express');
const router = express.Router();

const Posts = require('./posts-model');


router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res.status(200).json({message: "The posts information could not be retrieved"})
        });
});

router.get('/:id', (req, res) => {

});

router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.get('/:id/commemts', (req, res) => {

});

module.exports = router;




