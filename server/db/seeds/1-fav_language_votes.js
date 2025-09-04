/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('favourite_language_votes').del()
  await knex('favourite_language_votes').insert([
    { id: 1, favourite_language_id: 1 },
    { id: 2, favourite_language_id: 2 },
    { id: 3, favourite_language_id: 3 },
    { id: 4, favourite_language_id: 4 },
    { id: 5, favourite_language_id: 5 },
    { id: 6, favourite_language_id: 6 },
    { id: 7, favourite_language_id: 7 },
    { id: 8, favourite_language_id: 8 },
    { id: 9, favourite_language_id: 9 },
    { id: 10, favourite_language_id: 10 },
  ])
}
