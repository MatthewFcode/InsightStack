import connection from './connection.ts'
import { FavLang, FavLangVote } from '../../models/votes.ts'

const db = connection

// getting the languages for both least favourite and favourite languages to dipslay as options for voting
export async function getFavouriteLanguages(): Promise<FavLang[] | undefined> {
  try {
    const result = await db('favourite_language').select()
    return result
  } catch (err) {
    console.log(err)
  }
}

// getting the results for both of the least favourite and favourtie vote languages
export async function getFavouriteLanguageVotes(): Promise<
  FavLangVote[] | undefined
> {
  try {
    const result = await db('favourite_language_votes')
      .join(
        'favourite_language',
        'favourite_language_id',
        'favourite_language.id',
      )
      .select('favourite_language.language')
      .count('favourite_language_votes.id as favouriteVotes')
      .groupBy('favourite_language.language')
    return result
  } catch (err) {
    console.log(err)
  }
}

// adding a vote for the fav and least fav
export async function addFavouriteLanguageVote(
  favouriteLanguageId: string,
): Promise<number[] | undefined> {
  try {
    const result = await db('favourite_language_votes').insert({
      favourite_language_id: favouriteLanguageId,
    })
    return result
  } catch (err) {
    console.log(err)
  }
}
