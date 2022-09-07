System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      let ProxyFactory = class ProxyFactory {
        static create(objeto, props, armadilha) {
          return new Proxy(objeto, {
            get(target, prop, receiver) {
              if (ProxyFactory._ehFuncao(target[prop]) && props.includes(prop)) {
                return function (...args) {
                  console.log(`${prop} disparou a armadilha`);
                  const result = Reflect.apply(target[prop], target, args);
                  armadilha(target);
                  return result;
                };
              }
              return Reflect.get(target, prop, receiver);
            },
            set(target, prop, newValue, receiver) {
              const updated = Reflect.set(target, prop, newValue, receiver);
              if (props.includes(prop)) armadilha(target);
              return updated;
            }
          });
        }

        static _ehFuncao(fn) {
          return typeof fn === 'function';
        }
      };

      _export('ProxyFactory', ProxyFactory);
    }
  };
});
//# sourceMappingURL=ProxyFactory.js.map