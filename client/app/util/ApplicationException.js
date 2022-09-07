System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      class ApplicationException extends Error {
        constructor(message = '') {
          super(message);
          this.name = this.constructor.name;
        }
      }

      _export('ApplicationException', ApplicationException);
    }
  };
});
//# sourceMappingURL=ApplicationException.js.map