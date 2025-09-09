import request from 'superagent'
import { Skills } from '../../models/skills.ts'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getSkillsPosts(): Promise<Skills[] | undefined> {
  try {
    const response = await request.get(`${rootURL}/skills`)
    return response.body
  } catch (err) {
    console.log('Whoops', err)
  }
}

export async function createSkillsPost(
  newPost: {
    skillsTopic: string
    skillsDetails: string
  },
  token: string,
): Promise<Skills | undefined> {
  try {
    const response = await request
      .post(`${rootURL}/skills`)
      .send(newPost)
      .set('Authorization', `Bearer ${token}`)
    return response.body
  } catch (err) {
    console.log('Whoops', err)
  }
}

export async function updateSkillsPost(
  id: string | number,
  updatedPost: { skillsTopic: string; skillsDetails: string },
  token: string,
): Promise<Skills | undefined> {
  try {
    const response = await request
      .patch(`${rootURL}/skills/${id}`)
      .send(updatedPost)
      .set('Authorization', `Bearer ${token}`)
    return response.body
  } catch (err) {
    console.log('Whoops', err)
  }
}

export async function deleteSkillsPost(
  id: string,
  token: string,
): Promise<number | undefined> {
  try {
    const response = await request
      .delete(`${rootURL}/skills/${id}`)
      .set('Authorization', `Bearer ${token}`)
    return response.body
  } catch (err) {
    console.log('Whoops', err)
  }
}
