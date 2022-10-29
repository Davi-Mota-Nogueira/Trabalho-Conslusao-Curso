function applyExtraSetup(sequelize) {
	const { Usuario, Consulta, Especialidade_Medica, Tipo_Atendimento } = sequelize.models;

	Usuario.hasMany(Consulta)
    Consulta.belongsTo(Usuario)

    Especialidade_Medica.hasMany(Consulta)
    Consulta.belongsTo(Especialidade_Medica)

    Tipo_Atendimento.hasMany(Consulta)
    Consulta.belongsTo(Tipo_Atendimento)
}

module.exports = { applyExtraSetup };
