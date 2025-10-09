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
