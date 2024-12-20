const express = require("express");
const router = express.Router();
const PostsController = require("../controllers/post_controller");

router.get("/", PostsController.getAllPosts);

router.post("/",PostsController.createPost);

router.get("/:id", PostsController.getPostById);

router.put("/:id", PostsController.updatePost);

router.get("/:sender", PostsController.getPostsBySender);


module.exports = router;

