module.exports = (sequelize, DataTypes) => {
  const Dashboard = sequelize.define("dashboard", {
    subscription: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  })

  Dashboard.associate = function (models) {
    Dashboard.hasMany(models.user, { foreignKey: "dashboardId" })
    Dashboard.hasMany(models.widget, { foreignKey: "dashboardId" })
  }
  return Dashboard
}
