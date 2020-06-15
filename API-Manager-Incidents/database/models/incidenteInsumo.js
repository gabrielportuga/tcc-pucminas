
module.exports = (sequelize, DataTypes) => {
    const IncidenteInsumo = sequelize.define('IncidenteIncidenteInsumo', {
      nome: DataTypes.TEXT,
      descricao: DataTypes.TEXT
    }, {
      schema: "SGQ",
      timestamps: false,
      paranoid: true,
      underscored: true,
      freezeTableName: true,
      tableName: "incidente_insumo",
    });
    IncidenteInsumo.associate = function(models) {
      // associations can be defined here
      
      IncidenteInsumo.belongsTo(models.Incidente, {
        foreignKey: 'id_incidente',
        as: 'Incidente'
      });

      IncidenteInsumo.belongsTo(models.Insumo, {
        foreignKey: 'id_insumo',
        as: 'Insumo'
      });
      
  
    };
    return IncidenteInsumo;
  };