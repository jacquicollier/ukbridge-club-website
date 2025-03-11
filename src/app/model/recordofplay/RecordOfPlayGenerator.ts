import { Card, Direction } from '@/app/model/types';
import { RecordOfPlay } from '@/app/model/recordofplay/RecordOfPlay';
import { HandContestants, Player, Result } from '@/app/model/constants';

export abstract class RecordOfPlayGenerator {
  abstract getBoard(): number;
  abstract getDeal(): { [key in Direction]: Card[] };
  abstract getPlay(): Map<HandContestants, Result>;
  abstract getPlayers(): Map<Player, string>;

  public recordOfPlay(): RecordOfPlay {
    return {
      board: this.getBoard(),
      deal: this.getDeal(),
      play: this.getPlay(),
      players: this.getPlayers(),
    };
  }
}
