import Team from './components/composite/Team.tsx'

function App() {
  return (
    <>
      <Team teamId={0} readOnly={true} showMembers={true} />
    </>
  )
}

export default App
