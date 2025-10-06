import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { StatusCodes } from 'http-status-codes'
import connection from '../../db/connection.ts'
import { server } from '../../server.ts'
import request from 'supertest'
import jwt from 'jsonwebtoken'

const db = connection

const testUserId = 'auth0|test-user-id'

// creating a fake jwt token just how auth0 issues them when users are logged in
export const mockjwt = jwt.sign(
  // creates a signed token
  {
    // payload containing identity data
    sub: testUserId, // the users auth0Id
    iss: 'https://matthew-matai-2025.au.auth0.com', // the hooked up auth0 domain
    aud: 'https://insightstack/api', // the API identifier
  },
  'test-secret', // test secret is what the checkJwt middleware would use to verify it
  { algorithm: 'HS256', expiresIn: '1h' },
)

beforeAll(async () => {
  // runs once before all tests in the file. makes sure Db is the latest schema by running migrations
  await db.migrate.latest()
})

beforeEach(async () => {
  // runs once before every test by running all the seeds after the migrations have run so each test starts fresh and isolated
  await db.seed.run()
})

afterAll(async () => {
  // runs after all tests have finished preventning open connections to the database and open hanging processes
  await db.destroy()
})

describe('gets a user by Id', () => {
  it('returns the user logged in by their 0auth id', async () => {
    const response = await request(server)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${mockjwt}`)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body.user).toEqual({
      auth0Id: 'auth0|test-user-id',
      username: 'Willa',
      email: 'willa.liu2@gmail.com',
      current_position: 'Uni Student',
      about_me: 'I love teeth and dentistry',
      profile_photo_url: '',
      created_at: '',
      location: 'Dunedin',
    })
  })
})

describe('Creating a new user', () => {
  it('posts a new user to the database and return all the freshly entered data', async () => {
    const newUser = {
      auth0Id: '',
      username: 'Thomas',
      email: 'thomas@gmail.com',
      current_position: 'Software engineer',
      about_me: 'I love coding',
      profile_photo_url: 'banana',
      created_at: '',
      location: 'Venezuela',
    }

    await db('users').where({ auth0Id: 'auth0|test-user-id' }).del()
    const response = await request(server)
      .post(`/api/v1/users`)
      .set('Authorization', `Bearer ${mockjwt}`)
      .send(newUser)

    expect(response.status).toBe(StatusCodes.CREATED)

    expect(response.body.user).toStrictEqual({
      auth0Id: 'auth0|test-user-id',
      username: 'Thomas',
      email: 'thomas@gmail.com',
      current_position: 'Software engineer',
      about_me: 'I love coding',
      profile_photo_url: '',
      created_at: expect.any(String),
      location: 'Venezuela',
    })
  })
})
