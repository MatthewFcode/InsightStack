/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('favourite_language_votes').del()
  await knex('favourite_language').truncate()
  await knex('least_favourite_language_votes').del()
  await knex('least_favourite_language').truncate()
  await knex('posts').truncate()
  await knex('skills').truncate()
  await knex('users').truncate()
}
