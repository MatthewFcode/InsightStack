/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('favourite_language_votes').del()
  await knex('favourite_language').del()
  await knex('least_favourite_language_votes').del()
  await knex('least_favourite_language').del()
  await knex('posts').del()
  await knex('skills').del()
  await knex('users').del()
}
