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

describe('Gets all Tech posts', () => {
  it('Returns all tech posts with the associated user Data', async () => {
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
    await db('posts').insert([
      {
        topic: 'Knex.js',
        posts_details:
          'use .truncate() instead of .del() to reset auto incrementing ids',
        added_by_user: 'Bob',
        post_auth0Id: 'auth0|123',
        post_created_at: '',
      },
    ])
    const result = await request(server).get('/api/v1/posts')
    expect(result.status).toBe(StatusCodes.OK)

    expect(result.body[0]).toEqual({
      id: expect.any(Number),
      topic: 'Knex.js',
      post_details:
        'use .truncate() instead of .del() to reset auto incrementing ids',
      created_at: expect.any(String),
      post_auth0Id: 'auth0|123',
      username: 'Bob',
      profile_photo_url: expect.any(String),
      current_position: 'Software Developer',
    })
  })
})

describe('Creating a tech post', () => {
  it('Send a tech post to the database', async () => {
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
      topic: 'Testing',
      postDetails: 'Software testing is hard however worth your time',
    }
    const result = await request(server)
      .post('/api/v1/posts')
      .set('Authorization', `Bearer ${mockjwt}`)
      .send(newPost)

    expect(result.status).toBe(StatusCodes.CREATED)

    expect(result.body[0]).toEqual({
      id: expect.any(Number),
      topic: 'Testing',
      posts_details: 'Software testing is hard however worth your time',
      added_by_user: 'Willa',
      post_auth0Id: 'auth0|test-user-id',
      post_created_at: expect.any(String),
    })
  })
})

describe('Editing a tech post', () => {
  it('succesful update on the tech posts routes', async () => {
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
    const [postId] = await db('posts').insert([
      {
        topic: 'Knex.js',
        posts_details:
          'use .truncate() instead of .del() to reset auto incrementing ids',
        added_by_user: 'Willa',
        post_auth0Id: testUserId,
        post_created_at: '',
      },
    ])

    const updatedData = {
      topic: 'Updated',
      postDetails: 'This was updated by Willa',
    }
    const result = await request(server)
      .patch(`/api/v1/posts/${postId}`)
      .set('Authorization', `Bearer ${mockjwt}`)
      .send(updatedData)

    expect(result.status).toBe(StatusCodes.OK)

    expect(result.body[0]).toMatchObject({
      id: postId,
      topic: 'Updated',
      posts_details: 'This was updated by Willa',
      username: 'Willa',
      current_position: 'Uni Student',
      profile_photo_url: expect.any(String),
      post_created_at: expect.any(String),
    })
  })
})

describe('Deleting a tech post', () => {
  it('deletes the tech post from the database by the id', async () => {
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

    const [postId] = await db('posts').insert([
      {
        topic: 'Knex.js',
        posts_details:
          'use .truncate() instead of .del() to reset auto incrementing ids',
        added_by_user: 'Willa',
        post_auth0Id: testUserId,
        post_created_at: '',
      },
    ])
    const result = await request(server)
      .delete(`/api/v1/posts/${postId}`)
      .set('Authorization', `Bearer ${mockjwt}`)

    expect(result.status).toBe(StatusCodes.NO_CONTENT)
  })
})
