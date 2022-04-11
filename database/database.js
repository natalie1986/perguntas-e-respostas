//conexão database

const Sequelize = require('sequelize');
//usando Sequelize para criar uma conexão com o banco de dados
//informa os 3 parâmetros: local, usuário e senha
const connection = new Sequelize('guiaperguntas', 'root', '01261986',{
    host: 'localhost',
    dialect: 'mysql'

});

module.exports = connection;

    