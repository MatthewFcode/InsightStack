/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  await knex('favourite_language').insert([
    {
      id: 1,
      language: 'HTML',
      image: '/images/Html.png',
    },
    {
      id: 2,
      language: 'CSS',
      image: '/images/Css.png',
    },
    {
      id: 3,
      language: 'JavaScript',
      image: '/images/Js.png',
    },
    {
      id: 4,
      language: 'TypeScript',
      image: '/images/TypeScript.png',
    },
    {
      id: 5,
      language: 'Python',
      image: '/images/Python.png',
    },
    {
      id: 6,
      language: 'SQL',
      image: '/images/Sql.png',
    },
    {
      id: 7,
      language: 'React.js',
      image: '/images/React.png',
    },
    {
      id: 8,
      language: 'Express.js',
      image: '/images/expressjs.svg',
    },
    {
      id: 9,
      language: 'C#',
      image: '/images/C.svg',
    },
    {
      id: 10,
      language: 'Golang',
      image: '/images/Golang.png',
    },
  ])
}
