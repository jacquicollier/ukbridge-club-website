// import DDSTable from '@/app/hand/components/DDSTable';
import { Hand } from '@/app/model/pbn/hand';
import AuctionTable from '@/app/hand/components/AuctionTable';
import PointCountTable from '@/app/hand/components/PointCountTable';
import Result from '@/app/hand/components/Result';
import DealerAndVul from '@/app/hand/components/DealerAndVul';
import PlayerHoldings, {
  PlayerHolding,
} from '@/app/hand/components/PlayerHoldings';
// import Vulnerabilities from '@/app/hand/components/Vulnerabilities';
import CurrentRoundCards from '@/app/hand/components/CurrentRoundCards';

export default function BridgeHandLayout(props: {
  hand: Hand;
  result: boolean;
  playedCards?: { [key: string]: { suit: string; rank: string } }; // Cards played by each player
}) {
  const playerHoldings = parseBridgeHand(props.hand.deal);

  return (
    <div className='relative m-2 flex aspect-square w-full max-w-[450px] flex-col items-center justify-center rounded-lg border-2 border-black p-4'>
      {/* Auction Table */}
      <AuctionTable auction={props.hand.auction} />

      {/* Dealer & Vulnerability Box */}
      <DealerAndVul hand={props.hand} />

      {/* Hands */}
      <PlayerHoldings playerHoldings={playerHoldings} />

      {/* Board */}
      <div
        className='absolute flex aspect-square size-32 flex-col items-center justify-center border-4 border-white bg-gray-800 text-lg font-bold text-white'
        style={{ position: 'relative' }}
      >
        <div className='absolute text-xl font-extrabold'>
          {props.hand.board}
        </div>

        {/* Vulnerabilities */}
        {/*<Vulnerabilities vulnerable={props.hand.vulnerable} />*/}

        {/*Played Cards */}
        {props.playedCards && (
          <CurrentRoundCards
            leadPlayer={props.hand.declarer}
            roundPlayedCards={props.playedCards}
          />
        )}
      </div>

      {/* Extra Info */}
      <PointCountTable playerHoldings={playerHoldings} />
      <Result hand={props.hand} />
      {/*<DDSTable />*/}
    </div>
  );
}

const parseBridgeHand = (handString: string): Record<string, PlayerHolding> => {
  const suitOrder = ['♠', '♥', '♦', '♣'];
  const directions = ['N', 'E', 'S', 'W'];

  // Split the hand string into direction and hands
  const [startingDirection, ...hands] = handString.split(':');
  const handsArray = hands.join(':').split(' '); // Split individual hands
  const startIndex = directions.indexOf(startingDirection);

  if (startIndex === -1 || handsArray.length !== 4) {
    throw new Error('Invalid bridge hand format');
  }

  // Map hands to their respective directions and suit cards
  return directions.reduce(
    (acc, direction, index) => {
      const handData = handsArray[(startIndex + index) % 4].split('.'); // Rotate based on starting position

      // Create an object for the player's hand
      const playerHand: PlayerHolding = suitOrder.reduce((suitAcc, suit, i) => {
        const cards = handData[i]?.split('') ?? []; // Split the string into individual cards

        // For each card in the suit, set its value to `false` (not played yet)
        suitAcc[suit] = cards.reduce(
          (cardAcc, card) => {
            cardAcc[card] = false; // Initialize each card as not played
            return cardAcc;
          },
          {} as Record<string, boolean>,
        );

        return suitAcc;
      }, {} as PlayerHolding);

      acc[direction] = playerHand;
      return acc;
    },
    {} as Record<string, PlayerHolding>,
  );
};
