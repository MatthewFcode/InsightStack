import { useGetTestingMessages } from '../hooks/useTesting.ts'
import LoadingSpinner from './LoadingState.tsx'

function Testing() {
  const { data, isLoading, isError } = useGetTestingMessages()

  if (isLoading) {
    return <LoadingSpinner />
  }
  if (isError) {
    return <div>...Error loading testing messages</div>
  }
  return (
    <div>
      {data?.map((d: { message: string }) => (
        <li key={d.message}>{d.message}</li>
      ))}
    </div>
  )
}

export default Testing
