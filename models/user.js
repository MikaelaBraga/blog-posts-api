module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false, // evita inserir o createdAt e updatedAt na tabela
    tableName: 'Users',
  });

  // um usuário pode ter muitos posts
  User.associate = (models) => {
    User.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'blogPosts' });
  };

  return User;
};