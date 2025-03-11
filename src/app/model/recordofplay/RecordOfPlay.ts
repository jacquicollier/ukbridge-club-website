import { Card, Direction } from '@/app/model/types';
import { HandContestants, Player, Result } from '@/app/model/constants';

export type RecordOfPlay = {
  board: number;
  deal: { [key in Direction]: Card[] };
  play: Map<HandContestants, Result>;
  players: Map<Player, string>;
};
