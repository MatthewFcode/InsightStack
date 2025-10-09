import nock from 'nock'
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { getFavLanguages, getFavLanguageVotes, sendVote } from '../fav-votes.ts'

beforeAll(() => {
  nock.cleanAll()
})

beforeEach(() => {
  nock.cleanAll()
})

afterAll(() => {
  expect(nock.isDone()).toBe(true)
})

describe('Gets names of the favourite programmng languages using getFavLanguages()', () => {
  it('send a get request to the server and returns with all of the names of the favourite languages', async () => {
    const backEndConnection = 'http://localhost:3000'
    const fakeResponse = [
      {
        id: 1,
        language: 'HTML',
        image: '/images/Html.png',
      },
      {
        id: 2,
        language: 'CSS',
        image: '/images/Css.png',
      },
      {
        id: 3,
        language: 'JavaScript',
        image: '/images/Js.png',
      },
      {
        id: 4,
        language: 'TypeScript',
        image: '/images/TypeScript.png',
      },
      {
        id: 5,
        language: 'Python',
        image: '/images/Python.png',
      },
      {
        id: 6,
        language: 'SQL',
        image: '/images/Sql.png',
      },
      {
        id: 7,
        language: 'React.js',
        image: '/images/React.png',
      },
      {
        id: 8,
        language: 'Express.js',
        image: '/images/expressjs.svg',
      },
      {
        id: 9,
        language: 'C#',
        image: '/images/C.svg',
      },
      {
        id: 10,
        language: 'Golang',
        image: '/images/Golang.png',
      },
    ]
    nock(backEndConnection)
      .get('/api/v1/fav-languages')
      .reply(200, fakeResponse)
    const result = await getFavLanguages()

    expect(result).toStrictEqual(fakeResponse)
  })
})

describe('gets the total votes for the favourite languages using getFavLanguageVotes', () => {
  it('Send a request to the server and gets the favourite language names and their associated vote count', async () => {
    const backEndConnection = 'http://localhost:3000'
    const fakeResponse = [
      { language: 'JavaScript', votes: 3 },
      { language: 'Python', votes: 2 },
    ]
    nock(backEndConnection)
      .get('/api/v1/fav-languages/fav-votes')
      .reply(200, fakeResponse)
    const result = await getFavLanguageVotes()
    expect(result).toStrictEqual(fakeResponse)
  })
})

describe('voting on the favourite languages using sendVote()', () => {
  it('', async () => {
    const backEndConnection = 'http://localhost:3000'
    const fakeId = '3'
    const fakeResponse = { postedVote: [3] }

    nock(backEndConnection)
      .post(`/api/v1/fav-languages/${fakeId}`)
      .reply(201, fakeResponse)

    const result = await sendVote(fakeId)
    expect(result).toStrictEqual(fakeResponse)
  })
})
