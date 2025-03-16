export interface UsebioFile {
  USEBIO: Usebio;
}

export interface Usebio {
  EVENT: Event;
  HANDSET?: HandSet;
}

export interface Event {
  $: EventAttributes;
  BOARD_SCORING_METHOD: BoardScoringMethod;
  MATCH_SCORING_METHOD?: MatchScoringMethod;
  SCORING_METHOD?: ScoringMethod;
  PAIRWISE_SCORING_METHOD?: PairwiseScoringMethod;
  SESSION: Session;
  WINNER_TYPE: number | null;
  PARTICIPANTS?: Participants;
  BOARD?: UsebioBoard[];
  // SESSION: Session | Session[]
}

interface EventAttributes {
  EVENT_TYPE: EventType;
}

interface Session {
  SECTION: Section[] | Section;
}

interface Section {
  $: SectionAttributes;
  PARTICIPANTS: Participants;
  BOARD: UsebioBoard[];
}

interface SectionAttributes {
  SECTION_ID: string;
}

export interface Participants {
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

export interface UsebioBoard {
  BOARD_NUMBER: number;
  TRAVELLER_LINE: TravellerLine[];
}

export interface TravellerLine {
  NS_PAIR_NUMBER: string;
  EW_PAIR_NUMBER: string;
  CONTRACT: string;
  PLAYED_BY: string;
  LEAD: string;
  TRICKS: string;
  SCORE: string;
  NS_MATCH_POINTS: string;
  EW_MATCH_POINTS: string;
  LIN_DATA?: string;
}

export interface HandSet {
  BOARD: HandSetBoard[];
}

interface HandSetBoard {
  BOARD_NUMBER: string;
  HAND: Hand[];
}

export interface Hand {
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
