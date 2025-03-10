import { Card, Direction } from '@/app/model/types';

export interface RecordOfPlay {
  getContract(): string;
  getDealer(): Direction;
  getDeclarer(): Direction;
  getResult(): string;
  getDeal(): { [key in Direction]: Card[] };
  getScoreHeadings(): string[];
  getScores(): string[][];
  getScore(): string;
  getScoreImp(): string;
  getNsVulnerable(): boolean;
  getEwVulnerable(): boolean;
  getBoard(): number;
  getBids(): string[] | null;
  getOpener(): Direction;
  getTrumps(): string | null;
  getPlayers(): { [key in Direction]: string };
  getPlayedCards(): Card[];
}
