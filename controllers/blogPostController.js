const routerBlogPost = require('express').Router();
const rescue = require('express-rescue');
const blogPostService = require('../services/blogPostService');
const { validateJoiBlogPost } = require('../utils/validateJoiBlogPost');
const auth = require('../middlewares/auth');

routerBlogPost.post('/', auth, rescue(async (req, res) => {
  validateJoiBlogPost(req.body);

  const { id: userId } = req.user; // id do usuário mandado pelo middleware de autenticação
  // console.log(userId);
  const { title, content, categoryIds } = req.body;
  const blogPost = await blogPostService.createBlogPost({ title, content, userId }, categoryIds);
  
  return res.status(201).json(blogPost);
}));

module.exports = routerBlogPost;