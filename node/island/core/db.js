const { Sequelize } = require('sequelize')
const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql', // 指定数据库类型
  host,
  port,
  logging: true, // 原始sql命令在控制台显示与否
  timezone: '+08:00', // 时区设置
  define: {
    timestamps: true,
    paranoid: true, // deleteAt
    // createdAt: 'created_at',
    // updatedAt: 'updated_at',
    // deletedAt: 'deleted_at',
    underscored: true
  }
})

sequelize.sync({
  force: false
})

module.exports = {
  sequelize
}