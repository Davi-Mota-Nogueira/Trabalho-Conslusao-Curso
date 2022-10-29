const db = require('./db')

const Consulta = db.sequelize.define('consulta', {
    id_consulta: {
        type: db.Sequelize.INTEGER,
        auto_increment: true,
        allowNull: false,
        primaryKey: true
    },
    dataConsulta: {
        type: db.Sequelize.STRING(100),
        allowNull: false
        // get: function(){
        //     return this.getDataValue('dataConsulta').toLocaleString('en-GB', {timeZone: 'UTC'});
        // }
    },
    queixaPaciente: {
        type: db.Sequelize.TEXT,
        allowNull: false
    }
    
})  

Consulta.sync()

module.exports = Consulta 