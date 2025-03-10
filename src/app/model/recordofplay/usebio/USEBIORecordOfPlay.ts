import { RecordOfPlay } from '@/app/model/recordofplay/RecordOfPlay';
import { UsebioFile } from '@/app/model/recordofplay/usebio/model';
import { Direction, Card } from '../../types';

export class USEBIORecordOfPlay implements RecordOfPlay {
  private data: UsebioFile;

  constructor(data: UsebioFile) {
    this.data = data;
  }

  getScoreImp(): string {
    throw new Error('Method not implemented.');
  }
  getTrumps(): string | null {
    throw new Error('Method not implemented.');
  }
  getPlayers(): { [key in Direction]: string } {
    throw new Error('Method not implemented.');
  }
  getPlayedCards(): Card[] {
    throw new Error('Method not implemented.');
  }
  getContract(): string {
    throw new Error('Method not implemented.');
  }
  getDealer(): Direction {
    throw new Error('Method not implemented.');
  }
  getDeclarer(): Direction {
    throw new Error('Method not implemented.');
  }
  getResult(): string {
    throw new Error('Method not implemented.');
  }
  getDeal(): { [key in Direction]: Card[] } {
    throw new Error('Method not implemented.');
  }
  getScoreHeadings(): string[] {
    throw new Error('Method not implemented.');
  }
  getScores(): string[][] {
    throw new Error('Method not implemented.');
  }
  getScore(): string {
    throw new Error('Method not implemented.');
  }
  getNsVulnerable(): boolean {
    throw new Error('Method not implemented.');
  }
  getEwVulnerable(): boolean {
    throw new Error('Method not implemented.');
  }
  getBoard(): number {
    throw new Error('Method not implemented.');
  }
  getBids(): string[] | null {
    throw new Error('Method not implemented.');
  }
  getOpener(): Direction {
    throw new Error('Method not implemented.');
  }
}
