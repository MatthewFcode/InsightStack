import { LeastFavLang, LeastFavLangVote } from '../../models/votes.ts'

import connection from './connection.ts'

const db = connection

//getting all the least favourite languages for the vote input
export async function getLeastFavouriteLanguages(): Promise<
  LeastFavLang[] | undefined
> {
  try {
    const result = await db('least_favourite_language').select()
    return result
  } catch (err) {
    console.log(err)
  }
}

// get the vote scores and group them and count them
export async function getLeastFavouriteLanguageVotes(): Promise<
  LeastFavLangVote[] | undefined
> {
  try {
    const result = await db('least_favourite_language_votes')
      .join(
        'least_favourite_language',
        'least_favourite_language_id',
        'least_favourite_language.id',
      )
      .select('least_favourite_language.least_favourite_language')
      .count('least_favourite_language_votes.id as leastFavouriteVotes')
      .groupBy('least_favourite_language.least_favourite_language')
    return result
  } catch (err) {
    console.log(err)
  }
}

// adding a least favourite vote
export async function addLeastFavouriteLanguageVote(
  leastFavouriteLanguageId: string,
): Promise<number[] | undefined> {
  try {
    const result = await db('least_favourite_language_votes').insert({
      least_favourite_language_id: leastFavouriteLanguageId,
    })
    return result
  } catch (err) {
    console.log(err)
  }
}
