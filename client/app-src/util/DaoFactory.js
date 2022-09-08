import { ConnectionFactory } from './ConnectionFactory'
import { NegociacaoDao } from '../domain/negociacao/NegociacaoDao'

export async function getNegociacaoDao() {
  try {
    const conn = await ConnectionFactory.getConnection()
    return new NegociacaoDao(conn)
  } catch (err) {
    return err
  }
}
