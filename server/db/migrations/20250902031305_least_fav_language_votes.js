/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('least_favourite_language_votes', (table) => {
    table.increments('id').primary()
    table
      .integer('least_favourite_language_id')
      .references('least_favourite_language.id')
      .onDelete('CASCADE')
  })
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('least_favourite_language_votes')
}
