import request from 'superagent'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getFavLanguages() {
  const result = await request.get(`${rootURL}/fav-languages`)
  return result
}

export async function getFavLanguageVotes() {
  const result = await request.get(`${rootURL}/fav-languages/fav-votes`)
  return result
}

export async function sendVote(id: string) {
  const result = await request.post(`${rootURL}/fav-languages/${id}`)
  return result
}
