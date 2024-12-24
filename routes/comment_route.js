const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/comment_controller");

router.post("/", CommentController.createComment);

router.get("/:id", CommentController.getCommentsByPostId);

router.put("/:id", CommentController.updateComment);

router.delete("/:id", CommentController.deleteComment);

module.exports = router;
