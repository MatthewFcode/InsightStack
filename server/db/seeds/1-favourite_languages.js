/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  await knex('favourite_language').insert([
    {
      id: 1,
      language: 'HTML',
      image: '../../../public/images/Html.png',
    },
    {
      id: 2,
      language: 'CSS',
      image: '../../../public/images/Css.png',
    },
    {
      id: 3,
      language: 'JavaScript',
      image: '../../../public/images/Js.png',
    },
    {
      id: 4,
      language: 'TypeScript',
      image: '../../../public/images/TypeScript.png',
    },
    {
      id: 5,
      language: 'Python',
      image: '../../../public/images/Python.png',
    },
    {
      id: 6,
      language: 'SQL',
      image: '../../../public/images/Sql.png',
    },
    {
      id: 7,
      language: 'React.js',
      image: '../../../public/images/React.png',
    },
    {
      id: 8,
      language: 'Express.js',
      image: '../../../public/images/expressjs.svg',
    },
    {
      id: 9,
      language: 'C#',
      image: '../../../public/images/C.svg',
    },
    {
      id: 10,
      language: 'Golang',
      image: '../../../public/images/Golang.png',
    },
  ])
}
