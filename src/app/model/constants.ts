import { england } from '@/app/model/england';
import { scotland } from '@/app/model/scotland';
import { wales } from '@/app/model/wales';
import { northernIreland } from '@/app/model/northern-ireland';
import {
  Card,
  ContestantDirection,
  Direction,
  Rank,
  Suit,
} from '@/app/model/types';
import { BoardScore } from '@/app/model/recordofplay/score/board/boardscore';

export const Directions: Direction[] = ['N', 'E', 'S', 'W'];

export const rankOrder: Rank[] = [
  'A',
  'K',
  'Q',
  'J',
  'T',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
];

export const SuitMap: Record<Suit, string> = {
  S: '♠',
  H: '♥',
  D: '♦',
  C: '♣',
};

export const suitOrder = ['S', 'H', 'D', 'C'];

export const Dealer: Direction[] = [
  'W',
  'N',
  'E',
  'S',
  'W',
  'N',
  'E',
  'S',
  'W',
  'N',
  'E',
  'S',
];
export const NSVulnerableBoards: number[] = [2, 5, 12, 15, 4, 7, 10, 13];
export const EWVulnerableBoards: number[] = [3, 6, 9, 16, 4, 7, 10, 13];

export interface Contestant {
  id: number;
  direction: ContestantDirection | null;
}

// Note: Doesn't currently handle individual events
export interface HandContestants {
  nsContestant: Contestant;
  ewContestant: Contestant;
}

export interface Auction {
  opener: Direction;
  bids: string[];
}

export interface Board {
  boardNumber: number;
  deal: { [key in Direction]: Card[] };
  results: BoardResult[];
}

export interface BoardResult {
  boardScore: BoardScore;
  auction: Auction | null;
  playedCards: Card[] | null;
}

type Affiliation = {
  name: string;
  website: string;
  subdivisions?: Record<string, Affiliation>;
};

