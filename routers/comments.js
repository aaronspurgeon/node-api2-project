// - `findPostComments()`: the findPostComments accepts a `postId` as its first parameter and returns all comments on the post associated with the post id.
// - `findCommentById()`: accepts an `id` and returns the comment associated with that id.
// - `insertComment()`: calling insertComment while passing it a `comment` object will add it to the database and return an object with the `id` of the inserted comment. The object looks like this: `{ id: 123 }`. This method will throw an error if the `post_id` field in the `comment` object does not match a valid post id in the database.
const express = require("express");
const db = require("../data/db");
const router = express.Router({
  mergeParams: true
});

// endpoint to grab all of a posts comments
router.get("/", (req, res) => {
  db.findPostComments(req.params.id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not get specific posts comments"
      });
    });
});

// endpoint to grab a comment by id
router.get("/:commentId", (req, res) => {
  db.findCommentById(req.params.commentId)
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({
          message: "Comment was not found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Could not get comment"
      });
    });
});

// endpoint to post a comment
router.post("/", (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({
      message: "Text field cannot be empty."
    });
  }

  const newComment = {
    text: req.body.text,
    post_id: req.params.id
  };

  db.insertComment(newComment)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error posting comment: Could not find the corresponding post."
      });
    });
});

module.exports = router;
