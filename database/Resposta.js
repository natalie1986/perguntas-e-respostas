//model do banco de dados
//pelas boas práticas, o nome de um arquivo model deve ter inicial MAIÚSCULA
const Sequelize = require("sequelize");
const connection = require("./database");

//criação da tabela do banco de dados usando JavaScript
const Resposta = connection.define('respostas',{
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    //criação mais simples do relacionamento entre tabelas
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false

    }
});

Resposta.sync({force: false});

module.exports = Resposta;
