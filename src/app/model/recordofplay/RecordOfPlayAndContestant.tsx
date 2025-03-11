import { RecordOfPlay } from '@/app/model/recordofplay/RecordOfPlay';
import {
  Auction,
  Contestant,
  HandContestants,
  Result,
} from '@/app/model/constants';
import { BoardScore } from '@/app/model/recordofplay/score/board/boardscore';
import { Card } from '@/app/model/types';

export class RecordOfPlayAndContestant {
  private readonly result: Result | null;

  constructor(recordOfPlay: RecordOfPlay, contestant: Contestant) {
    this.result = this.findEntryByContestant(recordOfPlay.play, contestant);
  }

  getBoardScore(): BoardScore | null {
    return this.result == null ? null : this.result.boardScore;
  }

  getAuction(): Auction | null {
    return this.result == null ? null : this.result.auction;
  }

  getPlayedCards(): Card[] | null {
    return this.result == null ? null : this.result.playedCards;
  }

  private findEntryByContestant(
    play: Map<HandContestants, Result>,
    targetContestant: Contestant,
  ): Result | null {
    for (const [key, value] of play.entries()) {
      if (
        (targetContestant.direction == 'NS' &&
          key.nsContestant.id === targetContestant.id) ||
        (targetContestant.direction == 'EW' &&
          key.ewContestant.id === targetContestant.id) ||
        (targetContestant.direction == null &&
          (key.nsContestant.id === targetContestant.id ||
            key.ewContestant.id === targetContestant.id))
      ) {
        return value;
      }
    }
    return null;
  }
}
