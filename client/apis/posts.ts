import request from 'superagent'
import { Post } from '../../models/posts.ts'

const rootURL =
  typeof document !== 'undefined'
    ? new URL(`/api/v1`, document.baseURI)
    : 'http://localhost:3000/api/v1'

export async function getPosts(): Promise<Post[] | undefined> {
  try {
    const response = await request.get(`${rootURL}/posts`)
    return response.body
  } catch (err) {
    console.log(err)
  }
}

export async function addPosts(
  newPost: {
    topic: string
    postDetails: string
  },
  token: string,
): Promise<Post[] | undefined> {
  try {
    const sendPost = await request
      .post(`${rootURL}/posts`)
      .send(newPost)
      .set('Authorization', `Bearer ${token}`)
    return sendPost.body
  } catch (err) {
    console.log(err)
  }
}

export async function updatePosts(
  id: number,
  updatedDetails: { topic: string; postDetails: string },
  token: string,
): Promise<Post | undefined> {
  try {
    const sendUpdate = await request
      .patch(`${rootURL}/posts/${id}`)
      .send(updatedDetails)
      .set('Authorization', `Bearer ${token}`)
    return sendUpdate.body
  } catch (err) {
    console.log(err)
  }
}

export async function deletePosts(
  id: unknown,
  token: string,
): Promise<number | undefined> {
  try {
    const deletePost = await request
      .delete(`${rootURL}/posts/${id}`)
      .set('Authorization', `Bearer ${token}`)
    return deletePost.body
  } catch (err) {
    console.log(err)
  }
}
