import * as fs from 'fs';
import * as path from 'path';
import { generateBoards } from '../lib/boards/boards-generator';
import { loadPBN } from '../lib/pbn/pbnConverter';
import { Board } from '../lib/boards/model';
import { PBNHand } from '../lib/pbn/model';
import { loadUsebio } from '../lib/usebio/usebioConverter';

describe('Boards Generator', () => {
  it('should process a multi-section USEBIO file', async () => {
    const usebioFilePath = path.resolve(
      __dirname,
      'payloads/usebio-and-pbn/usebio.xml',
    );
    const usebio = fs.readFileSync(usebioFilePath, 'utf-8');
    const usebioFile = await loadUsebio(usebio);

    let pbnFile: PBNHand[] | null = null;

    const pbnFilePath = path.resolve(
      __dirname,
      'payloads/usebio-and-pbn/hands.pbn',
    );

    if (fs.existsSync(pbnFilePath)) {
      const pbn = fs.readFileSync(pbnFilePath, 'utf-8');
      pbnFile = loadPBN(pbn);
    }

    const boards = generateBoards(usebioFile, pbnFile);
    const boardsJson: Board[] = JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, 'payloads/usebio-and-pbn/boards.json'),
        'utf-8',
      ),
    );

    expect(boardsJson).toMatchObject(boards);
  });
});
