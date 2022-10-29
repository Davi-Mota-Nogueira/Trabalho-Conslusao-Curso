//imports
const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const bodyParser = require('body-parser')
require("dotenv").config();


/* Configurações da Aplicação */

const Paciente = require('./models/Paciente')
const Usuario = require('./models/Usuario')
const Especialidade_Medica = require('./models/Especialidade_Medica')
const Tipo_Atendimento = require('./models/Tipo_Atendimento')
const Consulta = require('./models/Consulta')

//Para as relações de Foreign Keys
Usuario.hasMany(Consulta)
Consulta.belongsTo(Usuario)

Especialidade_Medica.hasMany(Consulta)
Consulta.belongsTo(Especialidade_Medica)

Tipo_Atendimento.hasMany(Consulta)
Consulta.belongsTo(Tipo_Atendimento)


//Configuração do Handlebars

app.engine('hbs', hbs.engine({
    extname: 'hbs', 
    defaultLayout: 'main',
    
}))

app.set('view engine', 'hbs')

app.use(express.static('public'))

//Configurando o bodyParser
app.use(bodyParser.urlencoded({extended: false}))


/* Configurações de Rotas */

//Página Inicial - Login
app.get('/', (req, res) => {
    return res.render('index', {layout:'mainLogin'});
});

//Página Principal - Pacientes
app.get('/home', (req, res) => {
    Paciente.findAll().then((valores) => {
        if (valores.length > 0) {
            res.render('home', {NavActivePac:true, table: true, pacientes: valores.map(valores => valores.toJSON()) } )
        } else {
            res.render('home', {NavActivePac:true, table: false} )
        }
    }).catch((err) => {
        console.log(`Houve um problema: ${err}`)
    })
})

//Página do Paciente - Resumo
app.post('/paciente-resumo', (req, res) => {
    let cpf = req.body.cpf
    Paciente.findByPk(cpf).then((dados) => {
        return res.render('paciente-resumo', {error: false, NavActivePac:true, NavActiveResumo: true, prontuario: dados.prontuario, nome: dados.nome, cpf: dados.cpf})
    }).catch((err) => {
        console.log(err)
        return res.render('paciente-resumo', {error: true, problema: 'Não é possível acessar esse registro!'})
    })
})

//Página do Paciente - Dados Cadastrais
app.post('/editar', (req, res) => {
    let cpf = req.body.cpf
    Paciente.findByPk(cpf).then((dados) => {
        return res.render('editar', 
        {error: false, 
            NavActivePac:true, 
            NavActiveDadosCad: true,
            prontuario: dados.prontuario, 
            nomeMae: dados.nomeMae, 
            nome: dados.nome, 
            cpf: dados.cpf,
            dataNasc: dados.dataNasc,
            sexo: dados.sexo,
            tel: dados.telefone,
            email: dados.email,
            cep: dados.cep,
            rua: dados.logradouro,
            numero: dados.numero,
            cidade: dados.cidade,
            bairro: dados.bairro,
            complemento: dados.complemento,
            uf: dados.uf,
            numeroSUS: dados.numeroSUS
        })
    }).catch((err) => {
        console.log(err)
        return res.render('editar', {error: true, problema: 'Não é possível editar esse registro!'})
    })  
})

//Página do Paciente - Atualizar Dados Cadastrais
app.post('/atualizar', (req, res) => {
    var prontuario = req.body.prontuario;
    var nomeMae = req.body.nomeMae;
    var nome = req.body.nome;
    var dataNasc = req.body.dataNasc;
    var sexo = req.body.sexo;
    var telefone = req.body.tel;
    var email = req.body.email;
    var numero = req.body.numero;
    var cep = req.body.cep;
    var logradouro = req.body.rua;
    var cidade = req.body.cidade;
    var bairro = req.body.bairro;
    var complemento = req.body.complemento;
    var uf = req.body.uf;
    var numeroSUS = req.body.numeroSUS;
    Paciente.update(
        {
            prontuario: prontuario, 
            nomeMae: nomeMae, 
            nome: nome,
            dataNasc: dataNasc,
            sexo: sexo,
            telefone: telefone,
            email: email,
            cep: cep,
            logradouro: logradouro,
            numero: numero,
            cidade: cidade,
            bairro: bairro,
            complemento: complemento,
            uf: uf,
            numeroSUS: numeroSUS
        },
        {
            where: {
                cpf: req.body.cpf
            }
        }).then((resultado)=>{
            console.log(resultado);
            return res.redirect('/home');
        }).catch((err)=>{
            console.log(err);
        })
})

//Página para Marcar Consultas
app.post('/consulta', (req, res) => {
    let cpf = req.body.cpf
    Paciente.findByPk(cpf).then((dados) => {
        return res.render('consulta', 
        {error: false, 
            NavActivePac:true, 
            NavActiveDadosCad: true,
            prontuario: dados.prontuario, 
            nomeMae: dados.nomeMae, 
            nome: dados.nome, 
            cpf: dados.cpf,
            dataNasc: dados.dataNasc,
            sexo: dados.sexo,
            tel: dados.telefone,
            email: dados.email,
            cep: dados.cep,
            rua: dados.logradouro,
            numero: dados.numero,
            cidade: dados.cidade,
            bairro: dados.bairro,
            complemento: dados.complemento,
            uf: dados.uf,
            numeroSUS: dados.numeroSUS
        })
    }).catch((err) => {
        console.log(err)
        return res.render('consulta', {error: true, problema: 'Não é possível marcar consulta.'})
    })  
})

//Ação para Criação de Consulta
app.post('/marcar-consulta',(req,res)=>{
    //VALORES VINDOS DO FORMULARIO
    let dia = req.body.dia;
    let mes = req.body.mes;
    let ano = req.body.ano;
    let hora = req.body.hora;
    let minuto = req.body.minuto;
    let dataConsulta = dia + '/' + mes + '/' + ano + ' ' + hora + ':' + minuto;
    let queixaPaciente = req.body.queixaPaciente;
    
    Consulta.create({
        id_consulta: Math.floor(Math.random()*200),
        dataConsulta: dataConsulta,
        queixaPaciente: queixaPaciente
    }).then(function(){
        console.log('Cadastrado com sucesso!');
        return res.redirect('/home');
    }).catch(function(erro){
        console.log(`Ops, houve um erro: ${erro}`);
    })
});

//Página de Relatórios
app.get('/relatorios', (req, res) => {
    res.render('relatorios', {NavActiveRel: true})
});

//Página de Cadastros
app.get('/cadastros', (req, res) => {
    res.render('cadastros', {NavActiveCad: true})
});


/* Inicialização do Servidor */
const PORT = process.env.NODE_LOCAL_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta ${PORT}!`)
});
