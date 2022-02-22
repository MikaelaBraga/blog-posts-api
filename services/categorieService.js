const { Categorie } = require('../models');

const createCategorie = async (name) => {
  const category = await Categorie.create({ name });

  return category;
};

const getAllCategories = async () => {
  const categories = await Categorie.findAll();
  console.log(categories);

  return categories;
};

const getCategoryById = async (id) => {
  const category = await Categorie.findByPk(id);

  return category;
};

module.exports = { createCategorie, getAllCategories, getCategoryById };