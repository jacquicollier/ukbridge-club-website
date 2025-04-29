import { SessionScoreType } from './types';
import { Section } from './Section';

export class RecordOfPlay {
  sessionScoreType: SessionScoreType;
  sections: Section[];

  constructor(sessionScoreType: SessionScoreType, sections: Section[]) {
    this.sessionScoreType = sessionScoreType;
    this.sections = sections;
  }
}
