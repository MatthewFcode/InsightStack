import connection from './connection'
import { User } from '../../models/users.ts'

const db = connection

export async function getUserById(auth0Id: string): Promise<User | undefined> {
  try {
    const selectedUser = await db('users')
      .where('users.auth0Id', auth0Id)
      .first()
    return selectedUser
  } catch (err) {
    console.log('Whoops', err)
  }
}

export async function createUser(newUser: {
  auth0Id: string
  username: string
  email: string
  current_position: string
  about_me: string
  profile_photo_url: string
  created_at: string
  location: string
}): Promise<User[] | undefined> {
  try {
    const addingUser = await db('users').insert(newUser).returning('*')
    console.log(addingUser)
    return addingUser
  } catch (err) {
    console.log('Whoops', err)
  }
}
