//import connection from './connection.ts'
import connection from './connection.ts'
import { Post } from '../../models/posts.ts'

const db = connection

export async function getAllPosts(): Promise<Post[] | undefined> {
  try {
    const result = await db('posts').select()
    console.log(result)
    return result
  } catch (err) {
    console.log('Whoops', err)
  }
}

export async function createPost(newPost: {
  topic: string
  post_details: string
}): Promise<Post[] | undefined> {
  try {
    const result = await db('posts').insert(newPost).returning('*')
    console.log(result)
    return result
  } catch (err) {
    console.log('Whoops', err)
  }
}

export async function updatePost(
  id: number,
  updatedPost: { topic: string; post_details: string },
): Promise<Post | undefined> {
  try {
    await db('posts').where('posts.id', id).update(updatedPost)
    const result = await db('posts').where('posts.id', id).first()
    console.log('updated', result)
    return result
  } catch (err) {
    console.log('Whoops', err)
  }
}

export async function deletePost(id: string): Promise<number | undefined> {
  try {
    const result = await db('posts').where('posts.id', id).delete()
    console.log('deleted', result)
    return result
  } catch (err) {
    console.log('Whoops', err)
  }
}
