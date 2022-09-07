System.register([], function (_export, _context) {
  "use strict";

  function controller(...seletores) {
    const elements = seletores.map(seletor => document.querySelector(seletor));

    return function (constructor) {
      const construtorOriginal = constructor;

      const construtorNovo = function () {
        return new construtorOriginal(...elements);
      };

      Object.setPrototypeOf(construtorNovo.prototype, construtorOriginal.prototype);

      return construtorNovo;
    };
  }

  _export("controller", controller);

  return {
    setters: [],
    execute: function () {}
  };
});
//# sourceMappingURL=Controller.js.map