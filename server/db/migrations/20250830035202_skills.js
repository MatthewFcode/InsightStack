/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('skills', (table) => {
    table.increments('id').primary()
    table.string('skills_topic')
    table.string('skills_details')
    table.string('skills_added_by_user')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('skills')
}
