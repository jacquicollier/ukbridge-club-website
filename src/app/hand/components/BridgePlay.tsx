interface Props {
  hasNext: () => boolean;
  // previousCard: () => void;
  nextCard: () => void;
}

export default function BridgePlay({ hasNext, nextCard }: Props) {
  return (
    <div className='mt-4'>
      {/*<button*/}
      {/*  onClick={previousCard}*/}
      {/*  className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-700"*/}
      {/*>*/}
      {/*  Back*/}
      {/*</button>*/}
      <button
        onClick={nextCard}
        disabled={!hasNext()}
        className='rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-700'
      >
        Play Next Card
      </button>
    </div>
  );
}
