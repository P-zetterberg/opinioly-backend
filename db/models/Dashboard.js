module.exports = (sequelize, DataTypes) => {
  const Dashboard = sequelize.define("dashboard", {
    subscription: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  })

  Dashboard.associate = function (models) {
    Dashboard.hasMany(models.user, { foreignKey: "dashboardId" })
    Dashboard.hasMany(models.dashboardWidget, { foreignKey: "dashboardId" })
  }
  return Dashboard
}
