const Sequelize = require('sequelize')
const { sequelize } = require('./sequelize')
const Model = Sequelize.Model
class Token extends Model {
  static get scopes() {
    return {
      FORGOTTEN_PASSWORD: 'FORGOTTEN_PASSWORD',
      VERIFY_USER: 'VERIFY_USER',
    }
  }
}
Token.init(
  {
    id: {
      type: Sequelize.DataTypes.INTEGER({ length: 10 }),
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.DataTypes.INTEGER({ length: 10 }),
      field: 'user_id',
    },
    token: {
      type: Sequelize.DataTypes.UUID,
      defaultValue: Sequelize.UUIDV1,
    },
    usedAt: {
      type: Sequelize.DataTypes.DATE,
      field: 'used_at',
    },
    scope: {
      type: Sequelize.DataTypes.STRING,
      validate: {
        isIn: Object.keys(Token.scopes),
      },
    },
  },
  {
    sequelize,
    tableName: 'tokens',
    underscored: true,
    timestamps: true,
    updatedAt: false,
  },
)

module.exports = { Token }
