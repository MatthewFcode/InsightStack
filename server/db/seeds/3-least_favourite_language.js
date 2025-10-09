/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  await knex('least_favourite_language').insert([
    {
      id: 1,
      least_favourite_language: 'HTML',
      image: '/images/Html.png',
    },
    {
      id: 2,
      least_favourite_language: 'CSS',
      image: '/images/Css.png',
    },
    {
      id: 3,
      least_favourite_language: 'JavaScript',
      image: '/images/Js.png',
    },
    {
      id: 4,
      least_favourite_language: 'TypeScript',
      image: '/images/TypeScript.png',
    },
    {
      id: 5,
      least_favourite_language: 'Python',
      image: '/images/Python.png',
    },
    {
      id: 6,
      least_favourite_language: 'SQL',
      image: '/images/Sql.png',
    },
    {
      id: 7,
      least_favourite_language: 'React.js',
      image: '/images/React.png',
    },
    {
      id: 8,
      least_favourite_language: 'Express.js',
      image: '/images/expressjs.svg',
    },
    {
      id: 9,
      least_favourite_language: 'C#',
      image: '/images/C.svg',
    },
    {
      id: 10,
      least_favourite_language: 'Golang',
      image: '/images/Golang.png',
    },
  ])
}
