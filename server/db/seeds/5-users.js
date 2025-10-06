/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  await knex('users').insert([
    {
      auth0Id: 'auth0|test-user-id',
      username: 'Willa',
      email: 'willa.liu2@gmail.com',
      current_position: 'Uni Student',
      about_me: 'I love teeth and dentistry',
      profile_photo_url: '',
      created_at: '',
      location: 'Dunedin',
    },
  ])
}
