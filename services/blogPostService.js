const { BlogPost, User, Categorie } = require('../models');
const errorConstructor = require('../utils/errorConstructor');
const { getCategoryById } = require('./categorieService');
// const { getUserById } = require('../services/userService');

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

  return blogPost.dataValues; // refatorar retorno de blogPost
};

const getAllBlogPost = async () => {
  const blogPost = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categorie', through: { attributes: [] } },
    ],
  });

  return blogPost;
};

const getBlogPostById = async (id) => {
  const blogPost = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      // { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!blogPost) throw errorConstructor('notFound', 'Post does not exist');

  return blogPost;
};

// const updateBlogPost = async (id) => {};

// const deleteBlogPost = async (id) => {};

module.exports = { createBlogPost, getAllBlogPost, getBlogPostById };