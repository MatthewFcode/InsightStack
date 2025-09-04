export interface FavLang {
  language: string
}

export interface FavLangVote {
  language: string
  favourite_language_id: number | string
}

export interface LeastFavLang {
  least_favourite_language: string
}

export interface LeastFavLangVote {
  least_favourite_language: string
  least_favourite_language_id: number | string
}
