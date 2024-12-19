const PostModel = require("../models/post_model");
const mongoose = require('mongoose');


const getAllPosts = async (req, res) => {
  const ownerFilter = req.query.owner;
  try {
    if (ownerFilter) {
      const posts = await PostModel.find({ owner: ownerFilter });
      res.send(posts);
    } else {
      const posts = await PostModel.find();
      res.send(posts);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await PostModel.findById(postId);
    if (post != null) {
      res.send(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createPost = async (req, res) => {
  const postBody = req.body;
  try {
    const post = await PostModel.create(postBody);
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPostsBySender = async (req, res) => {
  const senderFilter = req.query.sender;  // מסנן לפי שולח הפוסט
  try {
    if (senderFilter) {
      // אם קיים מסנן שולח, מחזירים פוסטים עם שולח מסוים
      const posts = await PostModel.find({ sender: senderFilter });
      res.send(posts);
    } else {
      res.status(400).send("Sender query parameter is required");  // אם אין מסנן שולח, מחזירים שגיאה
    }
  } catch (error) {
    res.status(400).send(error.message);  // מחזירים שגיאה במקרה של בעיה בביצוע
  }
};
  
const updatePost = async (req, res) => {
  try {
    const post = await PostModel.findByIdAndUpdate(
      req.params.id, 
      req.body,      
      { new: true }  
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  getPostsBySender,
  updatePost
};