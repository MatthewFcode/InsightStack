import request from 'superagent'
import { Post } from '../../models/posts.ts'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getPosts(): Promise<Post[] | undefined> {
  try {
    const response = await request.get(`${rootURL}/posts`)
    return response.body
  } catch (err) {
    console.log(err)
  }
}

export async function addPosts(newPost: {
  topic: string
  postDetails: string
}): Promise<Post[] | undefined> {
  try {
    const sendPost = await request.post(`${rootURL}/posts`).send(newPost)
    return sendPost.body
  } catch (err) {
    console.log(err)
  }
}

export async function updatePosts(
  id: number,
  updatedDetails: { topic: string; postDetails: string },
): Promise<Post | undefined> {
  try {
    const sendUpdate = await request
      .patch(`${rootURL}/posts/${id}`)
      .send(updatedDetails)
    return sendUpdate.body
  } catch (err) {
    console.log(err)
  }
}

export async function deletePosts(id: unknown): Promise<number | undefined> {
  try {
    const deletePost = await request.delete(`${rootURL}/posts/${id}`)
    return deletePost.body
  } catch (err) {
    console.log(err)
  }
}
