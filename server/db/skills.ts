import connection from './connection'
import { Skills } from '../../models/skills.ts'

const db = connection

table.increments('id').primary()
table.string('skills_topic')
table.string('skills_details')
table.string('skills_added_by_user')
table.string('skills_auth0Id').references('users.auth0Id')
table.string('skills_created_at')

export async function getAllSkills(): Promise<Skills[] | undefined> {
  try {
    const allSkills = await db('skills')
      .join('users', 'skills.skills_auth0Id', 'users.auth0Id')
      .select(
        'skills.id',
        'skills.skills_topic',
        'skills.skills_details',
        'skills.skills_added_by_user',
        'skills.skills_created_at',
        'skills.skills_auth0Id',
        'users.username',
        'users.profile_photo_url',
        'users.current_position',
      )
    console.log(allSkills)
    return allSkills
  } catch (err) {
    console.log('Whoops', err)
  }
}

export async function createSkillsPost(newPost: {
  skills_topic: string
  skills_details: string
}): Promise<Skills[] | undefined> {
  try {
    const createPost = await db('skills').insert(newPost).returning('*')
    console.log(createPost)
    return createPost
  } catch (err) {
    console.log('Whoops', err)
  }
}

export async function updatePost(
  id: number,
  updatedPost: { skills_topic: string; skills_details: string },
): Promise<Skills | undefined> {
  try {
    await db('skills').where('skills.id', id).update(updatedPost)
    const updatedSkillsPost = await db('skills').where('skills.id', id).first()
    console.log('Updated', updatedSkillsPost)
    return updatedSkillsPost
  } catch (err) {
    console.log('Whoops', err)
  }
}

export async function deletePost(
  id: number | string,
): Promise<number | string | undefined> {
  try {
    const deleted = await db('skills').where('skills.id', id).delete()
    console.log('Deleted:', deleted)
    return deleted
  } catch (err) {
    console.log('Whoops', err)
  }
}
