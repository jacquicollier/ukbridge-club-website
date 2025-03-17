import { RecordOfPlay, Section } from '@/app/model/recordofplay/RecordOfPlay';
import { SessionScoreType } from '@/app/model/types';

export abstract class RecordOfPlayGenerator {
  abstract getSessionScoreType(): SessionScoreType;
  abstract getSections(): Section[];

  public recordOfPlay(): RecordOfPlay {
    return new RecordOfPlay(this.getSessionScoreType(), this.getSections());
  }
}
