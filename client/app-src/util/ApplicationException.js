export class ApplicationException extends Error {
  constructor(message = '') {
    super(message)
    this.name = this.constructor.name
  }
}

const exception = ApplicationException

export function IsApplicationException(err) {
  return (
    err instanceof exception || Object.getPrototypeOf(err) instanceof exception
  )
}

export function getExceptionMessage(err) {
  if (IsApplicationException(err)) {
    return err.message
  }
  console.log(err)
  return 'Não foi possível realizar a operação'
}
