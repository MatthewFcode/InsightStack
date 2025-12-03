/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries

  await knex('testing').insert([
    { message: 'Hello' },
    { message: 'Goodbye' },
    { message: 'Morning' },
  ])
}
