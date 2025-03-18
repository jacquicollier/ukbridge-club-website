import { Board, Contestant } from '@/app/model/constants';
import { SessionScore } from '@/app/api/results/[club]/[game]/recordofplay/score/session/sessionscore';
import { SessionScoreType } from '@/app/model/types';

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

export class RecordOfPlay {
  sessionScoreType: SessionScoreType;
  sections: Section[];

  constructor(sessionScoreType: SessionScoreType, sections: Section[]) {
    this.sessionScoreType = sessionScoreType;
    this.sections = sections;
  }
}
