const { BlogPost } = require('../models/blogposts');

const createBlogPost = async ({ title, content, categoriIds }) => {
  const blogPost = await BlogPost.create({ title, content, categoriIds });

  return blogPost;
};

module.exports = { createBlogPost };