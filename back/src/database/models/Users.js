const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("Users",{
        Id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        UserName:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Password:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: true
    });
};