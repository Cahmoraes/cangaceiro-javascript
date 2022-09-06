class NegociacaoService {
  obterNegociacoesDaSemana(cb) {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', '/negociacoes/semana')

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Obtendo as negociações do servidor')
          const negociacoes = JSON.parse(xhr.responseText).map(
            (objeto) =>
              new Negociacao(
                new Date(objeto.data),
                objeto.quantidade,
                objeto.valor,
              ),
          )

          cb(null, negociacoes)

          // this._mensagem.texto = 'Negociações importadas com sucesso'
        } else {
          console.log('Não foi possível obter as negociações da semana')
          cb(xhr.responseText, null)
          // this._mensagem = 'Não foi possível obter as negociações da semana'
        }
      }
    }

    xhr.send()
  }
}
