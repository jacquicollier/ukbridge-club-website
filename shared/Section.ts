import { SessionScore } from './session/sessionscore';
import { Board, ContestantId } from './constants';

export class Section {
  name: string;
  boards: Board[];
  sessionScores: SessionScore[];
  players: Map<ContestantId, string[]>;

  constructor(
    name: string,
    boards: Board[],
    sessionScores: SessionScore[],
    players: Map<ContestantId, string[]>,
  ) {
    this.name = name;
    this.boards = boards;
    this.sessionScores = sessionScores;
    this.players = players;
  }
}
