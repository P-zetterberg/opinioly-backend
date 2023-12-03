module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      // defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  })

  return User
}
