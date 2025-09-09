//import connection from './connection.ts'
import connection from './connection.ts'
import { Post } from '../../models/posts.ts'

const db = connection

export async function getAllPosts(): Promise<Post[] | undefined> {
  try {
    const result = await db('posts')
      .join('users', 'posts.post_auth0Id', 'users.auth0Id')
      .select(
        'posts.id',
        'posts.topic',
        'posts.posts_details as post_details',
        'posts.post_created_at',
        'posts.post_auth0Id',
        'users.username',
        'users.profile_photo_url',
        'users.current_position',
      )
      .orderBy('posts.post_created_at')
    console.log(result)
    return result
  } catch (err) {
    console.log('Whoops', err)
  }
}

export async function createPost(newPost: {
  topic: string
  posts_details: string
  added_by_user: string
  post_auth0Id: string
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
  auth0Id: string,
  updatedPost: { topic: string; posts_details: string },
): Promise<Post[] | undefined> {
  try {
    // select the post by the post id and where the auth0Id matches
    await db('posts')
      .where('posts.id', id)
      .andWhere('posts.posts_auth0Id', auth0Id)
      .update(updatedPost)
    // return the update post
    const result = await db('posts')
      .join('users', 'posts.posts_auth0Id', 'users.auth0Id')
      .where('posts.id', id)
      .select(
        'posts.id',
        'posts.topic',
        'posts.posts_details',
        'posts.post_created_at',
        'posts.post_auth0Id',
        'users.username',
        'users.profile_photo_url',
        'users.current_position',
      )
    console.log('updated', result)
    return result
  } catch (err) {
    console.log('Whoops', err)
  }
}

export async function deletePost(
  id: string,
  auth0Id: string,
): Promise<number | undefined> {
  try {
    const result = await db('posts')
      .where('posts.id', id)
      .andWhere('posts.post_auth0Id', auth0Id)
      .delete()
    console.log('deleted', result)
    return result
  } catch (err) {
    console.log('Whoops', err)
  }
}
