const { BlogPost } = require('../models/blogposts');
const { getAllCategories } = require('./categorieService');

const createBlogPost = async ({ title, content, categoriIds }) => {
  const categories = await getAllCategories();
  console.log(categories);

  const blogPost = await BlogPost.create({ title, content, categoriIds });

  return blogPost;
};

module.exports = { createBlogPost };