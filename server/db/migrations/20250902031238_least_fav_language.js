/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('least_favourite_language', (table) => {
    table.increments('id').primary()
    table.string('least_favourite_language')
    table.string('image')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('least_favourite_language')
}
