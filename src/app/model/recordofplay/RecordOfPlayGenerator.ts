import { RecordOfPlay } from '@/app/model/recordofplay/RecordOfPlay';
import { Board, Contestant } from '@/app/model/constants';

export abstract class RecordOfPlayGenerator {
  abstract getBoards(): Board[];
  abstract getPlayers(): Map<Contestant, string[]>;

  public recordOfPlay(): RecordOfPlay {
    return {
      boards: this.getBoards(),
      players: this.getPlayers(),
    };
  }
}
