/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('least_favourite_language').insert([
    { least_favourite_language: 'HTML' },
    { least_favourite_language: 'CSS' },
    { least_favourite_language: 'JavaScript' },
    { least_favourite_language: 'TypeScript' },
    { least_favourite_language: 'Python' },
    { least_favourite_language: 'SQL' },
    { least_favourite_language: 'React' },
    { least_favourite_language: 'Express.js' },
    { least_favourite_language: 'C#' },
    { least_favourite_language: 'Golang' },
  ])
}
