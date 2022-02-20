const routerBlogPost = require('express').Router();
const rescue = require('express-rescue');
const { createBlogPost } = require('../services/blogPostService');
const { validateJoiBlogPost } = require('../utils/validateJoiBlogPost');

routerBlogPost.post('/', rescue(async (req, res) => {
  validateJoiBlogPost(req.body);
  const blogPost = await createBlogPost(req.body);
  
  return res.status(201).json(blogPost);
}));

module.exports = routerBlogPost;