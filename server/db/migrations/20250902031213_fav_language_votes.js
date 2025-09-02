/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('favourite_language_votes', (table) => {
    table.increments('id').primary()
    table.integer('favourite_language_id').references('favourite_language.id')
  })
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('favourite_language_votes')
}
