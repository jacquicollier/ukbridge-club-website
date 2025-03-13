import { Board, Contestant } from '@/app/model/constants';

export type RecordOfPlay = {
  boards: Board[];
  players: Map<Contestant, string[]>;
};
