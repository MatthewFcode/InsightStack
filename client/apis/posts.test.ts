import nock from 'nock'
import { getPosts, addPosts, updatePosts, deletePosts } from '../apis/posts.ts'
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { Post } from '../../models/posts.ts'

// nock is a node.js library that intercepts HTTP requests and returns fake responses without the request ever leaving your machine
beforeAll(() => {
  nock.cleanAll()
}) // before all tests clears all active nock interceptors

beforeEach(() => {
  nock.cleanAll()
}) // before each tests clears all nock interceptors

afterAll(() => {
  expect(nock.isDone()).toBe(true)
}) // ensures that all HTTP tests I told nock to expect actually happened

describe('Getting all posts using getPosts()', () => {
  it('Gets all posts from the back end server', async () => {
    const backEndConnection: string = 'http://localhost:3000'
    const fakeAPIResponse: Post[] = [
      {
        id: 2,
        topic: 'Testing',
        post_details: 'Testing is a long, hard and arduous task',
        created_at: 'Right now',
        post_auth0Id: 'auth0|123',
        username: 'Willa',
        profile_photo_url: '',
        current_position: 'Dental Technician',
        added_by_user: 'Willa',
      },
    ]
    nock(backEndConnection).get('/api/v1/posts').reply(200, fakeAPIResponse)

    const result = await getPosts()
    expect(result).toStrictEqual(fakeAPIResponse)
  })
})

describe('Posting something with addPosts()', () => {
  it('posts a users advice to the server and responds with that', async () => {
    const backEndConnection = 'http://localhost:3000'
    const fakeAuth = 'auth0|123'
    const fakeAPIResponse: Post = {
      id: 2,
      topic: 'Testing',
      post_details: 'Testing is a long, hard and arduous task',
      created_at: 'Right now',
      post_auth0Id: 'auth0|123',
      username: 'Willa',
      profile_photo_url: '',
      current_position: 'Dental Technician',
      added_by_user: 'Willa',
    }

    const post = {
      topic: 'Testing is a long, hard and arduous task',
      postDetails: 'Right now',
    }

    nock(backEndConnection)
      .post('/api/v1/posts')
      .matchHeader('Authorization', `Bearer ${fakeAuth}`)
      .reply(201, fakeAPIResponse)

    const result = await addPosts(post, fakeAuth)

    expect(result).toStrictEqual(fakeAPIResponse)
  })
})

describe('Updates a posts using updatePosts', () => {
  it('updates a post by its ID and returns the updated post', async () => {
    const backEndConnection = 'http://localhost:3000'

    const mockAuth = 'auth0|123'

    const fakeAPIResponse: Post[] = [
      {
        id: 2,
        topic: 'Teeth',
        post_details: 'Brush your teeth',
        post_created_at: 'Right now',
        post_auth0Id: 'auth0|123',
        username: 'Willa',
        profile_photo_url: '',
        current_position: 'Dental Technician',
      },
    ]

    const updateDetails = { topic: 'Teeth', postDetails: 'Brush your teeth' }

    nock(backEndConnection)
      .patch(`/api/v1/posts/${2}`)
      .matchHeader('Authorization', `Bearer ${mockAuth}`)
      .reply(201, fakeAPIResponse)

    const result = await updatePosts(2, updateDetails, mockAuth)

    expect(result).toStrictEqual(fakeAPIResponse)
  })
})

describe('deletes a post using deletePosts()', () => {
  it('makes a delete request to the server', async () => {
    const backEndConnection = 'http://localhost:3000'
    const mockAuth = 'auth0|123'

    const fakeId = 2

    nock(backEndConnection)
      .delete(`/api/v1/posts/${fakeId}`)
      .matchHeader('Authorization', `Bearer ${mockAuth}`)
      .reply(204)

    const result = await deletePosts(fakeId, mockAuth)
    expect(result).toBeUndefined()
  })
})
