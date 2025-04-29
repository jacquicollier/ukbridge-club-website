import { SessionScore } from './session/sessionscore';
import { Board, Contestant } from './constants';

export class Section {
  name: string;
  boards: Board[];
  sessionScores: SessionScore[];
  players: Map<Contestant, string[]>;

  constructor(
    name: string,
    boards: Board[],
    sessionScores: SessionScore[],
    players: Map<Contestant, string[]>,
  ) {
    this.name = name;
    this.boards = boards;
    this.sessionScores = sessionScores;
    this.players = players;
  }
}
