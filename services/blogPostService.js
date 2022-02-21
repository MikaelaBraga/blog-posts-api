const { BlogPost } = require('../models');
const errorConstructor = require('../utils/errorConstructor');
const { getCategoryById } = require('./categorieService');

// categoryIds: [1, 2]

const createBlogPost = async ({ title, content, userId }, categoryIds) => {
  await Promise.all(categoryIds.map(async (cat) => {
    const category = await getCategoryById(cat);
    // console.log(category);

    if (!category) { 
      throw errorConstructor('invalidFields', '"categoryIds" not found');
    }
  }));

  const blogPost = await BlogPost.create({ title, content, userId });
  // console.log(blogPost);

  return blogPost;
};

module.exports = { createBlogPost };