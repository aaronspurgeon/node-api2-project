// - `find()`: calling find returns a promise that resolves to an array of all the `posts` contained in the database.
// - `findById()`: this method expects an `id` as it's only parameter and returns the post corresponding to the `id` provided or an empty array if no post with that `id` is found.
// - `insert()`: calling insert passing it a `post` object will add it to the database and return an object with the `id` of the inserted post. The object looks like this: `{ id: 123 }`.
// - `update()`: accepts two arguments, the first is the `id` of the post to update and the second is an object with the `changes` to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
// - `remove()`: the remove method accepts an `id` as its first parameter and upon successfully deleting the post from the database it returns the number of records deleted.
// - `findPostComments()`: the findPostComments accepts a `postId` as its first parameter and returns all comments on the post associated with the post id.
// - `findCommentById()`: accepts an `id` and returns the comment associated with that id.
// - `insertComment()`: calling insertComment while passing it a `comment` object will add it to the database and return an object with the `id` of the inserted comment. The object looks like this: `{ id: 123 }`. This method will throw an error if the `post_id` field in the `comment` object does not match a valid post id in the database.

const express = require("express");
const db = require("../data/db");
const router = express.Router();

// endpoint to grab all posts
router.get("/", (req, res) => {
  db.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving the posts"
      });
    });
});

// endpoint to grab a specific post by id
router.get("/:id", (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post.length > 1) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "Post not found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving the post"
      });
    });
});

// endpoint to add a post to the posts array
router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      message: "Invalid post"
    });
  }

  const newPost = {
    title: req.body.title,
    contents: req.body.contents
  };

  db.insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error adding the post"
      });
    });
});

module.exports = router;
