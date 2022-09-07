export function controller(...seletores) {
  const elements = seletores.map((seletor) => document.querySelector(seletor))

  return function (constructor) {
    const construtorOriginal = constructor

    const construtorNovo = function () {
      return new construtorOriginal(...elements)
    }

    Object.setPrototypeOf(
      construtorNovo.prototype,
      construtorOriginal.prototype,
    )

    return construtorNovo
  }
}
