module.exports = (sequelize, _DataTypes) => {
  const PostsCategorie = sequelize.define('PostsCategorie', {}, { timestamps: false });

  PostsCategorie.associate = (models) => {
    models.BlogPost.belongsMany(models.Categorie, {
      as: 'categories',
      through: PostsCategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });

    models.Categorie.belongsMany(models.BlogPost, {
      as: 'blogposts',
      through: PostsCategorie,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostsCategorie;
};