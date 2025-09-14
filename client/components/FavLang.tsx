// import { useState } from 'react'
// import {
//   useGetFavLanguages,
//   useGetFavLangVotes,
//   useAddFavVote,
// } from '../hooks/useFavVotes.ts'
// import LoadingState from './LoadingState.tsx'

// function FavLang() {
//   const [checked, setChecked] = useState<string | null>(null)
//   const [hasVoted, setHasVoted] = useState(false)

//   const addVote = useAddFavVote()

//   const { data, isError, isPending } = useGetFavLanguages()

//   const {
//     data: votes,
//     isError: isVoteError,
//     isPending: isVotePending,
//   } = useGetFavLangVotes()

//   if (isError || isVoteError) {
//     return <div>Error Loading Votes</div>
//   }

//   if (isPending || isVotePending) {
//     return <LoadingState />
//   }

//   const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedId = event.target.value
//     setChecked(selectedId)

//     if (!hasVoted) {
//       await addVote.mutateAsync(selectedId)
//       setHasVoted(true)
//     }
//   }

//   return (
//     <div>
//       {data?.map((language: { id: string; language: string }) => (
//         <label key={language.id}>
//           <input
//             type="radio"
//             name="language"
//             value={language.id}
//             checked={checked === language.id}
//             onChange={handleChange}
//           />
//           {language.language}
//         </label>
//       ))}
//       {hasVoted && (
//         <div>
//           <h2>Current Vote Count</h2>
//           <table border={1} cellPadding={10}>
//             <thead>
//               <tr>
//                 <th>Flavour</th>
//                 <th>Votes</th>
//               </tr>
//             </thead>
//             <tbody>
//               {votes?.map((vote: { language: string; votes: number }) => (
//                 <tr key={vote.language}>
//                   <td>{vote.language}</td>
//                   <td>{vote.votes}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   )
// }

// export default FavLang
