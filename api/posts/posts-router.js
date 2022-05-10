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
    const id = req.params.id;

    Posts.findById(id)
        .then(postById => {
            if (postById) {
                res.status(200).json(postById);
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist"});
            }
        })
        .catch(err => {
            res.status(500).json({message: "The post information could not be retrieved"});
        })
});

router.post('/', (req, res) => {
    const {title, contents} = req.body;

    if (!title || title == "" || !contents || contents == "") {
        res.status(400).json({message: "Please provide title and contents for the post"});
    } else {
        Posts.insert(req.body)
            .then(newPost => {
                Posts.findById(newPost.id)
                    .then(createdPost => {
                        res.status(201).json(createdPost);
                    })
            })
            .catch(err => {
                res.status(500).json({message: "There was an error while saving the post to the database"});
            })
    }
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const {title, contents} = req.body;

    if (title && contents && title != "" && contents != "") {
        Posts.findById(id)
            .then(postToUpdate => {
                if (postToUpdate) {
                    Posts.update(id, {title,contents})
                        .then(updatedPosts => {
                            if (updatedPosts > 0) {
                                Posts.findById(id)
                                    .then(updatedFoundByIdPost => {
                                        if (updatedFoundByIdPost) {
                                            res.status(200).json(updatedFoundByIdPost);
                                        } else {
                                            res.status(404).json({message: "The post with the specified ID does not exist"});
                                        }
                                    })
                                    .catch( err => {
                                        res.status(500).json({message: "The post information could not be modified"});
                                    })
                            } else {
                                res.status(500).json({message: "The post information could not be modified"});
                            }
                        })
                        .catch(err => {
                            res.status(500).json({message: "The post information could not be modified"});
                        })
                } else {
                    res.status(404).json({message: "The post with the specified ID does not exist"});
                }
            })
            .catch(err => {
                res.status(500).json({message: "The post information could not be modified"});
            })
    } else {
        res.status(400).json({message: "Please provide title and contents for the post"});
    }
});

router.delete('/:id', (req, res) => {

});

router.get('/:id/commemts', (req, res) => {

});

module.exports = router;




