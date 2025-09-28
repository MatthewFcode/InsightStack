/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  await knex('least_favourite_language').insert([
    {
      id: 1,
      least_favourite_language: 'HTML',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/250px-HTML5_logo_and_wordmark.svg.png',
    },
    {
      id: 2,
      least_favourite_language: 'CSS',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1452px-CSS3_logo_and_wordmark.svg.png',
    },
    {
      id: 3,
      least_favourite_language: 'JavaScript',
      image: 'https://skillforge.com/wp-content/uploads/2020/10/javascript.png',
    },
    {
      id: 4,
      least_favourite_language: 'TypeScript',
      image: 'https://malcoded.com/_astro/Typescript.ApdKzZht_vchHI.webp',
    },
    {
      id: 5,
      least_favourite_language: 'Python',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png',
    },
    {
      id: 6,
      least_favourite_language: 'SQL',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png',
    },
    {
      id: 7,
      least_favourite_language: 'React',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/862px-React-icon.svg.png',
    },
    {
      id: 8,
      least_favourite_language: 'Express.js',
      image:
        'https://www.khanwaseem.com/_next/image?url=https%3A%2F%2Fblogwordpressmedia.s3.amazonaws.com%2Fuploads%2F2023%2F01%2F27083940%2Fexpress.png&w=3840&q=75',
    },
    {
      id: 9,
      least_favourite_language: 'C#',
      image: 'https://www.jetbrains.com/guide/assets/csharp-logo-265a149e.svg',
    },
    {
      id: 10,
      least_favourite_language: 'Golang',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Go_Logo_Blue.svg/1200px-Go_Logo_Blue.svg.png',
    },
  ])
}
