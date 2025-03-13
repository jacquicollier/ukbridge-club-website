interface BaseAffiliation {
  type: string;
  name: string;
}

interface UKFederationAffiliation extends BaseAffiliation {
  type: 'uk-federation';
  subdivision?: string;
}

interface U3AAffiliation extends BaseAffiliation {
  type: 'u3a';
}

type Affiliation = UKFederationAffiliation | U3AAffiliation;

export type Coordinate = { lat: number; lng: number };
export type County = { id: string; name: string };
export type Country = { id: string; name: string; counties: County[] };
export type Poi = {
  key: string;
  location: google.maps.LatLngLiteral;
  affiliations: Affiliation[];
  website: string | null;
};

export type Direction = 'N' | 'E' | 'S' | 'W';
export type ContestantDirection = Direction | 'NS' | 'EW';

export type Rank =
  | 'A'
  | 'K'
  | 'Q'
  | 'J'
  | 'T'
  | '9'
  | '8'
  | '7'
  | '6'
  | '5'
  | '4'
  | '3'
  | '2';
export type Suit = 'S' | 'H' | 'D' | 'C';

export type Card = {
  rank: Rank;
  suit: Suit;
};
