/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  await knex('posts').del()
  await knex('posts').insert([
    {
      id: 1,
      topic: 'Seeds with knex.js',
      post_details:
        'use .trucate() instead of .del() to reset auto incrementing ids. Also there is no down function for seeds the logic for deleting existing table data is written in your seed and then your seed data runs directly after that.',
    },
  ])
}
