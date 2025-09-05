import request from 'superagent'

import { User } from '../../models/users.ts'

const rootURL = new URL(`/api/v1`, document.baseURI)

interface GetUserFunction {
  token: string
}

export async function getUser({
  token,
}: GetUserFunction): Promise<User | null> {
  return await request
    .get(`${rootURL}/users`)
    .set('Authorization', `Bearer ${token}`)
    .then((res) => (res.body.user ? res.body.user : null))
}

interface AddUserFunction {
  formData: FormData
  token: string
}
export async function addUser({
  formData,
  token,
}: AddUserFunction): Promise<User> {
  return request
    .post(`${rootURL}/users`)
    .set('Authorization', `Bearer ${token}`)
    .send(formData)
    .then((res) => res.body.user)
}
