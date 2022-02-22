const { BlogPost, User, Categorie, PostsCategorie } = require('../models');
const errorConstructor = require('../utils/errorConstructor');
const { getCategoryById } = require('./categorieService');

// categoryIds: [1, 2]

const createBlogPost = async ({ title, content, userId, categoryIds }) => {
  await Promise.all(categoryIds.map(async (cat) => {
    const category = await getCategoryById(cat);
    // console.log(category);

    if (!category) {
      throw errorConstructor('invalidFields', '"categoryIds" not found');
    }
  }));

  const blogPost = await BlogPost.create({ title, content, userId });
  // console.log(blogPost);

  // adiciona o categoryIds que vem da requisição
  categoryIds.forEach(async (catId) => {
    await PostsCategorie.create({ postId: blogPost.id, categoryId: catId });
  });

  return blogPost.dataValues; // refatorar retorno de blogPost
};

const getAllBlogPost = async () => {
  const blogPost = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categories' },
    ],
  });
  // console.log(blogPost);

  return blogPost;
};

const getBlogPostById = async (id) => {
  const blogPost = await BlogPost.findByPk(id, {
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categorie, as: 'categories' },
    ],
  });

  if (!blogPost) throw errorConstructor('notFound', 'Post does not exist');

  return blogPost;
};

const updateBlogPost = async ({ title, content, id }, userLogged, categoryIds) => {
  const blogPost = await BlogPost.findByPk(id, {
    attributes: { exclude: ['published', 'updated'] },
    include: [{ model: User, as: 'user' }, { model: Categorie, as: 'categories' }],
  });

  // verifica se é possível atualizar o campo de categories
  if (categoryIds) {
    throw errorConstructor('invalidFields', 'Categories cannot be edited');
  }

  // verifica usuário logado
  if (userLogged.id !== blogPost.userId) {
    throw errorConstructor('unathourized', 'Unauthorized user');
  }
  
  blogPost.title = title;
  blogPost.content = content;
  
  blogPost.set({ title, content });
  await blogPost.save(); // escreve alterações no banco
  
  // console.log(blogPost);
  return blogPost.dataValues;
};

const deleteBlogPost = async (id, userLogged) => {
  const blogPost = await getBlogPostById(id);

  if (userLogged.id !== blogPost.userId) {
    throw errorConstructor('unathourized', 'Unauthorized user');
  }

  await BlogPost.destroy({ where: { id } });
};

module.exports = {
  createBlogPost,
  getAllBlogPost,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
 };