module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categorie',
  { name: DataTypes.STRING },
  { timestamps: false, tableName: 'Categories' });

  return Categorie;
};