export const affiliations: Record<string, Affiliation> = {
  u3a: {
    name: 'U3A',
    website: 'https://www.bridgewebs.com/u3abridgegroup',
  },
  ebu: {
    name: 'English Bridge Union',
    website: 'https://www.ebu.co.uk',
    subdivisions: {
      avon: {
        name: 'Avon Contract Bridge Association',
        website: 'https://www.avoncba.org.uk',
      },
      bedfordshire: {
        name: 'Bedfordshire Bridge Association',
        website: 'https://www.bridgewebs.com/bba',
      },
      berksbucks: {
        name: 'Berks and Bucks Contract Bridge Association',
        website: 'https://www.bridgewebs.com/bbcba',
      },
      cambshunts: {
        name: 'Cambs & Hunts Contract Bridge Association',
        website: 'https://www.bridgewebs.com/cambshunts',
      },
      cornwall: {
        name: 'Cornwall Contract Bridge Association',
        website: 'https://www.bridgewebs.com/cornwall',
      },
      cumbria: {
        name: 'Cumbria County Bridge Association',
        website: 'https://www.bridgewebs.com/cumbria',
      },
      derbyshire: {
        name: 'Derbyshire Contract Bridge Association',
        website: 'https://www.bridgewebs.com/derbyshire',
      },
      devon: {
        name: 'Devon Contract Bridge Association',
        website: 'https://www.devonbridge.co.uk',
      },
      dorset: {
        name: 'Dorset Contract Bridge Association',
        website: 'https://www.bridgewebs.com/dorset',
      },
      essex: {
        name: 'Essex Contract Bridge Association',
        website: 'https://www.bridgewebs.com/essex',
      },
      glocestershire: {
        name: 'Glocestershire County Bridge',
        website: 'https://www.bridgewebs.com/gloucestershire',
      },
      hantsiow: {
        name: 'Hants & IOW CBA',
        website: 'https://www.bridgewebs.com/hiwcba',
      },
      herefordshire: {
        name: 'Herefordshire Bridge Association',
        website: 'https://www.bridgewebs.com/hba',
      },
      hertfordshire: {
        name: 'Hertfordshire Bridge Association',
        website: 'https://www.bridgewebs.com/herts',
      },
      kent: {
        name: 'Kent Contract Bridge Association',
        website: 'https://www.bridgewebs.com/kent',
      },
      lancashire: {
        name: 'Lancashire Contract Bridge Association',
        website: 'https://www.bridgewebs.com/lancs',
      },
      lincolnshire: {
        name: 'Lincolnshire Contract Bridge Association',
        website: 'https://www.bridgewebs.com/lincolnshire',
      },
      london: {
        name: 'London',
        website: 'https://www.bridgewebs.com/lmba',
      },
      manchester: {
        name: 'Manchester Contract Bridge Association',
        website: 'http://www.manchesterbridge.org.uk',
      },
      merseysidecheshire: {
        name: 'Merseyside & Cheshire Bridge Association',
        website: 'https://www.bridgewebs.com/merseysidecheshire',
      },
      middlesex: {
        name: 'Middlesex',
        website: 'https://www.bridgewebs.com/mcba',
      },
      norfolk: {
        name: 'Norfolk Contract Bridge Association',
        website: 'https://www.bridgewebs.com/norfolk',
      },
      northamptonshire: {
        name: 'Northamptonshire Contract Bridge Association',
        website: 'https://www.bridgewebs.com/northants',
      },
      northeast: {
        name: 'North Eastern Bridge Association',
        website: 'https://www.bridgewebs.com/neba',
      },
      nottinghamshire: {
        name: 'Nottinghamshire Contract Bridge Association',
        website: 'https://www.bridgewebs.com/nottinghamshire',
      },
      oxfordshire: {
        name: 'Oxfordshire Bridge Association',
        website: 'https://www.bridgewebs.com/oba',
      },
      somerset: {
        name: 'Somerset Contract Bridge Association',
        website: 'https://www.bridgewebs.com/somerset',
      },
      staffsandshrops: {
        name: 'Staffs & Shrops Contract Bridge Association',
        website: 'https://www.bridgewebs.com/staffsshrops',
      },
      suffolk: {
        name: 'Suffolk',
        website: 'https://www.bridgewebs.com/suffolkbridge',
      },
      surrey: {
        name: 'Surrey',
        website: 'https://www.bridgewebs.com/surrey',
      },
      sussex: {
        name: 'Sussex',
        website: 'https://www.bridgewebs.com/sussex',
      },
      warwickshire: {
        name: 'WCBA',
        website: 'https://www.bridgewebs.com/warwickshire',
      },
      westmorland: {
        name: 'Westmorland County Contract Bridge Association',
        website: 'https://www.bridgewebs.com/westmorland',
      },
      wiltshire: {
        name: 'Wiltshire Contract Bridge Association',
        website: 'https://www.bridgewebs.com/wcba',
      },
      worcestershire: {
        name: 'Worcestershire Contract Bridge Association',
        website: 'https://www.bridgewebs.com/worcestershire',
      },
      yorkshire: {
        name: 'Yorkshire Contract Bridge Association',
        website: 'https://www.ycba.co.uk',
      },
    },
  },
  sbu: {
    name: 'Scottish Bridge Union',
    website: 'https://www.sbu.org.uk',
    subdivisions: {
      ayrshire: {
        name: 'Ayrshire Bridge Union',
        website: 'https://www.bridgewebs.com/ayrshire',
      },
      central: {
        name: 'Central District of the SBU',
        website: 'https://www.bridgewebs.com/sbucentral',
      },
      east: {
        name: 'East District',
        website: 'https://www.sbueast.org.uk',
      },
      highland: {
        name: 'SBU Highland District',
        website: 'https://www.bridgewebs.com/sbuhighland',
      },
      north: {
        name: 'Scottish Bridge Union - North District',
        website: 'https://www.sbunorth.co.uk',
      },
      south: {
        name: 'SBU South',
        website: 'https://www.bridgewebs.com/sbusouth',
      },
      west: {
        name: 'West District of the Scottish Bridge Union',
        website: 'https://www.bridgewebs.com/sbuwest/',
      },
    },
  },
  wbu: {
    name: 'Welsh Bridge Union',
    website: 'https://welshbridgeunion.org',
    subdivisions: {
      east: {
        name: 'East Wales Bridge Association',
        website: 'https://www.bridgewebs.com/eastwales',
      },
      mid: {
        name: 'Mid Wales Bridge Association',
        website: 'https://mwba.welshbridgeunion.club',
      },
      north: {
        name: 'The North Wales Bridge Association',
        website: 'https://www.bridgewebs.com/nwba',
      },
      west: {
        name: 'West Wales Bridge Association',
        website: 'https://www.bridgewebs.com/westwales',
      },
    },
  },
  nibu: {
    name: 'Northern Ireland Bridge Union',
    website: 'https://nibu1.co.uk',
  },
};

export const defaultBounds = {
  east: 1.68153079591,
  west: -7.57216793459,
  north: 58.6350001085,
  south: 49.959999905,
};

export const pois = [...england, ...scotland, ...wales, ...northernIreland];
