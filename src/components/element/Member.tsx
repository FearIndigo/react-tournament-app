export interface MemberData {
  id: number;
  name: string;
}

export interface MemberProps {
  data: MemberData;
  readOnly?: boolean;
}

function Member({ data, readOnly }: MemberProps) {
  return readOnly ? (
    <div className="flex items-center">
      <p>{data.name}</p>
      <p className="opacity-50">{`#${data.id}`}</p>
    </div>
  ) : (
    <div className="flex items-center">
      <input type="text" placeholder="Name..." value={data.name} />
    </div>
  );
}

export default Member;
