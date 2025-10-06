import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { StatusCodes } from 'http-status-codes'
import connection from '../../db/connection.ts'
import { server } from '../../server.ts'
import request from 'supertest'
import jwt from 'jsonwebtoken'
import { mockjwt } from './users.test.ts'

const db = connection

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db('posts').truncate()
  await db('users').truncate()
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
})

afterAll(async () => {
  await db.destroy()
})

describe('Gets all Tech posts', () => {
  it('Returns all tech posts with the associated user Data', async () => {
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
    const newPost = {
      topic: 'Testing',
      posts_details: 'Software testing is hard however worth your time',
      added_by_user: 'Bob',
    }
    const result = await (await request(server).post('/api/v1/posts'))
      .set('Authorization', `Bearer ${mockjwt}`)
      .send(newPost)

    expect(result.status).toBe(StatusCodes.CREATED)

    expect(result.body).toEqual({
      id: expect.any(Number),
      topic: 'Testing',
      posts_details: 'Software testing is hard however worth your time',
      added_by_user: 'Bob',
      post_auth0Id: 'auth0|test-user-id',
      post_created_at: expect.any(String),
    })
  })
})
