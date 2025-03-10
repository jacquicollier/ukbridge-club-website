export interface UsebioFile {
  USEBIO: Usebio;
}

interface Usebio {
  EVENT: Event;
  HANDSET: HandSet;
}

interface Event {
  $: EventAttributes;
  BOARD_SCORING_METHOD: BoardScoringMethod;
  MATCH_SCORING_METHOD?: MatchScoringMethod;
  SCORING_METHOD?: ScoringMethod;
  PAIRWISE_SCORING_METHOD?: PairwiseScoringMethod;
  SESSION: Session;
  // SESSION: Session | Session[]
}

interface EventAttributes {
  EVENT_TYPE: EventType;
}

interface Session {
  SECTION: Section;
  // SECTION: Section | Section[]
}

interface Section {
  $: SectionAttributes;
  PARTICIPANTS: Participants;
  BOARD: Board;
}

interface SectionAttributes {
  SECTION_ID: string;
}

interface Participants {
  PAIR: Pair[];
}

export interface Pair {
  PAIR_NUMBER: string;
  DIRECTION: string;
  PERCENTAGE: string;
  PLACE: string;
  PLAYER: Player[];
  MASTER_POINTS?: MasterPoints;
}

interface MasterPoints {
  MASTER_POINTS_AWARDED: string;
  MASTER_POINT_TYPE: MasterPointType;
}

interface Player {
  PLAYER_NAME: string;
  CLUB_ID_NUMBER: string;
  NATIONAL_ID_NUMBER: string;
}

interface Board {
  BOARD_NUMBER: string;
  TRAVELLER_LINE: TravellerLine;
}

interface TravellerLine {
  NS_PAIR_NUMBER: string;
  EW_PAIR_NUMBER: string;
  CONTRACT: string;
  PLAYED_BY: string;
  LEAD: string;
  TRICKS: string;
  SCORE: string;
  NS_MATCH_POINTS: string;
  EW_MATCH_POINTS: string;
}

interface HandSet {
  BOARD: HandSetBoard | HandSetBoard[];
}

interface HandSetBoard {
  BOARD_NUMBER: string;
  HAND: Hand;
}

interface Hand {
  DIRECTION: Direction;
  SPADES: string;
  HEARTS: string;
  DIAMONDS: string;
  CLUBS: string;
}

type EventType = 'PAIRS';
type BoardScoringMethod = 'IMPS' | 'MATCH_POINTS';
type MatchScoringMethod = 'VPS';
type ScoringMethod = 'VP';
type PairwiseScoringMethod = 'CROSS_IMPS';
type Direction = 'North' | 'East' | 'South' | 'West';
type MasterPointType = 'Green' | 'Blue' | 'Black';
