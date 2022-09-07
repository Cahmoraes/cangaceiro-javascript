System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      let ApplicationException = class ApplicationException extends Error {
        constructor(message = '') {
          super(message);
          this.name = this.constructor.name;
        }
      };

      _export('ApplicationException', ApplicationException);

      const exception = ApplicationException;

      function IsApplicationException(err) {
        return err instanceof exception || Object.getPrototypeOf(err) instanceof exception;
      }

      _export('IsApplicationException', IsApplicationException);

      function getExceptionMessage(err) {
        if (IsApplicationException(err)) {
          return err.message;
        }
        console.log(err);
        return 'Não foi possível realizar a operação';
      }

      _export('getExceptionMessage', getExceptionMessage);
    }
  };
});
//# sourceMappingURL=ApplicationException.js.map