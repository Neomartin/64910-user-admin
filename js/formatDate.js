function formatDate( fecha ) {

    const collator = new Intl.DateTimeFormat('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  
    const fechaFormateada = collator.format(fecha)
  
    // Devolver una fecha en formato correcto
    return fechaFormateada
  
}