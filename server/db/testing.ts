import connection from './connection.ts'

const db = connection

export async function getTestingMessages() {
  return await db('testing').select().first()
}
