import { ContestantId } from '../constants';

export interface Contestant {
  section: string | null;
  id: ContestantId;
  names: string[];
}
