module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      nome: DataTypes.STRING,
      senha: DataTypes.STRING,
    },
    {
      schema: "SGQ",
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,

      // don't delete database entries but set the newly added attribute deletedAt
      // to the current date (when deletion was done). paranoid will only work if
      // timestamps are enabled
      paranoid: true,

      // don't use camelcase for automatically added attributes but underscore style
      // so updatedAt will be updated_at
      underscored: true,

      // disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // if you don't want that, set the following
      freezeTableName: true,

      // define the table's name
      tableName: "usuario",
    }
  );
  Usuario.associate = function (models) {
    //associations can be defined here
    Usuario.hasMany(models.Incidente, {
      foreignKey: "id_usuario_inclusao",
      as: "usuarioInclusao",
      onDelete: "CASCADE",
    });

    Usuario.hasMany(models.Incidente, {
      foreignKey: "id_usuario_alteracao",
      as: "usuarioAlteracao",
      onDelete: "CASCADE",
    });

    
  };
  return Usuario;
};
