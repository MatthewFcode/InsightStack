import request from 'superagent'

const rootURL =
  typeof document !== 'undefined'
    ? new URL(`/api/v1`, document.baseURI)
    : 'http://localhost:3000/api/v1'

export async function getFavLanguages() {
  const result = await request.get(`${rootURL}/fav-languages`)
  return result.body
}

export async function getFavLanguageVotes() {
  const result = await request.get(`${rootURL}/fav-languages/fav-votes`)
  return result.body
}

export async function sendVote(id: string) {
  const result = await request.post(`${rootURL}/fav-languages/${id}`)
  return result.body
}
