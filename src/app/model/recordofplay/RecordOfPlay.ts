import { Board, Contestant } from '@/app/model/constants';
import { SessionScore } from '@/app/model/recordofplay/score/session/sessionscore';
import { SessionScoreType } from '@/app/model/types';

export class RecordOfPlay {
  sessionScoreType: SessionScoreType;
  sessionScores: SessionScore[];
  boards: Board[];
  players: Map<Contestant, string[]>;

  constructor(
    sessionScoreType: SessionScoreType,
    sessionScores: SessionScore[],
    boards: Board[],
    players: Map<Contestant, string[]>,
  ) {
    this.sessionScoreType = sessionScoreType;
    this.sessionScores = sessionScores;
    this.boards = boards;
    this.players = players;
  }
}
