const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Task = sequelize.define('Task', {
  title: { type: DataTypes.STRING, allowNull: false },
  status: { 
    type: DataTypes.ENUM('Todo', 'In Progress', 'Completed'), 
    defaultValue: 'Todo' 
  },
  userId: { type: DataTypes.UUID, allowNull: false }
});

module.exports = Task;