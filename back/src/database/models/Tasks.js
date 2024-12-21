const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("Tasks",{
        Id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        Title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Completed:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        Created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });
};