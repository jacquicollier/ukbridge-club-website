import * as fs from 'fs';
import * as path from 'path';
import { loadPBN } from '../lib/pbn/pbnConverter';
import { PBNHand } from '../lib/pbn/model';
import { loadUsebio } from '../lib/usebio/usebioConverter';
import { cases } from './constants';
import { generateSessionScores } from '../lib/session-score/session-score-generator';
import { SessionScore } from '../lib/session-score/model';

describe('Session Score Generator', () => {
  test.each(cases)(
    'should generate session score from "%s"\'',
    async (folder) => {
      const usebioFilePath = path.resolve(
        __dirname,
        `payloads/${folder}/usebio.xml`,
      );
      const usebio = fs.readFileSync(usebioFilePath, 'utf-8');
      const usebioFile = await loadUsebio(usebio);

      let pbnFile: PBNHand[] | null = null;

      const pbnFilePath = path.resolve(
        __dirname,
        `payloads/${folder}/hands.pbn`,
      );

      if (fs.existsSync(pbnFilePath)) {
        const pbn = fs.readFileSync(pbnFilePath, 'utf-8');
        pbnFile = loadPBN(pbn);
      }

      const sessionScores = generateSessionScores(usebioFile, pbnFile);
      const sessionScoresJson: SessionScore[] = JSON.parse(
        fs.readFileSync(
          path.resolve(__dirname, `payloads/${folder}/session-scores.json`),
          'utf-8',
        ),
      );

      expect(sessionScores).toMatchObject(sessionScoresJson);
    },
  );
});
