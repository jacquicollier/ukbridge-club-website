interface Props {
  clearPlay: () => void;
  hasPrevious: () => boolean;
  hasNext: () => boolean;
  previousCard: () => void;
  nextCard: () => void;
}

export default function BridgePlayPanel({
  clearPlay,
  hasPrevious,
  hasNext,
  previousCard,
  nextCard,
}: Props) {
  return (
    <div className='flex w-full items-center justify-between rounded-b-md bg-gray-300 p-3 shadow-md'>
      {/* Buttons Container */}
      <div className='flex grow justify-center gap-3'>
        <button
          title='Previous'
          onClick={previousCard}
          disabled={!hasPrevious()}
          className='flex size-8 items-center justify-center rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-700 disabled:opacity-50'
        >
          &lt;
        </button>
        <button
          title='Next'
          onClick={nextCard}
          disabled={!hasNext()}
          className='flex size-8 items-center justify-center rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-700 disabled:opacity-50'
        >
          &gt;
        </button>
      </div>

      {/* Clear Button on the Right */}
      <button
        title='Clear'
        onClick={clearPlay}
        className='flex size-8 items-center justify-center rounded-full bg-gray-200 text-white shadow-md hover:bg-gray-500'
      >
        🗑️
      </button>
    </div>
  );
}
