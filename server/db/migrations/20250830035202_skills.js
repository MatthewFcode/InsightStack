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
    table.string('skills_auth0Id').references('users.auth0Id')
    table.string('skills_created_at')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('skills')
}
