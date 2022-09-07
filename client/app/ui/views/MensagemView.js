System.register(['./View.js'], function (_export, _context) {
  "use strict";

  var View;
  return {
    setters: [function (_ViewJs) {
      View = _ViewJs.View;
    }],
    execute: function () {
      class MensagemView extends View {
        template(model) {
          return model.texto ? /* html */`
    <p class="alert alert-info">${model.texto}</p>
    ` : /* html */`
    <p></p>
    `;
        }

        update(model) {
          this._elemento.innerHTML = this.template(model);
        }
      }

      _export('MensagemView', MensagemView);
    }
  };
});
//# sourceMappingURL=MensagemView.js.map