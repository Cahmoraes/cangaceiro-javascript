System.register(['../../util/HttpService.js', './Negociacao.js'], function (_export, _context) {
  "use strict";

  var HttpService, Negociacao;
  return {
    setters: [function (_utilHttpServiceJs) {
      HttpService = _utilHttpServiceJs.HttpService;
    }, function (_NegociacaoJs) {
      Negociacao = _NegociacaoJs.Negociacao;
    }],
    execute: function () {
      class NegociacaoService {
        constructor() {
          this._http = new HttpService();
        }

        obterNegociacoesDaSemana() {
          return this._http.get('negociacoes/semana').then(dados => dados.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor)), err => {
            throw new Error('Não foi possível obter as negociações da semana');
          });
        }

        obterNegociacoesDaSemanaAnterior() {
          return this._http.get('negociacoes/anterior').then(dados => dados.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor)), err => {
            throw new Error('Não foi possível obter as negociações da semana anterior');
          });
        }

        obterNegociacoesDaSemanaRetrasada() {
          return this._http.get('negociacoes/retrasada').then(dados => dados.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor)), err => {
            throw new Error('Não foi possível obter as negociações da semana retrasada');
          });
        }

        obtemNegociacoesDoPeriodo() {
          return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(periodo => periodo.reduce((acc, array) => acc.concat(array), [])).then(negociacoes => negociacoes.sort((a, b) => b.data.getTime() - a.data.getTime())).catch(err => this._mensagem.texto = 'Não foi possível obter as negociações do período');
        }
      }

      _export('NegociacaoService', NegociacaoService);
    }
  };
});
//# sourceMappingURL=NegociacaoService.js.map