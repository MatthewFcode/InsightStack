import nock from 'nock'
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import {
  getLeastFavLanguages,
  getLeastFavLangVotes,
  sendLeastFavVote,
} from '../non-fav-votes.ts'

beforeAll(() => {
  nock.cleanAll()
})

beforeEach(() => {
  nock.cleanAll()
})

afterAll(() => {
  expect(nock.isDone()).toBe(true)
})

describe('Gets names of the least favourite programmng languages using getLeastFavLanguages()', () => {
  it('send a get request to the server and returns with all of the names of the least favourite languages', async () => {
    const backEndConnection = 'http://localhost:3000'
    const fakeResponse = [
      {
        id: 1,
        least_favourite_language: 'HTML',
        image: '/images/Html.png',
      },
      {
        id: 2,
        least_favourite_language: 'CSS',
        image: '/images/Css.png',
      },
      {
        id: 3,
        least_favourite_language: 'JavaScript',
        image: '/images/Js.png',
      },
      {
        id: 4,
        least_favourite_language: 'TypeScript',
        image: '/images/TypeScript.png',
      },
      {
        id: 5,
        least_favourite_language: 'Python',
        image: '/images/Python.png',
      },
      {
        id: 6,
        least_favourite_language: 'SQL',
        image: '/images/Sql.png',
      },
      {
        id: 7,
        least_favourite_language: 'React.js',
        image: '/images/React.png',
      },
      {
        id: 8,
        least_favourite_language: 'Express.js',
        image: '/images/expressjs.svg',
      },
      {
        id: 9,
        least_favourite_language: 'C#',
        image: '/images/C.svg',
      },
      {
        id: 10,
        least_favourite_language: 'Golang',
        image: '/images/Golang.png',
      },
    ]
    nock(backEndConnection)
      .get('/api/v1/least-fav-languages')
      .reply(200, fakeResponse)
    const result = await getLeastFavLanguages()

    expect(result).toStrictEqual(fakeResponse)
  })
})

describe('gets the total votes for the least favourite languages using getLeastFavLangVotes()', () => {
  it('Send a request to the server and gets the least favourite language names and their associated vote count', async () => {
    const backEndConnection = 'http://localhost:3000'
    const fakeResponse = [
      { language: 'JavaScript', votes: 3 },
      { language: 'Python', votes: 2 },
    ]
    nock(backEndConnection)
      .get('/api/v1/least-fav-languages/least-fav-votes')
      .reply(200, fakeResponse)
    const result = await getLeastFavLangVotes()
    expect(result).toStrictEqual(fakeResponse)
  })
})

describe('voting on the least favourite languages using sendLeastFavVote()', () => {
  it('', async () => {
    const backEndConnection = 'http://localhost:3000'
    const fakeId = '3'
    const fakeResponse = { postedVote: [3] }

    nock(backEndConnection)
      .post(`/api/v1/least-fav-languages/${fakeId}`)
      .reply(201, fakeResponse)

    const result = await sendLeastFavVote(fakeId)
    expect(result).toStrictEqual(fakeResponse)
  })
})
