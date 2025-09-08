/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function up(knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments('id').primary()
    table.string('topic')
    table.string('posts_details')
    table.string('added_by_user')
    table.string('post_auth0Id').references('users.auth0Id').onDelete('CASCADE')
    table.timestamp('post_created_at').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('posts')
}
