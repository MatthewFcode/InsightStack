import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { StatusCodes } from 'http-status-codes'
import connection from '../../db/connection.ts'
import { server } from '../../server.ts'
import request from 'supertest'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

const db = connection

describe('Gets all Programming languages', () => {
  it('selects all the options of programming languages from the database', async () => {
    const result = await request(server).get('/api/v1/fav-languages')
    expect(result.status).toBe(StatusCodes.OK)
    expect(result.body).toEqual([
      {
        id: 1,
        language: 'HTML',
        image: '../../../public/images/Html.png',
      },
      {
        id: 2,
        language: 'CSS',
        image: '../../../public/images/Css.png',
      },
      {
        id: 3,
        language: 'JavaScript',
        image: '../../../public/images/Js.png',
      },
      {
        id: 4,
        language: 'TypeScript',
        image: '../../../public/images/TypeScript.png',
      },
      {
        id: 5,
        language: 'Python',
        image: '../../../public/images/Python.png',
      },
      {
        id: 6,
        language: 'SQL',
        image: '../../../public/images/Sql.png',
      },
      {
        id: 7,
        language: 'React.js',
        image: '../../../public/images/React.png',
      },
      {
        id: 8,
        language: 'Express.js',
        image: '../../../public/images/expressjs.svg',
      },
      {
        id: 9,
        language: 'C#',
        image: '../../../public/images/C.svg',
      },
      {
        id: 10,
        language: 'Golang',
        image: '../../../public/images/Golang.png',
      },
    ])
  })
})

describe('Get total vote counts of the different options', () => {
  it('Retireves all the instances of the different vote counts and counts them', async () => {
    const result = await request(server).get('/api/v1/fav-languages/fav-votes')
    expect(result.status).toBe(StatusCodes.OK)
    expect(result.body).toEqual([
      { language: 'C#', votes: 1 },
      { language: 'CSS', votes: 1 },
      { language: 'Express.js', votes: 1 },
      { language: 'Golang', votes: 1 },
      { language: 'HTML', votes: 1 },
      { language: 'JavaScript', votes: 1 },
      { language: 'Python', votes: 1 },
      { language: 'React.js', votes: 1 },
      { language: 'SQL', votes: 1 },
      { language: 'TypeScript', votes: 1 },
    ])
  })
})
describe('Adds a vote to the most used programming languages', () => {
  it('adds an intance of the programming language selected to the database', async () => {
    const [postId] = '3'
    const result = await request(server).post(`/api/v1/fav-languages/${postId}`)
    expect(result.status).toBe(StatusCodes.CREATED)
  })
})
