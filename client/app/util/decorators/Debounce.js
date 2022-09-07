System.register([], function (_export, _context) {
  "use strict";

  function debounce(milissegundos = 500) {
    return (target, propertyKey, descriptor) => {
      const metodoOriginal = descriptor.value;
      let timer = 0;

      descriptor.value = function (...args) {
        const event = args[0];
        if (event instanceof SubmitEvent) event.preventDefault();

        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          Reflect.apply(metodoOriginal, this, args);
        }, milissegundos);
      };

      return descriptor;
    };
  }

  _export("debounce", debounce);

  return {
    setters: [],
    execute: function () {}
  };
});
//# sourceMappingURL=Debounce.js.map