import request from 'superagent'

const rootURL = '/api/v1'

export async function getTestingMessages(token: string) {
  const result = await request
    .get(`${rootURL}/testing`)
    .set('Authorization', `Bearer ${token}`)
  return result.body
}
