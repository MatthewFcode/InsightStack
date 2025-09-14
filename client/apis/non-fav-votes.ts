import request from 'superagent'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getLeastFavLanguages() {
  const result = await request.get(`${rootURL}/least-fav-languages`)
  return result.body
}

export async function getLeastFavLangVotes() {
  const result = await request.get(
    `${rootURL}/least-fav-languages/least-fav-votes`,
  )
  return result.body
}

export async function sendLeastFavVote(id: string) {
  const result = await request.post(`${rootURL}/least-fav-languages/${id}`)
  return result.body
}
