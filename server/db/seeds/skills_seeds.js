/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('skills').del()
  await knex('skills').insert([
    {
      skills_topic: 'Growth mindset',
      skills_details:
        'Opening your mind to the possibility of learning something new is the key to achieving the things you want to achieve that you have predetermined as too difficult.',
    },
    {
      skills_topic: 'Active listening',
      skills_details:
        'Listening with the intent to understand rather than to reply helps build deeper trust and reduces misunderstandings in both personal and professional settings.',
    },
    {
      skills_topic: 'Empathy',
      skills_details:
        'Understanding how others feel — even if you don’t agree — allows you to respond with compassion and build stronger relationships.',
    },
    {
      skills_topic: 'Adaptability',
      skills_details:
        'The ability to adjust your approach in the face of change is a core strength in fast-paced or uncertain environments.',
    },
    {
      skills_topic: 'Constructive feedback',
      skills_details:
        'Giving and receiving feedback in a thoughtful way helps teams grow without creating defensiveness or conflict.',
    },
    {
      skills_topic: 'Emotional regulation',
      skills_details:
        'Being aware of your emotional responses and choosing how to act rather than react builds resilience and maturity.',
    },
  ])
}
