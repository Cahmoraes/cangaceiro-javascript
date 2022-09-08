import { HttpService } from '../../util/HttpService.js'
import { Negociacao } from './Negociacao.js'
import { ApplicationException } from '../../util/ApplicationException.js'
export class NegociacaoService {
  constructor() {
    this._http = new HttpService()
  }

  obterNegociacoesDaSemana() {
    return this._http.get(`${SERVICE_URL}/negociacoes/semana`).then(
      (dados) =>
        dados.map(
          (dado) =>
            new Negociacao(new Date(dado.data), dado.quantidade, dado.valor),
        ),
      (err) => {
        throw new ApplicationException(
          'Não foi possível obter as negociações da semana',
        )
      },
    )
  }

  obterNegociacoesDaSemanaAnterior() {
    return this._http.get(`${SERVICE_URL}/negociacoes/anterior`).then(
      (dados) =>
        dados.map(
          (dado) =>
            new Negociacao(new Date(dado.data), dado.quantidade, dado.valor),
        ),
      (err) => {
        throw new ApplicationException(
          'Não foi possível obter as negociações da semana anterior',
        )
      },
    )
  }

  obterNegociacoesDaSemanaRetrasada() {
    return this._http.get(`${SERVICE_URL}/negociacoes/retrasada`).then(
      (dados) =>
        dados.map(
          (dado) =>
            new Negociacao(new Date(dado.data), dado.quantidade, dado.valor),
        ),
      (err) => {
        throw new ApplicationException(
          'Não foi possível obter as negociações da semana retrasada',
        )
      },
    )
  }

  async obtemNegociacoesDoPeriodo() {
    try {
      const periodo = await Promise.all([
        this.obterNegociacoesDaSemana(),
        this.obterNegociacoesDaSemanaAnterior(),
        this.obterNegociacoesDaSemanaRetrasada(),
      ])

      return periodo
        .reduce((acc, array) => acc.concat(array), [])
        .sort((a, b) => b.data.getTime() - a.data.getTime())
    } catch (err) {
      this._mensagem.texto = 'Não foi possível obter as negociações do período'
    }
  }
}
