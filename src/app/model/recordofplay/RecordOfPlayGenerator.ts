import { RecordOfPlay } from '@/app/model/recordofplay/RecordOfPlay';
import { Board, Contestant } from '@/app/model/constants';
import { SessionScore } from '@/app/model/recordofplay/score/session/sessionscore';
import { SessionScoreType } from '@/app/model/types';

export abstract class RecordOfPlayGenerator {
  abstract getSessionScoreType(): SessionScoreType;
  abstract getSessionScores(): SessionScore[];
  abstract getBoards(): Board[];
  abstract getPlayers(): Map<Contestant, string[]>;

  public recordOfPlay(): RecordOfPlay {
    return new RecordOfPlay(
      this.getSessionScoreType(),
      this.getSessionScores(),
      this.getBoards(),
      this.getPlayers(),
    );
  }
}
