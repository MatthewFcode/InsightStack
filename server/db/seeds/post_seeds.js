/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  await knex('posts').del()
  await knex('posts').insert([
    {
      topic: 'Seeds with knex.js',
      post_details:
        'Use .truncate() instead of .del() to reset auto-incrementing IDs. Also, there’s no down function for seeds — just delete and reinsert within the same file.',
    },
    {
      topic: 'React forms',
      post_details:
        'Always use controlled components for form inputs. This means binding input values to state so you can easily validate, reset, or track input changes.',
    },
    {
      topic: 'Type narrowing in TS',
      post_details:
        'Use if (typeof x === "string") to narrow types safely. TypeScript then infers that x is a string inside that block, giving you better IntelliSense and safety.',
    },
    {
      topic: 'Express error handling',
      post_details:
        'Use a final middleware with four params: (err, req, res, next). This catches any unhandled errors and lets you send a clean 500 error message.',
    },
    {
      topic: 'React Query keys',
      post_details:
        "Use clear, consistent query keys like ['posts'] or ['posts', id]. This ensures React Query knows when to refetch or invalidate cached data.",
    },
    {
      topic: 'Knex migrations',
      post_details:
        'Write descriptive migration names like create_users_table. Use the up and down functions to safely apply and roll back schema changes.',
    },
    {
      topic: 'Avoid implicit any',
      post_details:
        'In TypeScript, always define function parameters and return types to avoid implicit any. This helps avoid hidden bugs and improves readability.',
    },
    {
      topic: 'JS async/await tip',
      post_details:
        'Always wrap await calls in try/catch when side effects are involved. It protects your app from crashing and helps with debugging errors.',
    },
    {
      topic: 'Environment variables',
      post_details:
        'Use dotenv to manage secrets locally. Never commit your .env file, and always check for missing variables on app startup for safety.',
    },
  ])
}
