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
  MASTER_POINT_TYPE?: MasterPointType;
  // SESSION: Session | Session[]
}

interface EventAttributes {
  EVENT_TYPE: EventType;
}

export interface Session {
  PARTICIPANTS?: Participants;
  SECTION: UsebioSection[] | UsebioSection;
  HANDSET?: HandSet;
  MATCH?: Match[];
}

export interface Match {
  BOARD: UsebioBoard[];
}

export interface UsebioSection {
  $: SectionAttributes;
  PARTICIPANTS: Participants;
  BOARD: UsebioBoard[];
}

interface SectionAttributes {
  SECTION_ID: string;
}

export interface Participants {
  $?: ParticipantAttributes;
  TEAM?: Team[];
  PAIR?: Pair[];
  PLAYER?: Player[];
}

interface ParticipantAttributes {
  EVENT_TYPE: string;
}

export interface Team {
  PAIR: Pair[];
  PLACE: string;
  MASTER_POINTS?: MasterPoints;
  TOTAL_SCORE?: number;
}

export interface Pair {
  PAIR_NUMBER: string;
  DIRECTION?: string;
  PERCENTAGE?: number;
  PLACE: string;
  PLAYER: Player[];
  MASTER_POINTS?: MasterPoints;
  MASTER_POINTS_AWARDED?: number;
  TOTAL_SCORE?: number;
  BOARDS_PLAYED?: number;
  PAIR_IMPS?: number;
}

interface Player {
  PLAYER_NAME: string;
  PLAYER_NUMBER?: string;
  CLUB_ID_NUMBER: string;
  NATIONAL_ID_NUMBER: string;
  MASTER_POINTS?: MasterPoints;
  PLACE: string;
  PERCENTAGE?: number;
}

interface MasterPoints {
  MASTER_POINTS_AWARDED: number;
  MASTER_POINT_TYPE: MasterPointType;
}

export interface UsebioBoard {
  BOARD_NUMBER: number;
  TRAVELLER_LINE: TravellerLine[];
}

export interface TravellerLine {
  NS_PAIR_NUMBER?: string;
  EW_PAIR_NUMBER?: string;
  N_PLAYER_NUMBER?: string;
  S_PLAYER_NUMBER?: string;
  E_PLAYER_NUMBER?: string;
  W_PLAYER_NUMBER?: string;
  CONTRACT: string;
  PLAYED_BY: string;
  LEAD: string;
  TRICKS: string;
  SCORE: string;
  NS_MATCH_POINTS?: string;
  EW_MATCH_POINTS?: string;
  NS_CROSS_IMP_POINTS?: string;
  EW_CROSS_IMP_POINTS?: string;
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

type EventType = 'MP_PAIRS' | 'PAIRS' | 'INDIVIDUAL' | 'TEAMS';
export type BoardScoringMethod = 'IMPS' | 'MATCH_POINTS';
type MatchScoringMethod = 'VPS';
type ScoringMethod = 'VP';
type PairwiseScoringMethod = 'CROSS_IMPS';
type Direction = 'North' | 'East' | 'South' | 'West';
export type MasterPointType = 'Green' | 'Blue' | 'Black';
