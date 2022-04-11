//model do banco de dados
//pelas boas práticas, o nome de um arquivo model deve ter inicial MAIÚSCULA
const Sequelize = require("sequelize");
const connection = require("./database");

//criação da tabela do banco de dados usando JavaScript
const Pergunta = connection.define('pergunta',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(() => {});

//exportação do módulo de pergunta
module.exports = Pergunta;