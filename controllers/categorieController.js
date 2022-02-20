const routerCategorie = require('express').Router();
const rescue = require('express-rescue');
const categorieService = require('../services/categorieService');
const { validateJoiCategorie } = require('../utils/validateJoiCategorie');
const auth = require('../middlewares/auth');

routerCategorie.post('/', auth, rescue(async (req, res) => {
  const { name } = req.body;
  validateJoiCategorie(req.body);
  const categorie = await categorieService.createCategorie(name);

  return res.status(201).json(categorie);
}));

routerCategorie.get('/', auth, rescue(async (req, res) => {
  const categories = await categorieService.getAllCategories();

  return res.status(200).json(categories);
}));

module.exports = routerCategorie;