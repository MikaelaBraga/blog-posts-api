const { Categorie } = require('../models');
// const errorConstructor = require('../utils/errorConstructor');

const createCategorie = async (name) => {
  const category = await Categorie.create({ name });

  return category;
};

const getAllCategories = async () => {
  const categories = await Categorie.findAll();

  return categories;
};

const getCategoryById = async (id) => {
  const category = await Categorie.findByPk(id);

  // if (!category) { 
  //   throw errorConstructor('invalidFields', '"category" not found');
  // }

  return category;
};

module.exports = { createCategorie, getAllCategories, getCategoryById };