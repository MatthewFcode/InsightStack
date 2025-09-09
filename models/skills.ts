// export interface Skills {
//   id?: number | string
//   skills_topic: string
//   skills_details: string
// }
export interface Skills {
  id: number
  skills_topic: string
  skills_details: string
  skills_added_by_user: string
  post_auth0Id?: string
  skills_auth0Id?: string
  skills_created_at?: string
  created_at?: string

  username?: string
  profile_photo_url?: string
  current_position?: string
  email?: string
  location?: string
}
