//Importando o Express
const express = require("express");
//Iniciando o Express e armazenando na variável app
const app = express();
const bodyParser = require("body-parser");
//utilizando a validação no banco de dados por meio de localhost usuário e senha
const connection = require("./database/database");

//importação do model para que os dados informados no formulário sejam enviados ao banco de dados
const Pergunta = require("./database/Pergunta"); 
const Resposta = require("./database/Resposta");

//database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados")
     })

     .catch((msgErro) => {
        console.log(msgErro);
     })


//comando para o Express utilizar o EJS como view engine
app.set('view engine', 'ejs');
//comando para o Express utilizar arquivos estáticos
app.use(express.static('public'));

//sessão bodyParser
//comando que permite que os dados sejam enviados decodificados em javascript
app.use(bodyParser.urlencoded({extended: false}));

//permite que leia dados de formulários enviados via json
app.use(bodyParser.json());

//ROTAS
app.get("/",(req, res) => {
    //método que vai procurar todas perguntas e retornar
    //equivalente ao código SQL '' SELECT * ALL FROM perguntas
    Pergunta.findAll({raw: true, order:[
        ['id','DESC']//ordem de exibição das perguntas
    ]}).then(pergunta =>{ //comando que usa o model para listar as perguntas do database pergunta
        res.render("index",{
            perguntas: pergunta //variável para receber as perguntas do banco de dados na view
    
        });
    });
});

app.get("/perguntar",(req,res) => {
    res.render("perguntar");
});

//enviar dado para o backend
//rota que vai armazenar dados na tabela pergunta
app.post("/salvarpergunta",(req,res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    //método que irá salvar o dado na tabela
    //equivalente ao código SQL '' INSERT INTO perguntas
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    //redirecionamento para a rota da página inicial
    }).then(() => {
        res.redirect("/");
    });
});

app.get("/pergunta/:id",(req,res) => {
    //variável que recebe um parâmetro
    var id = req.params.id; 

    // método do Sequelize que busca um dado de acordo com uma condição
    Pergunta.findOne({
        //condição da busca
        where: {id: id} 
    }).then(pergunta => {
        //condição caso a pergunta seja encontrada
        if(pergunta != undefined){ 
            //método para mostrar as perguntas e respectivas respostas registradas
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                    ['id','DESC']
                ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
            
            
          
        //condição caso a pergunta não seja encontrada, onde será redirecionado à pagina inicial
        }else{
            res.redirect("/"); 
        }
    });

});

//enviar dado para o backend
//rota que vai armazenar dados da tabela respostas 
app.post("/responder",(req,res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    //redirecionamento da rota para a página da pergunta que foi respondida usando a concatenação com a variável que recebeu a id da pergunta
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
});

//porta do servidor Express
app.listen(4000,()=> {console.log("App rodando!");})