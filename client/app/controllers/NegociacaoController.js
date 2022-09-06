class NegociacaoController {
  constructor() {
    const $ = document.querySelector.bind(document)

    this._inputData = $('#data')
    this._inputQuantidade = $('#quantidade')
    this._inputValor = $('#valor')

    // this._negociacoes = new Negociacoes((model) => {
    //   this._negociacoesView.update(model)
    // })

    const self = this
    this._negociacoes = new Proxy(new Negociacoes(), {
      get(target, prop, receiver) {
        if (
          typeof target[prop] === 'function' &&
          ['adiciona', 'esvazia'].includes(prop)
        ) {
          return function (...args) {
            console.log(`${prop} disparou a armadilha`)
            self._negociacoesView.update(target)
            return Reflect.apply(target[prop], target, args)
          }
        }
        return Reflect.get(target, prop, receiver)
      },
    })

    this._negociacoesView = new NegociacoesView('#negociacoes')
    this._negociacoesView.update(this._negociacoes)

    this._mensagem = new Mensagem()
    this._mensagemView = new MensagemView('#mensagemView')
    this._mensagemView.update(this._mensagem)
  }

  adiciona(event) {
    event.preventDefault()

    this._negociacoes.adiciona(this._criaNegociacao())
    this._mensagem.texto = 'Negociação adicionada com sucesso'
    this._mensagemView.update(this._mensagem)
    this._limpaFormulario()
    // this._negociacoesView.update(this._negociacoes)
  }

  apaga() {
    this._negociacoes.esvazia()
    // this._negociacoesView.update(this._negociacoes)
    this._mensagem.texto = 'Negociações apagadas com sucesso'
    this._mensagemView.update(this._mensagem)
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
}
