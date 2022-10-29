const db = require('./db')

const Tipo_Atendimento = db.sequelize.define('tipoAtendimento', {
    id_atendimento: {
        type: db.Sequelize.INTEGER,
        auto_increment: true,
        allowNull: false,
        primaryKey: true
    },
    nomeAtendimento: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
}) 

Tipo_Atendimento.sync()

module.exports = Tipo_Atendimento   
    
    
    