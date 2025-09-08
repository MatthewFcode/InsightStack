/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  //await knex('favourite_language').del()
  await knex('favourite_language').insert([
    { language: 'HTML' },
    { language: 'CSS' },
    { language: 'JavaScript' },
    { language: 'TypeScript' },
    { language: 'Python' },
    { language: 'SQL' },
    { language: 'React' },
    { language: 'Express.js' },
    { language: 'C#' },
    { language: 'Golang' },
  ])
}
