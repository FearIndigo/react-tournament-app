import Member, { MemberProps } from './components/element/Member.tsx';

function App() {
  const member: MemberProps = {
    data: {
      id: 0,
      name: 'Test Member'
    },
    readOnly: true
  };
  const members = [member, member, member, member];

  return members.map((props) => (
    <Member key={props.data.id} data={props.data} readOnly={props.readOnly} />
  ));
}

export default App;
