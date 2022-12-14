import { View } from '../views/View.js'
import { DateConverter } from '../converters/DateConverter.js'
export class NegociacoesView extends View {
  update(model) {
    this._elemento.innerHTML = this.template(model)
  }

  template(model) {
    return /* html */ `
    <table class="table table-hover table-bordered">
    <thead>
      <tr>
        <th>DATA</th>
        <th>QUANTIDADE</th>
        <th>VALOR</th>
        <th>VOLUME</th>
      </tr>
    </thead>
    <tbody>
      ${model
        .paraArray()
        .map(
          (negociacao) => /* html */ `
        <tr>
          <td>${DateConverter.paraTexto(negociacao.data)}</td>
          <td>${negociacao.quantidade}</td>
          <td>${negociacao.valor}</td>
          <td>${negociacao.volume}</td>
        </tr>
        `,
        )
        .join('')}
    </tbody>
    <tfoot>
          <tr>
            <td colspan="3"></td>
            <td>${model.volumeTotal}</td>
          </tr>
    </tfoot>
  </table>
  `
  }
}
