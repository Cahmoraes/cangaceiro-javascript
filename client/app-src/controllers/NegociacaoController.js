import { Negociacoes, NegociacaoService, Negociacao } from '../domain/index.js'
import {
  NegociacoesView,
  MensagemView,
  Mensagem,
  DataInvalidaException,
  DateConverter,
} from '../ui/index.js'
import { getNegociacaoDao, Bind } from '../util/index.js'

export class NegociacaoController {
  constructor() {
    const $ = document.querySelector.bind(document)

    this._inputData = $('#data')
    this._inputQuantidade = $('#quantidade')
    this._inputValor = $('#valor')

    this._negociacoes = new Bind(
      new Negociacoes(),
      new NegociacoesView('#negociacoes'),
      'adiciona',
      'esvazia',
    )

    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView('#mensagemView'),
      'texto',
    )

    this._service = new NegociacaoService()

    this._init()
  }

  adiciona(event) {
    try {
      event.preventDefault()

      const negociacao = this._criaNegociacao()

      getNegociacaoDao()
        .then((dao) => dao.adiciona(negociacao))
        .then(() => {
          this._negociacoes.adiciona(negociacao)
          this._mensagem.texto = 'Negociação adicionada com sucesso'
          this._limpaFormulario()
        })
        .catch((err) => (this._mensagem.texto = err))
    } catch (err) {
      console.log(err)
      console.log(err.stack)
      if (err instanceof DataInvalidaException) {
        this._mensagem.texto = err.message
      } else {
        this._mensagem.texto =
          'Um erro não esperado aconteceu. Entre em contato com o suporte'
      }
    }
  }

  apaga() {
    try {
      getNegociacaoDao()
        .then((dao) => dao.apagaTodos())
        .then(() => {
          this._negociacoes.esvazia()
          this._mensagem.texto = 'Negociações apagadas com sucesso'
        })
    } catch (err) {
      this._mensagem.texto = err
    }
  }

  importaNegociacoes() {
    this._service
      .obtemNegociacoesDoPeriodo()
      .then((novasNegociacoes) =>
        novasNegociacoes.filter(
          (novaNegociacao) =>
            !this._negociacoes
              .paraArray()
              .some((negociacaoExistente) =>
                negociacaoExistente.equals(novaNegociacao),
              ),
        ),
      )
      .then((negociacoes) =>
        negociacoes.forEach((negociacao) =>
          this._negociacoes.adiciona(negociacao),
        ),
      )
      .then(() => (this._mensagem.texto = 'Negociações importadas com sucesso'))
      .catch(
        () =>
          (this._mensagem.texto = 'Não foi possível importar as negociações'),
      )
  }

  _limpaFormulario() {
    this._inputData.value = ''
    this._inputQuantidade.value = 1
    this._inputValor.value = 0.0
    this._inputData.focus()
  }

  _criaNegociacao() {
    return new Negociacao(
      DateConverter.paraData(this._inputData.value),
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value),
    )
  }

  _init() {
    getNegociacaoDao()
      .then((dao) => dao.listaTodos())
      .then((negociacoes) =>
        negociacoes.forEach((negociacao) =>
          this._negociacoes.adiciona(negociacao),
        ),
      )
      .catch((err) => (this._mensagem.texto = err))
  }
}