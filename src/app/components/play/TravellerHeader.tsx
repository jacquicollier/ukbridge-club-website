export default function TravellerHeader(props: {
  board: number;
  backgroundColor: string;
}) {
  return (
    <div
      className='flex w-full rounded-t-md bg-gray-300 p-3 shadow-md'
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className='flex grow justify-center gap-3'>
        <span className='font-bold'>Board {props.board}</span>
      </div>
    </div>
  );
}
