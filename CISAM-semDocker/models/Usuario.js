const db = require('./db')

const Usuario = db.sequelize.define('usuario', {
    cpf_usuario: {
        type: db.Sequelize.STRING(11),
        allowNull: false,
        primaryKey: true
    },
    nomeUsuario: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
	email: {
        type: db.Sequelize.STRING, 
        unique: true,
        allowNull: false
    },
	senha: {
        type: db.Sequelize.STRING,
        allowNull: false
    }, 
	telefone: {
        type: db.Sequelize.STRING(11),
        allowNull: false
    },
	codCategoria: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
	nomeCategoria: {
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
        type: db.Sequelize.STRING(2),
        allowNull: false
    }
}) 

Usuario.sync()

module.exports = Usuario