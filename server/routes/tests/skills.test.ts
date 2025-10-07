import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { StatusCodes } from 'http-status-codes'
import connection from '../../db/connection.ts'
import { server } from '../../server.ts'
import request from 'supertest'
import jwt from 'jsonwebtoken'

const db = connection

const testUserId = 'auth0|test-user-id'

// creating a fake jwt token just how auth0 issues them when users are logged in
const mockjwt = jwt.sign(
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
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

describe('Gets all Skills posts', () => {
  it('Returns all Skills posts with the associated user data', async () => {
    await db('users').insert([
      {
        auth0Id: 'auth0|123',
        username: 'Bob',
        email: 'bob@gmail.com',
        current_position: 'Software Developer',
        about_me: 'I love surfing',
        profile_photo_url: '',
        created_at: '',
        location: 'Mumbai',
      },
    ])
    await db('skills').insert([
      {
        skills_topic: 'Knex.js',
        skills_details:
          'use .truncate() instead of .del() to reset auto incrementing ids',
        skills_added_by_user: 'Bob',
        skills_auth0Id: 'auth0|123',
        skills_created_at: '',
      },
    ])
    const result = await request(server).get('/api/v1/skills')
    expect(result.status).toBe(StatusCodes.OK)

    expect(result.body[0]).toEqual({
      id: expect.any(Number),
      skills_topic: 'Knex.js',
      skills_details:
        'use .truncate() instead of .del() to reset auto incrementing ids',
      created_at: expect.any(String),
      skills_auth0Id: 'auth0|123',
      username: 'Bob',
      profile_photo_url: expect.any(String),
      current_position: 'Software Developer',
    })
  })
})

describe('Creating a skills post', () => {
  it('Send a skills post to the database', async () => {
    await db('users').insert([
      {
        auth0Id: testUserId,
        username: 'Willa',
        email: 'willa.liu2@gmail.com',
        current_position: 'Uni Student',
        about_me: 'I love teeth and dentistry',
        profile_photo_url: '',
        location: 'Dunedin',
      },
    ])
    const newPost = {
      skillsTopic: 'Testing',
      skillsDetails: 'Software testing is hard however worth your time',
    }
    const result = await request(server)
      .post('/api/v1/skills')
      .set('Authorization', `Bearer ${mockjwt}`)
      .send(newPost)

    expect(result.status).toBe(StatusCodes.CREATED)

    expect(result.body[0]).toEqual({
      id: expect.any(Number),
      skills_topic: 'Testing',
      skills_details: 'Software testing is hard however worth your time',
      skills_added_by_user: 'Willa',
      skills_auth0Id: 'auth0|test-user-id',
      skills_created_at: expect.any(String),
    })
  })
})

describe('Editing a skills post', () => {
  it('succesful update on the skills posts routes', async () => {
    await db('users').insert([
      {
        auth0Id: testUserId,
        username: 'Willa',
        email: 'willa.liu2@gmail.com',
        current_position: 'Uni Student',
        about_me: 'I love teeth and dentistry',
        profile_photo_url: '',
        location: 'Dunedin',
      },
    ])
    const [postId] = await db('skills').insert([
      {
        skills_topic: 'Knex.js',
        skills_details:
          'use .truncate() instead of .del() to reset auto incrementing ids',
        skills_added_by_user: 'Willa',
        skills_auth0Id: testUserId,
        skills_created_at: '',
      },
    ])

    const updatedData = {
      skillsTopic: 'Updated',
      skillsDetails: 'This was updated by Willa',
    }
    const result = await request(server)
      .patch(`/api/v1/skills/${postId}`)
      .set('Authorization', `Bearer ${mockjwt}`)
      .send(updatedData)

    expect(result.status).toBe(StatusCodes.OK)

    expect(result.body[0]).toMatchObject({
      id: postId,
      skills_topic: 'Updated',
      skills_details: 'This was updated by Willa',
      username: 'Willa',
      current_position: 'Uni Student',
      profile_photo_url: expect.any(String),
      skills_created_at: expect.any(String),
    })
  })
})

describe('Deleting a skills post', () => {
  it('deletes the skills post from the database by the id', async () => {
    await db('users').insert([
      {
        auth0Id: testUserId,
        username: 'Willa',
        email: 'willa.liu2@gmail.com',
        current_position: 'Uni Student',
        about_me: 'I love teeth and dentistry',
        profile_photo_url: '',
        location: 'Dunedin',
      },
    ])

    const [postId] = await db('skills').insert([
      {
        skills_topic: 'Knex.js',
        skills_details:
          'use .truncate() instead of .del() to reset auto incrementing ids',
        skills_added_by_user: 'Willa',
        skills_auth0Id: testUserId,
        skills_created_at: '',
      },
    ])
    const result = await request(server)
      .delete(`/api/v1/skills/${postId}`)
      .set('Authorization', `Bearer ${mockjwt}`)

    expect(result.status).toBe(StatusCodes.NO_CONTENT)
  })
})
