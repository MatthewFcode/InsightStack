/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('favourite_language_votes').insert([
    { favourite_language_id: 1 },
    { favourite_language_id: 2 },
    { favourite_language_id: 3 },
    { favourite_language_id: 4 },
    { favourite_language_id: 5 },
    { favourite_language_id: 6 },
    { favourite_language_id: 7 },
    { favourite_language_id: 8 },
    { favourite_language_id: 9 },
    { favourite_language_id: 10 },
  ])
}
