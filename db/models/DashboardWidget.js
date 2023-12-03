module.exports = (sequelize, DataTypes) => {
  const DashboardWidget = sequelize.define("dashboardWidget", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
    },
    public_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
      autoIncrement: false,
    },
    data: {
      type: DataTypes.JSONB,
      validate: {
        notEmpty: true,
      },
    },
    styles: {
      type: DataTypes.JSONB,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
  })

  DashboardWidget.associate = function (models) {
    DashboardWidget.hasMany(models.feedback, { foreignKey: "widgetId" })
  }
  return DashboardWidget
}
