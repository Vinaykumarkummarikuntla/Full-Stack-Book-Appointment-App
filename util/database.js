const fs = require('fs');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('product', 'vinay', 'admin@9618', {
  dialect: 'mysql',
  host: 'ecommerce-mysql-database.mysql.database.azure.com',
  dialectOptions: {
    ssl: {
      ca: fs.readFileSync('/media/vinay/48248854248846C2/Full Stack Book Appointment App/certificate/DigiCertGlobalRootCA.crt.pem'), // Path to the CA certificate
      
    }
  }
});

module.exports = sequelize;