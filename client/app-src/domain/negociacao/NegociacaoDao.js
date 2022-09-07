import { Negociacao } from './Negociacao.js'
export class NegociacaoDao {
  constructor(connection) {
    this._connection = connection
    this._store = 'negociacoes'
  }

  adiciona(negociacao) {
    return new Promise((resolve, reject) => {
      const request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .add(negociacao)

      request.onsuccess = () => resolve()

      request.onerror = (event) => {
        console.log(event.target.error)
        reject('Não foi possível salvar a negociação')
      }
    })
  }

  listaTodos() {
    return new Promise((resolve, reject) => {
      const negociacoes = []

      const cursor = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .openCursor()

      cursor.onsuccess = (event) => {
        const atual = event.target.result
        if (atual) {
          const negociacao = new Negociacao(
            new Date(atual.value._data),
            atual.value._quantidade,
            atual.value._valor,
          )
          negociacoes.push(negociacao)
          atual.continue()
        } else {
          resolve(negociacoes)
        }
      }

      cursor.onerror = (event) => {
        console.log(event.target.error)
        reject('Não foi possível listar as negociações')
      }
    })
  }

  apagaTodos() {
    return new Promise((resolve, reject) => {
      const request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .clear()

      request.onsuccess = () => resolve()

      request.onerror = (event) => {
        console.log(event.target.error)
        reject('Não foi possível apagar as negociações')
      }
    })
  }
}
