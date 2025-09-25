/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('auth0Id').primary()
    table.string('username').unique().notNullable()
    table.string('email').unique().notNullable()
    table.string('current_position')
    table.string('about_me', 50).notNullable()
    table.string('profile_photo_url')
    table.string('created_at').defaultTo(knex.fn.now())
    table.string('location')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('users')
}
