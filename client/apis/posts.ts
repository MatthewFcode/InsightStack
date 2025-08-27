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
