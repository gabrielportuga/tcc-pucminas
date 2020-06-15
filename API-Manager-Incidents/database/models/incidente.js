module.exports = (sequelize, DataTypes) => {
  const Incidente = sequelize.define(
    "Incidente",
    {
      id_usuario_inclusao: DataTypes.INTEGER,
      id_usuario_alteracao: DataTypes.INTEGER,
      descricao: DataTypes.STRING,
      data_inclusao: DataTypes.TEXT,
      data_alteracao: DataTypes.TEXT,
    },
    {
      schema: "SGQ",
      timestamps: false,
      paranoid: true,
      underscored: true,
      freezeTableName: true,
      tableName: "incidente",
    }
  );
  Incidente.associate = function (models) {
    // associations can be defined here
    Incidente.belongsTo(models.Usuario, {
      foreignKey: "id_usuario_inclusao",
      as: "UsuarioInclusao",
    });

    Incidente.belongsTo(models.Usuario, {
      foreignKey: "id_usuario_alteracao",
      as: "UsuarioAlteracao",
    });

    Incidente.belongsToMany(models.Insumo, {
      through: models.IncidenteInsumoNC,
      foreignKey: 'id_incidente', // replaces `productId`
      otherKey: 'id_insumo' // replaces `categoryId`
    });

    Incidente.hasMany(models.IncidenteInsumoNC, {
      foreignKey: "id_insumo",
      as: "IncidenteInsumo",
      onDelete: "CASCADE",
    });

    // Incidente.belongsToMany(models.Insumo, {
    //   through:"incidente_insumo"
    // });
  };
  return Incidente;
};
