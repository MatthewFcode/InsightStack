/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('least_favourite_language').del()
  await knex('least_favourite_language').insert([
    { id: 1, least_favourite_language: 'HTML' },
    { id: 2, least_favourite_language: 'CSS' },
    { id: 3, least_favourite_language: 'JavaScript' },
    { id: 4, least_favourite_language: 'TypeScript' },
    { id: 5, least_favourite_language: 'Python' },
    { id: 6, least_favourite_language: 'SQL' },
    { id: 7, least_favourite_language: 'React' },
    { id: 8, least_favourite_language: 'Express.js' },
    { id: 9, least_favourite_language: 'C#' },
    { id: 10, least_favourite_language: 'JavaScript' },
  ])
}
