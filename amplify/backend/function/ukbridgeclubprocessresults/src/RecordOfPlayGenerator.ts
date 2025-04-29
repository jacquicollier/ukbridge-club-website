import { SessionScoreType } from 'shared/types';
import { Section } from 'shared/Section';
import { RecordOfPlay } from 'shared/RecordOfPlay';

export abstract class RecordOfPlayGenerator {
  abstract getSessionScoreType(): SessionScoreType;
  abstract getSections(): Section[];

  public recordOfPlay(): RecordOfPlay {
    return new RecordOfPlay(this.getSessionScoreType(), this.getSections());
  }
}
