import { useState } from 'react'
import {
  useGetFavLanguages,
  useGetFavLangVotes,
  useAddFavVote,
} from '../hooks/useFavVotes.ts'
import LoadingState from './LoadingState.tsx'

function FavLang() {
  const [checked, setChecked] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)

  const addVotePromise = useAddFavVote()

  const { data, isError, isPending } = useGetFavLanguages()

  const {
    data: votes,
    isError: isVoteError,
    isPending: isVotePending,
  } = useGetFavLangVotes()

  if (isError || isVoteError) {
    ;<div>Error Loading Votes</div>
  }

  if (isPending || isVotePending) {
    return <LoadingState />
  }

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = event.target.value
    setChecked(selectedId)
    setHasVoted(true)
    if (!hasVoted) {
      try {
        const addVote = await addVotePromise
        await addVote.mutateAsync(selectedId)
      } catch (err) {
        console.log('Voting Error', err)
      }
    }
  }

  return (
    <div>
      {data?.map((language: { id: string; language: string }) => (
        <label key={language.id}>
          <input
            type="radio"
            name="language"
            value="language.id"
            checked={checked === language.id}
            onChange={handleChange}
          />
          {language.language}
        </label>
      ))}
    </div>
  )
}

export default FavLang
