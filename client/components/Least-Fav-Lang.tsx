import { useState } from 'react'
import {
  useGetLeastFavLangVotes,
  useGetLeastFavLanguages,
  useAddVote,
} from '../hooks/useLeastFavVotes'
import LoadingState from './LoadingState.tsx'
function LeastFavLang() {
  const [checked, setChecked] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)

  const addVote = useAddVote()

  const { data, isPending, isError } = useGetLeastFavLanguages()

  const {
    data: votes,
    isError: isVoteError,
    isPending: isVotePending,
  } = useGetLeastFavLangVotes()

  if (isPending || isVotePending) {
    return <LoadingState />
  }
  if (isError || isVoteError) {
    return <div>Error Loading Votes</div>
  }
  const handleChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = evt.target.value
    setChecked(selectedId)
    if (!hasVoted) {
      try {
        await addVote.mutateAsync(selectedId)
        setHasVoted(true)
      } catch (error) {
        console.error('Failed to add vote:', error)
        setChecked(null)
      }
    }
  }

  const totalVotes =
    votes?.reduce(
      (acc: number, vote: { votes: number }) => acc + vote.votes,
      0,
    ) || 0

  return (
    <div className="vote-card">
      <h2 className="edit-title">Least Favorite Programming Languages</h2>
      {!hasVoted ? (
        <div className="vote-options-container">
          {data?.map((language: { id: string; language: string }) => (
            <label key={language.id} className="vote-option-label">
              <input
                type="radio"
                name="language"
                value={language.id}
                checked={checked === language.id}
                onChange={handleChange}
              />
              <div className="option-content">{language.language}</div>
            </label>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="edit-title">Current Vote Count</h2>
          <div className="vote-results-container">
            {votes &&
              votes.length > 0 &&
              votes.map((vote: { language: string; votes: number }) => {
                // Calculate percentage relative to total votes
                const percentage =
                  totalVotes > 0 ? (vote.votes / totalVotes) * 100 : 0

                return (
                  <div key={vote.language} className="vote-bar-item">
                    <div className="bar-container">
                      <div
                        className="bar-fill"
                        style={
                          {
                            '--final-height': `${percentage}%`,
                          } as React.CSSProperties
                        }
                      ></div>
                    </div>
                    <div className="vote-info">
                      <h3>{vote.language}</h3>
                      <span className="vote-count">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      )}
    </div>
  )
}

export default LeastFavLang
