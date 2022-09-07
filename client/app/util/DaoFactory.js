function getNegociacaoDao() {
  return ConnectionFactory.getConnection()
    .then((conn) => new NegociacaoDao(conn))
    .catch((err) => reject(err))
}
