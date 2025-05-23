import * as fs from 'fs';
import * as path from 'path';
import { generateBoards } from '../lib/boards/boards-generator';
import { loadPBN } from '../lib/pbn/pbnConverter';
import { Board } from '../lib/boards/model';
import { PBNHand } from '../lib/pbn/model';
import { loadUsebio } from '../lib/usebio/usebioConverter';
import { cases } from './constants';

describe('Boards Generator', () => {
  test.each(cases)('should generate boards from "%s"', async (folder) => {
    const usebioFilePath = path.resolve(
      __dirname,
      `payloads/${folder}/usebio.xml`,
    );
    const usebio = fs.readFileSync(usebioFilePath, 'utf-8');
    const usebioFile = await loadUsebio(usebio);

    let pbnFile: PBNHand[] | null = null;

    const pbnFilePath = path.resolve(__dirname, `payloads/${folder}/hands.pbn`);

    if (fs.existsSync(pbnFilePath)) {
      const pbn = fs.readFileSync(pbnFilePath, 'utf-8');
      pbnFile = loadPBN(pbn);
    }

    const boards = generateBoards(usebioFile, pbnFile);
    const boardsJson: Board[] = JSON.parse(
      fs.readFileSync(
        path.resolve(__dirname, `payloads/${folder}/boards.json`),
        'utf-8',
      ),
    );

    expect(boards).toMatchObject(boardsJson);
  });
});
