'use client';

import { Card, Direction } from '../../../../../../../../../shared/types';
import { useState } from 'react';
import { CardSource } from '@/app/components/hand/board/CardSource';
import { BridgePlay } from '@/app/components/hand/board/BridgePlay';

const BridgeGame: React.FC = () => {
  const initialCards: Card[] = [
    { suit: 'S', rank: 'A' },
    { suit: 'H', rank: 'K' },
    { suit: 'D', rank: 'Q' },
    { suit: 'C', rank: 'J' },
    { suit: 'C', rank: 'T' },
    { suit: 'H', rank: '2' },
  ];

  const [source] = useState(new CardSource(initialCards));
  const [bridgePlay] = useState(new BridgePlay('N', source, null));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setRender] = useState(0);

  const forceUpdate = () => setRender((r) => r + 1);

  return (
    <div>
      <h2>Bridge Game</h2>
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}
      >
        {(['N', 'E', 'S', 'W'] as Direction[]).map((dir) => (
          <div key={dir} style={{ border: '1px solid black', padding: '10px' }}>
            <strong>{dir}</strong>
            <div>
              {bridgePlay.getSlots()[dir] ? (
                <span>
                  {bridgePlay.getSlots()[dir]?.rank}{' '}
                  {bridgePlay.getSlots()[dir]?.suit}
                </span>
              ) : (
                <span>Empty</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          bridgePlay.playCard();
          forceUpdate();
        }}
      >
        Play Card
      </button>
      <button
        onClick={() => {
          bridgePlay.unplayLastCard();
          forceUpdate();
        }}
      >
        Undo
      </button>
    </div>
  );
};

export default BridgeGame;
