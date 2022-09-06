const controller = new NegociacaoController()

document
  .querySelector('.form')
  .addEventListener('submit', controller.adiciona.bind(controller))

document
  .querySelector('#botao-apaga')
  .addEventListener('click', controller.apaga.bind(controller))

const negociacao = new Proxy(new Negociacao(new Date(), 1, 100), {
  get(target, prop, receiver) {
    console.log(`Acessando a propriedade: ${prop}`)
    return Reflect.get(target, prop, receiver)
  },
  set(target, prop, newValue, handler) {
    console.log(`Acessando a propriedade: ${prop}`)
    target[prop] = newValue
    return Reflect.set(target, prop, newValue, handler)
  },
})
