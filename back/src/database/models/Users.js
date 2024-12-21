const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("Users",{
        Id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
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