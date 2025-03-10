import { Card, Direction } from '@/app/model/types';
import { RecordOfPlay } from '@/app/model/recordofplay/RecordOfPlay';

export abstract class RecordOfPlayGenerator {
  abstract getContract(): string;
  abstract getDealer(): Direction;
  abstract getDeclarer(): Direction;
  abstract getDeal(): { [key in Direction]: Card[] };
  abstract getScoreHeadings(): string[];
  abstract getScores(): string[][];
  abstract getScore(): string;
  abstract getScoreImp(): string;
  abstract getNsVulnerable(): boolean;
  abstract getEwVulnerable(): boolean;
  abstract getBoard(): number;
  abstract getBids(): string[] | null;
  abstract getOpener(): Direction;
  abstract getTrumps(): string | null;
  abstract getPlayers(): { [key in Direction]: string };
  abstract getPlayedCards(): Card[];
  abstract getResult(): string;

  public recordOfPlay(): RecordOfPlay {
    return {
      contract: this.getContract(),
      dealer: this.getDealer(),
      declarer: this.getDeclarer(),
      deal: this.getDeal(),
      scoreHeadings: this.getScoreHeadings(),
      scores: this.getScores(),
      score: this.getScore(),
      scoreImp: this.getScoreImp(),
      nsVulnerable: this.getNsVulnerable(),
      ewVulnerable: this.getEwVulnerable(),
      board: this.getBoard(),
      bids: this.getBids(),
      opener: this.getOpener(),
      trumps: this.getTrumps(),
      players: this.getPlayers(),
      playedCards: this.getPlayedCards(),
      result: this.getResult(),
    };
  }
}
