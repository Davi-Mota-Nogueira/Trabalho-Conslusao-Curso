const db = require('./db')

const Especialidade_Medica = db.sequelize.define('especialidadeMedica', {
    id_especialidade: {
        type: db.Sequelize.INTEGER,
        auto_increment: true,
        allowNull: false,
        primaryKey: true
    },
    nomeEspecialidade: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
}) 

Especialidade_Medica.sync()

module.exports = Especialidade_Medica