const { Sequelize, DataTypes } = require('sequelize');

//  Sequelize instance and database connection
const sequelize = new Sequelize('training', 'root', 'Sus@931927', {
    host: 'localhost',
    dialect: 'mysql'
});

// Testing database connection
sequelize.authenticate()
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

// Define the Employee model
const Employees = sequelize.define('Employee', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    employeeId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    DOB: {
        type: DataTypes.DATE,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    employmentType: {
        type: DataTypes.ENUM('Fulltime', 'Parttime', 'Contract')
    }
});

// Synchronize the model with the database
sequelize.sync()
    .then(() => {
        console.log('synchronizing successful');
    })
    .catch((error) => {
        console.error('Error synchronizing Employee table:', error);
    });

module.exports = Employees;
