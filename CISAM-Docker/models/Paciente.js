const db = require('./db')

const Paciente = db.sequelize.define('paciente', {
    cpf: {
        type: db.Sequelize.STRING(14),
        allowNull: false,
        primaryKey: true
    },
    termoLGPD: {
        type: db.Sequelize.STRING(3),
        allowNull: false
     },     
    prontuario:{
        type: db.Sequelize.STRING(11),
        allowNull: false
    },
    nome:{
        type: db.Sequelize.STRING,
        allowNull: false
    },
    nomeSocial: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    telefone: {
        type: db.Sequelize.STRING(11),
        allowNull: false
    }, 
    dataNasc: {
        type: db.Sequelize.DATEONLY,
        allowNull: false
    },
    sexo: {
        type: db.Sequelize.STRING(1),
        allowNull: false
    },
    nomeMae: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
	 cep: {
        type: db.Sequelize.STRING(9),
        allowNull: false
     },
	 logradouro: {
        type: db.Sequelize.STRING,
        allowNull: false
     },
	 numero: {
        type: db.Sequelize.STRING,
        allowNull: false
     },
	 complemento: {
        type: db.Sequelize.STRING,
        allowNull: true
     },
	 bairro: {
        type: db.Sequelize.STRING,
        allowNull: false
     },
	 cidade: {
        type: db.Sequelize.STRING,
        allowNull: false
     },
     uf: {
        type: db.Sequelize.STRING,
        allowNull: false
     },
	 numeroSUS: {
        type: db.Sequelize.STRING,
        allowNull: false
     },
	 certidaoNasc: {
        type: db.Sequelize.STRING,
        allowNull: true
     },
	 certidaoCas: {
        type: db.Sequelize.STRING,
        allowNull: true
     } 
}) 

Paciente.sync()

module.exports = Paciente