import nock from 'nock'
import {
  getSkillsPosts,
  createSkillsPost,
  updateSkillsPost,
  deleteSkillsPost,
} from '../skills.ts'
import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import { Skills } from '../../../models/skills.ts'

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

describe('Getting all skills posts using getSkillsPosts()', () => {
  it('Gets all skills posts from the back end server', async () => {
    const backEndConnection: string = 'http://localhost:3000'
    const fakeAPIResponse: Skills[] = [
      {
        id: 2,
        skills_topic: 'Testing',
        skills_details: 'Testing is a long, hard and arduous task',
        created_at: 'Right now',
        skills_auth0Id: 'auth0|123',
        username: 'Willa',
        profile_photo_url: '',
        current_position: 'Dental Technician',
        skills_added_by_user: 'Willa',
      },
    ]
    nock(backEndConnection).get('/api/v1/skills').reply(200, fakeAPIResponse)

    const result = await getSkillsPosts()
    expect(result).toStrictEqual(fakeAPIResponse)
  })
})

describe('Posting a skills post something with addPosts()', () => {
  it('posts a users advice to the server and responds with that', async () => {
    const backEndConnection = 'http://localhost:3000'
    const fakeAuth = 'auth0|123'
    const fakeAPIResponse: Skills = {
      id: 2,
      skills_topic: 'Testing',
      skills_details: 'Testing is a long, hard and arduous task',
      created_at: 'Right now',
      skills_auth0Id: 'auth0|123',
      username: 'Willa',
      profile_photo_url: '',
      current_position: 'Dental Technician',
      skills_added_by_user: 'Willa',
    }

    const skillsPost = {
      skillsTopic: 'Testing is a long, hard and arduous task',
      skillsDetails: 'Right now',
    }

    nock(backEndConnection)
      .post('/api/v1/skills')
      .matchHeader('Authorization', `Bearer ${fakeAuth}`)
      .reply(201, fakeAPIResponse)

    const result = await createSkillsPost(skillsPost, fakeAuth)

    expect(result).toStrictEqual(fakeAPIResponse)
  })
})

describe('Updates a skills posts using createSkillsPost()', () => {
  it('updates a skills post by its ID and returns the updated skills post', async () => {
    const backEndConnection = 'http://localhost:3000'

    const mockAuth = 'auth0|123'

    const fakeAPIResponse: Skills[] = [
      {
        id: 2,
        skills_topic: 'Testing',
        skills_details: 'Testing is a long, hard and arduous task',
        created_at: 'Right now',
        skills_auth0Id: 'auth0|123',
        username: 'Willa',
        profile_photo_url: '',
        current_position: 'Dental Technician',
        skills_added_by_user: 'Willa',
      },
    ]

    const updateDetails = {
      skillsTopic: 'Teeth',
      skillsDetails: 'Brush your teeth',
    }

    nock(backEndConnection)
      .patch(`/api/v1/skills/${2}`)
      .matchHeader('Authorization', `Bearer ${mockAuth}`)
      .reply(201, fakeAPIResponse)

    const result = await updateSkillsPost(2, updateDetails, mockAuth)

    expect(result).toStrictEqual(fakeAPIResponse)
  })
})

describe('deletes a skills post using deleteSkillsPost()', () => {
  it('makes a delete request to the server', async () => {
    const backEndConnection = 'http://localhost:3000'
    const mockAuth = 'auth0|123'

    const fakeId = '2'

    nock(backEndConnection)
      .delete(`/api/v1/skills/${fakeId}`)
      .matchHeader('Authorization', `Bearer ${mockAuth}`)
      .reply(204)

    const result = await deleteSkillsPost(fakeId, mockAuth)
    expect(result).toBeUndefined()
  })
})
