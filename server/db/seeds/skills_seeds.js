/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('skills').del()
  await knex('skills').insert([
    {
      skills_topic: 'Growth mindset',
      skills_details:
        'Opening your mind to the possibility of learning something new is the key to acheiving the things you want to acheive that you have predetermined as too difficult.',
    },
  ])
}
