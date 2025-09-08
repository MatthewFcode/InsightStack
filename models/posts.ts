// export interface Post {
//   id?: number | string
//   topic: string
//   post_details: string
// }

export interface Post {
  id: number
  topic: string
  post_details: string
  added_by_user: string
  post_auth0Id?: string
  auth0Id?: string
  post_created_at?: string
  created_at?: string
  // User information joined from users table
  username?: string
  profile_photo_url?: string
  current_position?: string
  email?: string
  location?: string
}
