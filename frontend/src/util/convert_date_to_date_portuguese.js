export const convert_date_to_portugueseDate = ( dateInicio, dateFim ) => {
    const dateProcessedInicio = dateInicio.slice(0, 10)
    const dateProcessedFim = dateFim.slice(0, 10)

    const newDateInicio = new Date(dateProcessedInicio)
    const newDateFim = new Date(dateProcessedFim)

    const meses = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho", 
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
      ]

    const diaInicio = newDateInicio.getUTCDate()
    const mesInicio = meses[newDateInicio.getUTCMonth()]

    const diaFim = newDateFim.getUTCDate()
    const mesFim = meses[newDateFim.getUTCMonth()]

    const dateFormated = `${diaInicio} de ${mesInicio} - ${diaFim} de ${mesFim}`

    return dateFormated
}