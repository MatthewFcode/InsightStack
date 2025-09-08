/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  //await knex('least_favourite_language_votes').del()
  await knex('least_favourite_language_votes').insert([
    { least_favourite_language_id: 1 },
    { least_favourite_language_id: 2 },
    { least_favourite_language_id: 3 },
    { least_favourite_language_id: 4 },
    { least_favourite_language_id: 5 },
    { least_favourite_language_id: 6 },
    { least_favourite_language_id: 7 },
    { least_favourite_language_id: 8 },
    { least_favourite_language_id: 9 },
    { least_favourite_language_id: 10 },
  ])
}
