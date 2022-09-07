export class HttpService {
  get(url) {
    return fetch(url).then(this._handleErrors)
  }

  _handleErrors(response) {
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
  }
}
