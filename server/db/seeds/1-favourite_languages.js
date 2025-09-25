/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// export async function seed(knex) {
//   await knex('favourite_language').insert([
//     { language: 'HTML' },
//     { language: 'CSS' },
//     { language: 'JavaScript' },
//     { language: 'TypeScript' },
//     { language: 'Python' },
//     { language: 'SQL' },
//     { language: 'React' },
//     { language: 'Express.js' },
//     { language: 'C#' },
//     { language: 'Golang' },
//   ])
// }

export async function seed(knex) {
  await knex('favourite_language').insert([
    { id: 1, language: 'HTML' },
    { id: 2, language: 'CSS' },
    { id: 3, language: 'JavaScript' },
    { id: 4, language: 'TypeScript' },
    { id: 5, language: 'Python' },
    { id: 6, language: 'SQL' },
    { id: 7, language: 'React' },
    { id: 8, language: 'Express.js' },
    { id: 9, language: 'C#' },
    { id: 10, language: 'Golang' },
  ])
}
