class NegociacaoService {
  constructor() {
    this._http = new HttpService()
  }

  obterNegociacoesDaSemana() {
    return this._http.get('negociacoes/semana').then(
      (dados) =>
        dados.map(
          (dado) =>
            new Negociacao(new Date(dado.data), dado.quantidade, dado.valor),
        ),
      (err) => {
        throw new Error('Não foi possível obter as negociações da semana')
      },
    )
  }

  obterNegociacoesDaSemanaAnterior() {
    return this._http.get('negociacoes/anterior').then(
      (dados) =>
        dados.map(
          (dado) =>
            new Negociacao(new Date(dado.data), dado.quantidade, dado.valor),
        ),
      (err) => {
        throw new Error(
          'Não foi possível obter as negociações da semana anterior',
        )
      },
    )
  }

  obterNegociacoesDaSemanaRetrasada() {
    return this._http.get('negociacoes/retrasada').then(
      (dados) =>
        dados.map(
          (dado) =>
            new Negociacao(new Date(dado.data), dado.quantidade, dado.valor),
        ),
      (err) => {
        throw new Error(
          'Não foi possível obter as negociações da semana retrasada',
        )
      },
    )
  }

  obtemNegociacoesDoPeriodo() {
    return Promise.all([
      this.obterNegociacoesDaSemana(),
      this.obterNegociacoesDaSemanaAnterior(),
      this.obterNegociacoesDaSemanaRetrasada(),
    ])
      .then((periodo) => periodo.reduce((acc, array) => acc.concat(array), []))
      .catch(
        (err) =>
          (this._mensagem.texto =
            'Não foi possível obter as negociações do período'),
      )
  }
}
