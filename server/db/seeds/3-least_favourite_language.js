/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// export async function seed(knex) {
//   await knex('least_favourite_language').insert([
//     { id: 1, least_favourite_language: 'HTML' },
//     { least_favourite_language: 'CSS' },
//     { least_favourite_language: 'JavaScript' },
//     { least_favourite_language: 'TypeScript' },
//     { least_favourite_language: 'Python' },
//     { least_favourite_language: 'SQL' },
//     { least_favourite_language: 'React' },
//     { least_favourite_language: 'Express.js' },
//     { least_favourite_language: 'C#' },
//     { least_favourite_language: 'Golang' },
//   ])
// }

export async function seed(knex) {
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
    { id: 10, least_favourite_language: 'Golang' },
  ])
}
